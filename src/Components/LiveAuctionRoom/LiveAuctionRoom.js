import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Card, CardText, CardBody, Button, UncontrolledCarousel, Row, Col} from "reactstrap";
import Pusher from 'pusher-js';
import './auctionRoom.css'
import {ipfs_base_url} from '../../apis_redux/apis/encheres'
import {DisplayBadges} from '../FrequentComponents/Category_Badges'
import ReactPlayer from 'react-player'
import { Message } from './Message';

import {fetchAuctionDetails, updateAuctionDetails} from '../../apis_redux/actions/live_auction';
import moment from 'moment';

// const auctionDetails = {
//     "tags":["Antiques","Households","Collectibles","Mini Items"],
//     "event_data_time":"",
//     "pickup_point":{
//         "addressLine1":"s",
//         "addressLine2":"sdf",
//         "city":"asf",
//         "addressState":"Disneyland",
//         "postalCode":"111121",
//         "country":"Disney World"
//     },
//     "organizer_contact":"+59848485415",
//     "items":[{
//         "name":"Beluga",
//         "quantity":"1",
//         "base_price":"0.000025",
//         "description":"A celebrity cat that is fond of using Discord. You will need to buy a mobile phone and pc for Beluga.",
//         "images":["QmbsUYfDuTC7mwSm3nua4BenBNjDV9btWM8HrMCJGMm8aZ"],
//         "bid":{
//             "price":"0.00025",
//             "bidder":{
//                 "anonymous_name":"Jonas"

//             }
//         },
//         "video":"QmXSeaxB7P694pgTJX6o8H2fRo2GLX5Ccm584RhjjVreHt"

//     }],
// }

// 1) Where to store anonymous name
// 2) Where to store the video
// 3) Counter
// 4) Shifting to next bid

class LiveAuctionRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            anonymous_name:'Raju',
            auction_id:'',
            item_index:0,
            bid_price:0,
            bid_user:'',
            messages:[],
            cntOneLeft:true,
            cntTwoLeft:true,
            cntSoldLeft:true,
            my_price:'',
            base_price:'',
        }
    }
    componentDidMount = async()=>{
        const auction_id = this.props.match.params.auctionId;
        if(auction_id){
            this.setState({
                auction_id
            })
            this.props.fetchAuctionDetails({auction_id});
           const {REACT_APP_PUSHER_APP_CLUSTER, REACT_APP_PUSHER_KEY} = process.env;
            this.pusher = new Pusher(REACT_APP_PUSHER_KEY,{
                cluster:REACT_APP_PUSHER_APP_CLUSTER,
            })
            this.channel = this.pusher.subscribe('auctions');
            this.channel.bind('updated',this.auctionUpdate);
        }
    }

    componentWillUnmount(){
        // unsubscribe from pusher
        this.pusher.unsubscribe('auctions');
        console.log('unsubscribed');
    }

    auctionUpdate = async()=>{
        const {auction_id} = this.state;
        await this.props.fetchAuctionDetails({auction_id});
    }

    nullHandler = (e) =>{

    }
    
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    handleStatusButtons = e =>{
        e.preventDefault();
    }

    handleUserBid = e =>{
        e.preventDefault();
        
        let {my_price, bid_price, base_price, auction_id, item_index, anonymous_name} = this.state;
        my_price = parseFloat(my_price);
        bid_price = parseFloat(bid_price);
        base_price = parseFloat(base_price);
        item_index = parseInt(item_index);
        if(my_price<bid_price || my_price<base_price){
            alert('Your bid should be more than current bid and base price');
            return;
        }
        const date_time = new Date(Date.now()+(new Date().getTimezoneOffset()*60000)).getTime();
        const userId = this.props.auth.userId;
        const bid = {bidder:{userId, anonymous_name }, date_time, price:my_price}
        const data= {bid, auction_id, item_id:this.props.liveAuctionDetails.data.items[item_index]._id}
        // console.log(data);
        this.props.updateAuctionDetails(data);

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
            {/* <ReactPlayer url={`${ipfs_base_url}`+video}/> */}
            <p>Video is being displayed here: </p>
        </>)
    }
    
    renderItem = (item)=>{
        if(item.base_price !== this.state.base_price){
            this.setState({
                base_price:item.base_price
            })
        }
        if(item.bid.price&&(item.bid.price !== this.state.bid_price)){
            this.setState({
                bid_price:item.bid.price,
                bid_user:item.bid.bidder.anonymous_name
            })
        }

        return(
        <>
            <h3 className="item__name"> {item.name} </h3>
            <div className='blue_text_inline' style={{textAlign:'Right'}}>Item {this.state.item_index +1} of {this.props.liveAuctionDetails.data.items.length}</div>
            <Row className="title_row">
                <Col lg={6} className='auction_para_div'>
                    <div>
                        <span className='item_desc_title'>Highest Bid</span>
                        {this.state.bid_price? <>
                        <span className='blue_text_inline'><b>{item.bid.price} ETH</b> by <b>{item.bid.bidder.anonymous_name}</b></span>
                        </>:<>
                        <span className='blue_text_inline'> Yet to Begin </span>
                        </>}
                        
                    </div>
                </Col>
                <Col lg={6}>
                    <Button className='auction_status_buttons' disabled={this.state.cntOneLeft} onClick={this.handleStatusButtons}>ONCE </Button>
                    <Button className='auction_status_buttons' disabled={this.state.cntTwoLeft} onClick={this.handleStatusButtons}>TWICE </Button>
                    <Button className='auction_status_buttons' disabled={this.state.cntSoldLeft} onClick={this.handleStatusButtons}>SOLD </Button>
                </Col>
            </Row>
            <Row className="title_row">
                <div>
                        <span className='item_desc_title'>Initial Ask Price</span>
                        <span className='blue_text_inline'><b>{item.base_price} ETH</b> </span>
                    </div>
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
            <div className='auction_para_div'>
                <p className='item_desc_title'> Description: </p>
                <p className='text_para_auctionRoom'>{item.description}</p>
            </div>
            <div className='auction_para_div'>
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
            <Col sm={6} className='auction_para_div'>    
                <div>
                    <span className='item_desc_title'>Sold By</span>
                    <span className='blue_text_inline'>{auctionDetails.organizer.name}</span>
                </div>
            </Col>

            <Col sm={6} className='auction_para_div'>    
                <div>
                    <span className='item_desc_title'>Number of Items:</span>
                    <span className='blue_text_inline'>{this.props.liveAuctionDetails.data.items.length}</span>
                </div>
            </Col>
            </Row>
            <div className='live_auction_details auction_para_div'>
                <span className='item_desc_title'>Categories</span>
                <span style={{marginLeft:'1rem'}}>{this.renderSelectedCategories(auctionDetails.tags)}</span>
            </div>
            <div className='auction_para_div'>
                <span className='item_desc_title'>Pickup address</span>
                <span className='blue_text_inline'>{auctionDetails.pickup_point.city}, {auctionDetails.pickup_point.addressState}, {auctionDetails.pickup_point.country}, {auctionDetails.pickup_point.postalCode}
                </span>
            </div>

        </>
        )
    }
    renderChats = (chats)=>{
        if(!chats || chats.length<1){
            return(
                <>
                    <span className='blue_text_inline chat__notify'>No message to Display</span>
                </>
            )
        }
        return chats.map(chat => {
                return(
                    <Message key={chat.id} chat={chat}/>
                )
            }
        )
    }


    render(){
        if(this.props.liveAuctionDetails.data){
            const auctionDetails = this.props.liveAuctionDetails.data;
        return(
            <div className='live_auction_div'>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Live Auction
                    </h3>
                </Row>
                <Row className="section_content">
                    <Col md={8}>
                        <Card id="singup_form_card" className='auction_card_desc'>
                            <CardBody>
                                <>
                                    <div>
                                        {this.renderItem(auctionDetails.items[this.state.item_index])}
                                    </div>    
                                    <div className='auction_details_div'>
                                        {this.renderAuctionDetails(auctionDetails)}

                                    </div>
                                    <div className='auction_bidding_input'>
                                        <h3>Place Your Bid</h3>
                                        <Row>
                                            <Col sm={8}>
                                            <input name='my_price' type='text' className='form-control auction_input_field' value={this.state.my_price} onChange={this.handleInputChange}/>
                                            </Col>
                                            <Col sm={4}>
                                                <Button className='form__button pink_blue_gradiend_btn' onClick={this.handleUserBid}>
                                                    Place Bid
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card id="singup_form_card" className='chat__section__container'>
                            <CardBody>
                                <CardText>
                                    <h3 className='chat_heading'>Message Center</h3>
                                    <div className='chat__section_div'>
                                        {this.renderChats(auctionDetails.chats)}
                                        {/* {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")}
                                        {this.renderMessage("$1000, selling item")} */}
                                    </div>

                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
        }else{
            return(
                <div className='live_auction_div'>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Live Auction
                    </h3>
                </Row>
                <Row className="section_content">
                    Searching for auction details
                </Row>
                </div>

            )
        }
    }

}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth:state.auth,
        liveAuctionDetails:state.liveAuction
    })

}
export default connect(mapStateToProps, {fetchAuctionDetails, updateAuctionDetails})(LiveAuctionRoom);