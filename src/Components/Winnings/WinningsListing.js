import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardText, CardSubtitle,
    Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Form, Image } from 'react-bootstrap';
import { FetchPhysicalAssets } from '../../apis_redux/actions/physicalAsset';
import AddressForm from '../FrequentComponents/AddressForm';
import InfiniteScroll from "react-infinite-scroll-component";
import Identicon from 'react-identicons';
import Loading from '../loading';
import Buy_sell from '../../assets/images/sales.jpg';
import './winnings.css'

class Winnings extends Component{

    constructor(props){
        super(props);

        this.state={
            page: 0,
            assets: [],
            winnerDetailsModal: false,
            receiverAddress:{
                addressLine1:"",
                addressLine2:"",
                city:"",
                addressState:"",
                country:"",
                postalCode:"",
            },
            errors: {
                address: ''
            }
        }
    }

    handleAddressChange = (address)=>{
        this.setState({
            address: address
        })
    }

    async componentDidMount(){

        await this.props.FetchPhysicalAssets(0)

        if(this.props.physicalAsset.assets.length){
            this.setState({
                assets: this.props.physicalAsset.assets
            })
        }
    }

    async fetchMoreAssets(){
        this.setState({
            page: this.state.page+1
        })

        await this.props.FetchPhysicalAssets(this.state.page);

        if(this.props.physicalAsset.assets.length){
            var tempAssets = this.state.assets;
            for(var i=0;i<this.props.physicalAsset.assets.length;i++){
                tempAssets.push(this.props.physicalAsset.assets[i]);
            }
    
            this.setState({
                assets: tempAssets
            })
        }
    }

    renderWonAsset = (asset) => {

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
            <div className='col-12'>
                <Card id="asset-card-detail">
                    <CardBody>
                        <CardSubtitle
                            tag="h5"
                            className="mb-4 new-item-card-subtitle"
                            id="new-item-card-username"
                        >
                            {asset.asset.name}
                        </CardSubtitle>
                        <div className='row mt-2'>
                            <div className='col-12 col-lg-4'>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Asset ID{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {asset._id}
                                    </span>
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Pending Payment{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {asset.asset.aggregate_base_price+' ETH'}
                                    </span>
                                    <span style={{ marginLeft: 10, color: "grey" }}>
                                        ({(asset.asset.aggregate_base_price*295377.53).toFixed(2)+' Rs'})
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
                                <Button id='single-asset-purchase-button' className='mr-4 mt-2'>
                                    Make Payment
                                </Button>
                                {" "}
                                <Button 
                                    onClick={() => this.setState({
                                        winnerDetailsModal: !this.state.winnerDetailsModal
                                    })}
                                    id='single-asset-purchase-button' className='ml-4 mt-2'>
                                    Receiver Details
                                </Button>
                            </div>
                            <div className='mt-4 col-12 col-lg-6' >
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <div style={{marginRight: 20}}>
                                    <Identicon 
                                        string={asset.owner ? asset.owner : "0x95002C6453c30b1a3BD6eD8230683BAe5835C3Fd"}
                                        size={150}
                                        bg='#ffffff'
                                    />
                                    <CardText style={{color: 'cyan'}}>
                                        From
                                        <h6 style={{color: 'grey'}}>
                                            @{"Ron Johanson"}
                                        </h6>
                                    </CardText>
                                    </div>
                                    <div style={{marginLeft: 20}}>
                                    <Identicon string={asset.bidder ? asset.bidder : "0x3C0499eC11138D40A36bE1B70324aBF6dbe2Ca31"} 
                                        size={150}
                                        bg='#ffffff'
                                    />
                                    <CardText className='mr-0' style={{color: 'cyan'}}>
                                        To
                                        <h6 style={{color: 'grey'}}>
                                            @{"Mario Bridge"}
                                        </h6>
                                    </CardText>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.winnerDetailsModal}
                >
                    <ModalHeader
                        style={{backgroundColor: '#0B1126', borderWidth: 0}}
                    >
                        <div style={{color: 'grey'}}>
                            Enter Address and Contact
                        </div>
                    </ModalHeader>
                    <ModalBody
                        style={{backgroundColor: '#0B1126', borderWidth: 0}}
                    >
                        <AddressForm address={this.state.receiverAddress} handleAddressChange = {this.handleAddressChange} errors = {this.state.errors.address}/>
                        <Form.Group className="mb-3" controlId="contact">
                            <Form.Control
                                type='number'
                                name='contact'
                                className='new-item-form-field' 
                                placeholder="Contact Number"
                                style={{backgroundColor: '#03091F', 
                                    borderWidth: 0,
                                    color: 'white'
                                }}
                                />
                        </Form.Group>
                    </ModalBody>
                    <ModalFooter 
                            style={{backgroundColor: '#0B1126', borderWidth: 0}}
                    >
                        <Button 
                            className='fa fa-lg fa-telegram' />
                        <Button 
                            onClick={() => this.setState({
                                winnerDetailsModal: !this.state.winnerDetailsModal
                            })}
                            className='fa fa-lg fa-times-circle' />
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    render(){
        if(this.props.physicalAsset.isLoading && !this.state.assets.length){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if(this.props.physicalAsset.errMess){
            return(
                <div>
                    <h1>{this.props.physicalAsset.errMess}</h1>
                </div>
            );
        }
        else{
            return(
                <div className='container'>
                    <div className='row justify-content-center mt-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            MY WINNINGS
                        </h3>
                    </div>
                    <div className='row'>
                        {
                            this.state.assets.length 
                            ?
                            <InfiniteScroll
                                className={'row justify-content-center'}
                                dataLength={this.state.assets.length}
                                next={() => this.fetchMoreAssets()}
                                hasMore={this.props.physicalAsset.assets.length ? true : false}
                                loader={<h4 style={{color: 'white'}}>Loading...</h4>}
                                endMessage={
                                    <h4 className='col-12 rainbow-lr winnings-end-note'>
                                        That's the end Buddy!!
                                    </h4>
                                }
                                >
                                {this.state.assets.map((asset) => this.renderWonAsset(asset))}
                            </InfiniteScroll>
                            :
                            <h4 className='col-12 rainbow-lr winnings-end-note'>
                                That's the end Buddy!!
                            </h4>
                        }
                    </div>
                </div>
            );
        }
    }
}

const  mapStateToProps = (state) => {
    return{
        physicalAsset: state.physicalAsset,
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        FetchPhysicalAssets : (page) => dispatch(FetchPhysicalAssets(page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Winnings);