import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Card, CardText, CardBody, Button, UncontrolledCarousel, Row, Col} from "reactstrap";
import { Image } from 'react-bootstrap';
import Pusher from 'pusher-js';
import './auctionRoom.css'
import {ipfs_base_url} from '../../apis_redux/apis/encheres'
import {DisplayBadges} from '../FrequentComponents/Category_Badges'
import { Message } from './Message';
import {fetchAuctionDetails, updateUserBids, sellLiveItem} from '../../apis_redux/actions/live_auction';
import {fetchProfile} from '../../apis_redux/actions/userProfile';
import VideoPlayer from '../FrequentComponents/VideoPlayer'
import SoldOutImage from '../../assets/images/soldout.jpg'
import WaitTimeImage from '../../assets/images/wait_time.jpg'


// 1) Where to store anonymous name -> get from user profile
// 5) Chat autoscroll correction
// 6) Multiple api calls for sell. Try backend trigger.

// reset variables -> bidprice, bid user, my_price, item_index on sell
const auctionCountdownDuration = 120;//seconds
const cntOneTimeout = 80;
const cntTwoTimeout = 40;
const cntSoldTimeout = 0;

class LiveAuctionRoom extends Component{
    constructor(props){
        super(props);
        this.state = {
            anonymous_name:'user',
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
            time_left:'',
            minutes_left:'',
            seconds_left:'',
            auctionCompleted:false,
            start_timer:false,
        }
    }
    componentDidMount = async()=>{
        console.log(this.props.match)
        const auction_id = this.props.match.params.auctionId;
        if(auction_id){
            this.setState({
                auction_id
            })
            await this.props.fetchAuctionDetails({auction_id});
            await this.props.fetchProfile(this.props.auth.userId);

           
            const {REACT_APP_PUSHER_APP_CLUSTER, REACT_APP_PUSHER_KEY} = process.env;
            this.pusher = new Pusher(REACT_APP_PUSHER_KEY,{
                cluster:REACT_APP_PUSHER_APP_CLUSTER,
            })
            this.channel = this.pusher.subscribe('auctions');
            this.channel.bind('updated',this.auctionUpdate);
            if(this.props.liveAuctionDetails.data){
                const item_index = this.chooseItemIndex();
                if(item_index){
                    this.setItemIndex(item_index);
                }
                    
            }else if(this.props.liveAuctionDetails.error){
                alert("Something went wrong");
            }
            if(this.props.userProfile.profile){
                this.setState({
                    anonymous_name:this.props.userProfile.profile.anonymous_name
                })
            }
        }
    }

    componentWillUnmount(){
        // unsubscribe from pusher
        // this.pusher.unsubscribe('auctions');
        // console.log('unsubscribed');
    }

    auctionUpdate = async()=>{
        const {auction_id} = this.state;
        await this.props.fetchAuctionDetails({auction_id});

    }

    /*******************************/
    // input/onclick Handlers
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

    handleUserBid = async (e) =>{
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
        await this.props.updateUserBids(data);

        if(this.props.bids.message){
            this.resetTimer();
        }

    }
    sellItem = async(e) =>{
        let {item_index} = this.state;
        item_index = parseInt(item_index);
        await this.props.sellLiveItem({auction_id:this.state.auction_id, item_id:this.props.liveAuctionDetails.data.items[item_index]._id});
        if(this.props.bids.message){
            await this.auctionUpdate();
            const data = this.props.liveAuctionDetails.data;
            if(data.completed){
                this.setState({
                    auctionCompleted:true
                })
                return;
            }
            if(data.items[item_index].sell.sold){
                await this.setItemIndex(item_index+1);
            }
        }else{
            this.setItemIndex(item_index);
        }
        
    }

    /**************************************/
    // Helper Functions

    chooseItemIndex = () =>{
        const data = this.props.liveAuctionDetails.data.items;
        for(let i=0;i<data.length;i++){
            if(!data[i].sell.sold){
                return i;
            }
        }
        this.setState({
            auctionCompleted: true
        })
    }

    setItemIndex = async(index) =>{
        this.setState({
            start_timer:false,
            time_left:'',
            minutes_left:'',
            seconds_left:'',
            bid_price:'',
            bid_user:'',
            my_price:'',
            cntOneLeft:true,
            cntTwoLeft:true,
            cntSoldLeft:true,
            item_index:index,
            
        })
    }

    /**************************************/
    // Timer/Counter Functions
    InitiateTimer = () =>{
        this.setState({
            start_timer:true
        })
    }
    DisableTimer = () =>{
        this.setState({
            start_timer:false
        })
    }

    resetTimer = ()=>{
        this.setState({
            time_left:'',
            minutes_left:'',
            seconds_left:'',
            cntOneLeft:true,
            cntTwoLeft:true,
            cntSoldLeft:true,
        })
    }
    
    getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        if(total<0){
            return {
                total:0,
                hours:0,
                minutes:0,
                seconds:0
            }
        }
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total: total/1000, hours, minutes, seconds
        };
    }

    startTimer = (e)=>{
        const timer = this.getTimeRemaining(e);
        let cntOneLeft = true, cntTwoLeft = true, cntSoldLeft = true;
        if(timer.total<=cntOneTimeout){
            cntOneLeft = false;
        }
        if(timer.total<=cntTwoTimeout){
            cntTwoLeft = false;
        }
        if(timer.total<=cntSoldTimeout){
            cntSoldLeft = false;
        }

        this.setState({
            time_left:timer.total,
            minutes_left:timer.minutes,
            seconds_left:timer.seconds,
            cntOneLeft,
            cntTwoLeft,
            cntSoldLeft
        })
    }

    renderCounter =  (props)=>{
        if((this.state.time_left==='' || this.state.time_left>0) && props.bid_date_time){
            let bidTime = new Date(props.bid_date_time);
            let expiry_time = new Date( bidTime.getTime()+ auctionCountdownDuration*1000);
            // let expiry_time = countDownTime.toISOString();
            if(this.state.time_left===''||this.state.time_left>0){
                const time_out = setTimeout(async ()=>{
                    this.startTimer(expiry_time);
                    if(this.state.time_left!=='' && this.state.time_left<=0){
                        await this.sellItem();
                        clearTimeout(time_out);
                        setTimeout(()=>{
                            // causing delay, so that set state can occur
                        },2000)
                        // return;
                    }
                },1000 )

            }else{
                // clearTimeout();
            }
        }
    }

    /**************************************/
    // Rendering Components

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
        if(!video){
            return(
                <span className='blue_text_inline'>No video found</span>
            )
        
        }
        return(
        <>
            <VideoPlayer url = {video} play={true}/>
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
                        <span className='blue_text_inline'><b>{item.bid.price} ETH</b> by <b>{item.bid.bidder.anonymous_name} {item.bid.bidder.userId}</b></span>
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
            {this.state.start_timer && item.bid.price!=='' && item.bid.price>0 && <Row className="title_row">
                <div>
                        <span className='item_desc_title'>Time Left</span>
                        {this.renderCounter(item.bid)}
                        <span className='blue_text_inline'><b>{this.state.minutes_left>9?this.state.minutes_left:'0'+this.state.minutes_left} m : 
                            {this.state.seconds_left>9?this.state.seconds_left:'0'+this.state.seconds_left} s</b> 
                        </span>
                </div>
                </Row>
            }

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
            console.log(this.props.liveAuctionDetails.data);
            const auctionDetails = this.props.liveAuctionDetails.data;
            if(auctionDetails.completed||this.state.auctionCompleted){
                return(
                    <div className='live_auction_div'>
                    <Row className="heading_section_row">
                        <h3 className='section_heading rainbow-lr '>
                            Live Auction
                        </h3>
                    </Row>

                    <Row className="section_content">
                    <Col md={12}>
                        <Card id="singup_form_card">
                        <CardBody>
                            <CardText>
                                <Row>
                                <Col md={6}>
                                        <Image src={SoldOutImage} className="login_image" alt="lock image" style={{height:'20rem'}} fluid/>
                                    </Col>
                                    <Col md={6}>
                                            <h4 className="main_heading__form light__blue">
                                                This auction has already ended. You can explore other auctions. 
                                            </h4>
                                    </Col>
                                </Row>
                            </CardText>
                                    
                            </CardBody>
                        </Card>
                    </Col>
                    </Row>
                   </div>
                )
            }else if(Date.parse(auctionDetails.event_date_time)> Date.now()){
                return(
                    <div className='live_auction_div'>
                    <Row className="heading_section_row">
                        <h3 className='section_heading rainbow-lr '>
                            Live Auction
                        </h3>
                    </Row>

                    <Row className="section_content">
                    <Col md={12}>
                        <Card id="singup_form_card">
                        <CardBody>
                            <CardText>
                                <Row>
                                <Col md={6}>
                                        <Image src={WaitTimeImage} className="login_image" alt="waiting person" style={{height:'20rem'}} fluid/>
                                    </Col>
                                    <Col md={6}>
                                            <h4 className="main_heading__form light__blue">
                                                Auction has not yet started. You can explore other auctions.
                                            </h4>
                                    </Col>
                                </Row>
                            </CardText>
                                    
                            </CardBody>
                        </Card>
                    </Col>
                    </Row>
                   </div>
                )

            }
            else{
                if(!this.state.start_timer && this.props.liveAuctionDetails.data.items[this.state.item_index].bid.bidder){
                    this.InitiateTimer();
                }else if(this.state.start_timer && !this.props.liveAuctionDetails.data.items[this.state.item_index].bid.bidder){
                    this.DisableTimer();
                }
                
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
                                        </div>

                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
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
        liveAuctionDetails:state.liveAuction,
        bids:state.bids,
        userProfile:state.userProfile
    })

}
export default connect(mapStateToProps, {fetchAuctionDetails, updateUserBids, sellLiveItem, fetchProfile})(LiveAuctionRoom);