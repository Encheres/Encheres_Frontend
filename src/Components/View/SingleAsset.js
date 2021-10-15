import React, {useState} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import {Card, CardBody, UncontrolledCarousel, CardSubtitle, CardText, Button, Collapse} from 'reactstrap';
import { Form } from 'react-bootstrap';
import { renderPhysicalAssetCategories } from '../FrequentComponents/Asset';
import { CountdownTimer } from '../FrequentComponents/CountdownTimer';
import { FaEthereum } from 'react-icons/fa';
import './View.css'
import { render } from '@testing-library/react';
class RenderPhysicalAssets extends React.Component{

    constructor(props){
        super(props);

        this.state={
            isOpen: false,
            bid: this.props.asset.asset.aggregate_base_price,
            price: this.props.asset.asset.aggregate_base_price,
            bidsError: ''
        }

        this.handleBidChange = this.handleBidChange.bind(this);
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    async submitBid(){

        /******** FRONTEND AVOIDANCE TO ALLOW ONLY HIGHER BIDS *******/
        if(this.state.bid <= this.props.asset.asset.aggregate_base_price){
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

        var asset = {
            ...this.props.asset.asset,
            aggregate_base_price
        }

        var updatedAsset = {
            ...this.props.asset,
            asset,
            bidder
        }

        await this.props.placeBid(this.props.asset._id, updatedAsset);

        if(this.props.assetStatus.isBidLegal){
            this.setState({
                price: this.state.bid
            })
            alert(this.props.assetStatus.legalBidMess);
        }
        else{
            alert(this.props.assetStatus.illegalBidMess);
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

        var asset = this.props.asset

        var assetShowcaseCarousel = [];
        var showcaseElement;
        for(var i=0;i<asset.asset.images.length;i++){
            showcaseElement = {
                src: "https://ipfs.infura.io/ipfs/"+asset.asset.images[i],
                altText: "Slide "+i.toString(),
                key: i.toString()
            }

            assetShowcaseCarousel.push(showcaseElement);
        }

        return(
            <div className='col-10 col-sm-6 col-md-5 col-lg-3'>
                <Card id="new-item-card">
                     <CountdownTimer end_date_time={asset.event_end_date_time} />
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
                                            <a style={{textDecoration: 'none', color: 'cyan'}} href={'https://ipfs.infura.io/ipfs/'+asset.assetVideoHash}>Link</a>}
                                    </span>
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Price{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {this.state.price+' ETH'}
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
                            <div className="mt-0 mb-4 new-item-accountbox">
                                <CardText id="new-item-card-account">
                                    @{"john_bill123"}
                                </CardText>
                            </div>
                            <div id='single-asset-purchase-button-container'>
                                <Button 
                                    id='single-asset-purchase-button' 
                                    disabled={!asset.bids}
                                    onClick={this.toggle}>
                                    <span><FaEthereum /> Purchase</span>
                                </Button>
                                <Collapse isOpen={this.state.isOpen}>
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
                                                onClick={() => this.submitBid()}
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
        )
    }
} 

export default RenderPhysicalAssets;