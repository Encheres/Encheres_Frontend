import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardText, CardSubtitle,
    Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { FetchPhysicalAssets } from '../../apis_redux/actions/physicalAsset';
import AddressForm from '../FrequentComponents/AddressForm';
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../loading';
import './winnings.css'

class Winnings extends Component{

    constructor(props){
        super(props);

        this.state={
            page: 0,
            assets: [],
            detailsFilled: false,
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

    renderTransaction = (asset) => {
        return(
                <Card className='col-11' id='winning-card'>
                    <div className='row'>
                        <div className='col-12 col-md-12 col-lg-3'>
                            <h6 className='winning-card-label rainbow-lr'>Asset ID</h6>
                            <h6 className='winning-card-detail'>{asset._id}</h6>
                        </div>
                        <div className='col-12 col-md-12 col-lg-3'>
                            <h6 className='winning-card-label rainbow-lr'>Asset Name</h6>
                            <Link className='winning-card-link' 
                                to={`/view/independent-physical-assets/${asset._id}`}>
                                <h6 className='winning-card-detail'>@{asset.asset.name}</h6>
                            </Link>
                        </div>
                        <div className='col-6 col-md-4 col-lg-2'>
                            <h6 className='winning-card-label rainbow-lr'>From </h6>
                            <h6 className='mr-4 winning-card-detail'>@{"Ron Johanson"}</h6>
                        </div>
                        <div className='col-6 col-md-4 col-lg-2'>
                            <h6 className='winning-card-label rainbow-lr'>To </h6>
                            <h6 className='winning-card-detail'>@{"Mario Bridge"}</h6>
                        </div>
                        <div className='col-12 col-md-4 col-lg-2'>
                            {
                                this.state.detailsFilled ?
                                <Button id='single-asset-purchase-button'>
                                    Make Payment
                                </Button> :
                                <Button
                                    onClick={() => this.setState({
                                        winnerDetailsModal: !this.state.winnerDetailsModal
                                    })}
                                    id='single-asset-purchase-button' className='ml-4 mt-2'>
                                    Receiver Details
                                </Button>
                            }                                
                        </div>
                    </div>
                    <Modal isOpen={this.state.winnerDetailsModal} >
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
                </Card>
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
                <div>
                    <div className='row justify-content-center mt-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            MY WINNINGS
                        </h3>
                    </div>
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
                                {this.state.assets.map((asset) => this.renderTransaction(asset))}
                            </InfiniteScroll>
                            :
                            <h4 className='col-12 rainbow-lr winnings-end-note'>
                                That's the end Buddy!!
                            </h4>
                        }
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