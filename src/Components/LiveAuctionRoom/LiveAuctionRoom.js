import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Card, CardText, CardBody, CardSubtitle, Button, UncontrolledCarousel, Row, Col} from "reactstrap";
import './auctionRoom.css'
import {ipfs_base_url} from '../../apis_redux/apis/encheres'
import {DisplayBadges} from '../FrequentComponents/Category_Badges'

const auctionDetails = {
    "tags":["Antiques","Households","Collectibles","Mini Items"],
    "event_data_time":"",
    "pickup_point":{
        "addressLine1":"s",
        "addressLine2":"sdf",
        "city":"asf",
        "addressState":"Disneyland",
        "postalCode":"111121",
        "country":"Disney World"
    },
    "organizer_contact":"+59848485415",
    "items":[{
        "name":"Beluga",
        "quantity":"1",
        "base_price":"0.000025",
        "description":"A celebrity cat that is fond of using Discord. You will need to buy a mobile phone and pc for Beluga.",
        "images":["QmbsUYfDuTC7mwSm3nua4BenBNjDV9btWM8HrMCJGMm8aZ"],
        "bid":{
            "price":"0.00025",
            "bidder":{
                "anonymous_name":"Jonas"

            }
        }

    }],
}

class LiveAuctionRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            auction_id:'',
            cntOneLeft:true,
            cntTwoLeft:true,
            cntSoldLeft:true,
        }
    }
    componentDidMount(){
        const auction_id = this.props.match.params.auctionId;
        this.setState({
            auction_id
        })
    }
    nullHandler = (e)=>{
        e.preventDefault();  
    }


    renderImageCarousel = (images) =>{
        if(!images||images.length<1){
            return(
                <span className='blue_text_inline'>No image found</span>
                
            )
        }
        var assetShowcaseCarousel = [];
            var showcaseElement;
            for(var i=0;i<images.length;i++){
                showcaseElement = {
                    src: `${ipfs_base_url}`+images[i],
                    altText: "Slide "+i.toString(),
                    key: i.toString()
                }

                assetShowcaseCarousel.push(showcaseElement);
            }
        return(
            <>
                <UncontrolledCarousel className="image_carousel" items={assetShowcaseCarousel} />
            </>
        )
    }
    renderVideo(video){
        if(!video||video.length<0){
            return(
                <span className='blue_text_inline'>No video found</span>
            )
        
        }
        return(
        <>
            <p>Video is being displayed here: {video}</p>
        </>)
    }
    
    renderItem = (item)=>{
        return(
        <>
            <h3 className="item__name"> {item.name} </h3>
            <div className='blue_text_inline' style={{textAlign:'Right'}}>Item 1 of 1</div>
            <Row className="title_row">
                <Col sm={6}>
                    <div>
                        <span className='item_desc_title'>High Bid</span>
                        <span className='blue_text_inline'><b>{item.bid.price} ETH</b> by <b>{item.bid.bidder.anonymous_name}</b></span>
                    </div>

                </Col>
                <Col sm={6}>
                    <Button className='auction_status_buttons' disabled={this.state.cntOneLeft} onClick={this.nullHandler}>ONCE </Button>
                    <Button className='auction_status_buttons' disabled={this.state.cntTwoLeft} onClick={this.nullHandler}>TWICE </Button>
                    <Button className='auction_status_buttons' disabled={this.state.cntSoldLeft} onClick={this.nullHandler}>SOLD </Button>
                </Col>
            </Row>
            <div>
                <p className='item_desc_title'>Images
                {this.renderImageCarousel(item.images)}
                </p>
            </div>
            <div>
                <span className='item_desc_title'>Showcase Video
                    {this.renderVideo(item.video)}
                </span>
            </div>
            <div>
                <p className='item_desc_title'> Description: </p>
                <p className='text_para_auctionRoom'>{item.description}</p>
            </div>
            <div>
                <span className='item_desc_title'>Quantity</span>
                <span className='blue_text_inline'>{item.quantity}</span>
            </div>
        </>
       
        )
    }

    renderSelectedCategories = (categories) =>{
        return categories.map(category => {
            return(
                <DisplayBadges key={category} category={category} toggleCategory={this.nullHandler} selected_bg='True'/>
            )
        })
    }

    renderAuctionDetails = (auctionDetails)=>{
        return(
        <>
            <h3 className="auction__heading"> Auction Details</h3>
            <Row className="title_row">
            <Col sm={6}>    
                <div>
                    <span className='item_desc_title'>Sold By</span>
                    <span className='blue_text_inline'>Jonnathan</span>
                </div>
            </Col>

            <Col sm={6}>    
                <div>
                    <span className='item_desc_title'>Number of Items sold:</span>
                    <span className='blue_text_inline'>1</span>
                </div>
            </Col>
            </Row>
            <div className='live_auction_details'>
                <span className='item_desc_title'>Categories</span>
                <span style={{marginLeft:'1rem'}}>{this.renderSelectedCategories(auctionDetails.tags)}</span>
            </div>
            <div>
                <span className='item_desc_title'>Pickup address</span>
                <span className='blue_text_inline'>{auctionDetails.pickup_point.city} , {auctionDetails.pickup_point.addressState}, 
                    {auctionDetails.pickup_point.country}, {auctionDetails.pickup_point.postalCode}
                </span>
            </div>

        </>
        )
    }



    render(){
        return(
            <div className='live_auction_div'>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Live Auction
                    </h3>
                </Row>
                <Row className="section_content">
                    
                    <Col md={8}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <>
                                    <div>
                                        {this.renderItem(auctionDetails.items[0])}
                                    </div>    
                                    <div className='auction_details_div'>
                                        {this.renderAuctionDetails(auctionDetails)}

                                    </div>
                                </>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                    <h3>Message Center</h3>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </div>
        )
    }

}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth:state.auth
    })

}
export default connect(mapStateToProps, {})(LiveAuctionRoom);