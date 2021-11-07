import React from 'react';
import moment from 'moment';
import Pusher from 'pusher-js';
import { connect } from 'react-redux'; 
import { fetchItem } from '../../apis_redux/actions/item';
import { UpdatePhysicalAsset } from '../../apis_redux/actions/physicalAsset';
import {Card, CardBody, UncontrolledCarousel, CardSubtitle, CardText, Button, Collapse} from 'reactstrap';
import { Form } from 'react-bootstrap';
import { renderPhysicalAssetCategories } from '../FrequentComponents/Asset';
import { CountdownTimer } from '../FrequentComponents/CountdownTimer';
import Loading from '../loading';
import RenderError from '../FrequentComponents/RenderError';
import { FaEthereum } from 'react-icons/fa';
import './View.css'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import {ipfs_base_url} from '../../apis_redux/apis/encheres'

class SingleAssetDetail extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isOpen: false,
            bid: 0,
            price: 0,
            bidsError: ''
        }

        this.handleBidChange = this.handleBidChange.bind(this);
        this.biddingLiveUpdate = this.biddingLiveUpdate.bind(this);
    }


    async componentDidMount(){
        await this.props.fetchItem(this.props.itemId);

        var assetStatus = this.props.items;

        if(!assetStatus.errMess && assetStatus.item){
            var asset = assetStatus.item;
            if(asset){

                this.setState({
                    price: asset.asset.aggregate_base_price,
                    bid: asset.asset.aggregate_base_price
                })
            }
    
            this.pusher = new Pusher('0bbbbf90036a3b074732', {
                cluster: 'ap2',
            });
            this.channel = this.pusher.subscribe('biddings');
                
            this.channel.bind('updated', this.biddingLiveUpdate);
        }
    }

    async biddingLiveUpdate(){

       await this.props.fetchItem(this.props.itemId);

        var itemStatus = this.props.items; 

        if(itemStatus && itemStatus.item){
            var updatedBid = itemStatus.item.asset.aggregate_base_price;

            this.setState({
                price: updatedBid
            })
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    async submitBid(event_end_date_time){

        if(moment(event_end_date_time).diff(moment(new Date())) <= 0 ){
            await this.biddingLiveUpdate()
        }

        /******** FRONTEND AVOIDANCE TO ALLOW ONLY HIGHER BIDS *******/
        if(this.state.bid <= this.state.price){
            this.setState({
                bidsError: "You can only Place a Bid higher than current Price!!"
            })
            return;
        }
        else{
            this.setState({
                bidsError: ''
            })
        }

        var aggregate_base_price = this.state.bid;
        var bidder = this.props.auth.userId;
        var event_end_date_time = new Date();

        var asset = {
            ...this.props.items.item.asset,
            aggregate_base_price
        }

        var updatedAsset = {
            ...this.props.items.item,
            asset,
            bidder
        }

        await this.props.UpdatePhysicalAsset(this.props.itemId, updatedAsset);

        if(this.props.physicalAsset.isBidLegal){
            this.setState({
                price: this.state.bid
            })
        }
        else{
            swal("Failure!!", this.props.physicalAsset.illegalBidMess, "error");
        }
    }

    async onBuyRequest(event_end_date_time){

        if(moment(event_end_date_time).diff(moment(new Date())) <= 0 ){
            await this.biddingLiveUpdate()
        }

        var aggregate_base_price = this.state.bid;
        var bidder = this.props.auth.userId;
        var event_end_date_time = moment(new Date());

        var asset = {
            ...this.props.items.item.asset,
            aggregate_base_price
        }

        
        var updatedAsset = {
            ...this.props.items.item,
            asset,
            bidder,
            event_end_date_time
        }

        await this.props.UpdatePhysicalAsset(this.props.itemId, updatedAsset);

        if(this.props.physicalAsset.isBidLegal){
            swal("Success!!", "Congratulations!! You just bought a Physical Asset Move to Winnings Section Now.", "success")
        }
        else{
            swal("Failure!!", "Oops! Something got Wrong", "error")
        }
    }

    handleBidChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: parseFloat(event.target.value)
        });
    }

    render(){

        if(this.props.items.isLoading){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if(this.props.items.errMess){
            return(
                <RenderError error={this.props.items.errMess} />
            );
        }
        else {
            var asset = this.props.items.item

            var assetShowcaseCarousel = [];
            var showcaseElement;
            for(var i=0;i<asset.asset.images.length;i++){
                showcaseElement = {
                    src: ipfs_base_url+asset.asset.images[i],
                    altText: "Slide "+i.toString(),
                    key: i.toString()
                }

                assetShowcaseCarousel.push(showcaseElement);
            }

            let ownershipStatus;

            if(!asset.shipped){
                ownershipStatus = <CardText id="new-item-card-account">
                                    Owned By @{asset.owner && asset.owner.name ? asset.owner.name : "john_bill123"}
                                </CardText>
            }
            else{
                ownershipStatus = <CardText id="new-item-card-account">
                                    @{asset.owner.name} Sold asset to @{asset.bidder.name}
                                </CardText>
            }
            
            return(
                
                <div className='container'>
                    <div className='row justify-content-center mt-4 mb-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            {asset.asset.name.toUpperCase()} ASSET DETAILS
                        </h3>
                    </div>
                    <div className='row mt-4 mb-4'>
                        <div className='col-12 col-md-7 col-lg-6'>
                            <Card id="new-item-card">
                                    <CardBody>
                                        <div style={{height: '100%'}}>
                                            <UncontrolledCarousel style={{height: '100%'}} items={assetShowcaseCarousel} /> :
                                        </div>
                                        <CardSubtitle
                                            tag="h5"
                                            className="mt-3 mb-3 new-item-card-subtitle"
                                            id="new-item-card-username"
                                        >
                                            {asset.asset.name}
                                        </CardSubtitle>
                                        <CardText id="new-item-card-info" className="mb-4">
                                            {   
                                                asset.asset.description
                                            }
                                        </CardText>
                                            <div>
                                                {
                                                    renderPhysicalAssetCategories(asset.categories)
                                                }
                                            </div>
                                        <div>
                                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                                Showcase Video{"  "}
                                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                                    {(!asset.asset.assetVideoHash) ? 
                                                        "Not Available" : 
                                                        <a style={{textDecoration: 'none', color: 'cyan'}} href={ipfs_base_url+asset.assetVideoHash}>Link</a>}
                                                </span>
                                            </CardSubtitle>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className='col-12 col-md-5 col-6'>
                                <Card id="new-item-card">
                                    <CardBody>
                                        <div className="mt-0 mb-4 new-item-accountbox">
                                            {ownershipStatus}
                                        </div>
                                        <CardSubtitle
                                            tag="h6"
                                            className="mt-3 mb-3"
                                            id="new-item-card-info"
                                        >
                                            {
                                                moment(asset.event_end_date_time).diff(moment(new Date())) > 0 ?
                                                <div>Sale Ends on {moment(asset.event_end_date_time).format('MMMM Do YYYY, h:mm A')}</div> :
                                                <div>Sale Ended on {moment(asset.event_end_date_time).format('MMMM Do YYYY, h:mm A')}</div>
                                            }
                                        </CardSubtitle>
                                        <div className='mb-4'>
                                            {
                                                moment(asset.event_end_date_time).diff(moment(new Date())) > 0 ?
                                                <CountdownTimer end_date_time={asset.event_end_date_time} /> :
                                                <div/>
                                            }
                                        </div>
                                        <div>
                                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                                Asset Price{"  "}
                                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                                    {this.state.price+' ETH'}
                                                </span>
                                                <span style={{ marginLeft: 10, color: "grey" }}>
                                                    ({(this.state.price*295377.53).toFixed(2)+' Rs'})
                                                </span>
                                            </CardSubtitle>
                                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                                Quantity{"  "}
                                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                                    {asset.asset.quantity}
                                                </span>
                                            </CardSubtitle>
                                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                                Pickup Point
                                                <p style={{ marginTop: 10, color: "cyan" }}>
                                                    { 
                                                        asset.pickup_point.addressLine1+', '+asset.pickup_point.city+', '+
                                                        asset.pickup_point.state+', '+asset.pickup_point.country
                                                    }
                                                </p>
                                            </CardSubtitle>
                                        </div>
                                        
                                        <div className='mt-4' id='single-asset-purchase-button-container'>
                                            {
                                                !this.props.auth.isSignedIn ? 
                                                <Button 
                                                    id='single-asset-purchase-button' 
                                                    >
                                                    <Link to={'/login'} style={{textDecoration: 'none', color: 'gray', fontWeight: 'bold'}}>
                                                        <span> Login to Make Offer </span>
                                                    </Link>
                                                </Button> :
                                                <div>
                                                    {asset.bids && moment(asset.event_end_date_time).diff(moment(new Date())) > 0 ?
                                                    <Button 
                                                        id='single-asset-purchase-button' 
                                                        onClick={this.toggle}>
                                                        <span><FaEthereum /> Make Offer </span>
                                                    </Button> :
                                                    <div/>}
                                                
                                                
                                                    {!asset.bids && moment(asset.event_end_date_time).diff(moment(new Date())) > 0 ?
                                                    <Button 
                                                        onClick={() => this.onBuyRequest(asset.event_end_date_time)}
                                                        id='single-asset-purchase-button'>
                                                        <span><FaEthereum /> Buy Now </span>
                                                    </Button> :
                                                    <div/>}
                                                </div>
                                            }
                                            
                                            <Collapse isOpen={moment(asset.event_end_date_time).diff(moment(new Date())) > 0 && this.state.isOpen}>
                                                <div className='mt-4 row col-12'>
                                                    <div className='col-10'>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="bid">
                                                                <Form.Control
                                                                    type='number'
                                                                    name='bid'
                                                                    onChange={this.handleBidChange}
                                                                    className='new-item-form-field' 
                                                                    style={{backgroundColor: '#03091F', 
                                                                        borderWidth: 0,
                                                                        color: 'white'
                                                                        }}
                                                                    placeholder="Bid Price (ETH)"
                                                                    />
                                                                <div className='mb-4' id='new-item-form-error'>{this.state.bidsError}</div>
                                                            </Form.Group>
                                                        </Form>
                                                    </div>
                                                    <div className='col-2'>
                                                        <Button
                                                            onClick={() => this.submitBid(asset.event_end_date_time)}
                                                        >
                                                            <span className='fa fa-telegram fa-lg'/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                </div>
            )

        }
    }
} 

const  mapStateToProps = (state) => {
    return{
        items: state.items,
        auth: state.auth,
        physicalAsset: state.physicalAsset
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchItem: (itemId) => dispatch(fetchItem(itemId)),
        UpdatePhysicalAsset: (assetId, updatedAsset) => dispatch(UpdatePhysicalAsset(assetId, updatedAsset))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAssetDetail);