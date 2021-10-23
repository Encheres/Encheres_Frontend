import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { FetchPhysicalAssetWinnings } from '../../apis_redux/actions/winning';
import { PostOrder } from '../../apis_redux/actions/order';
import { UpdateSaleForItem } from '../../apis_redux/actions/item';
import AddressForm from '../FrequentComponents/AddressForm';
import { addressValidation } from '../FrequentComponents/AddressForm';
import InfiniteScroll from "react-infinite-scroll-component";
import swal from 'sweetalert';
import Loading from '../loading';
import RenderError from '../FrequentComponents/RenderError';
import './winnings.css'

class Winnings extends Component{

    constructor(props){
        super(props);

        this.state={
            page: 0,
            winnings: [],
            winnerDetailsModal: false,
            detailsFilled: false,
            contact: 0,
            totalPayment: 0,
            paymentModal: false,
            address:{
                addressLine1:"",
                addressLine2:"",
                city:"",
                addressState:"",
                country:"",
                postalCode:"",
            },
            errors: {
                address: '',
                contact: '',
                totalPayment: ''
            }
        }

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleAddressChange = (address)=>{
        this.setState({
            address: address
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }

    formValidate(){

        var error, contactError='', paymentError='';
        var temp = this.state.contact.toString();

        if(!this.state.totalPayment || this.state.totalPayment <= 0){
            paymentError="Total Payment must be greater than 0";
            error = true;
        }

        if(!temp.trim() || temp.length != 10){
            contactError="Invalid Contact Number";
            error = true;
        }

        const addressStatus = addressValidation(this.state.address);
        if(!error){
            error = addressStatus.error;
        }

        this.setState({
            errors: {
                address:addressStatus.address_error,
                contact: contactError,
                totalPayment: paymentError
            }
        })

        return !error;
    }

    paymentFormValidate(){

        var error, paymentError='';

        if(!this.state.totalPayment || this.state.totalPayment <= 0){
            paymentError="Total Payment must be greater than 0";
            error = true;
        }

        this.setState({
            errors: {
                totalPayment: paymentError
            }
        })

        return !error;
    }

    onWinDetailModalSubmit(){
        if(!this.formValidate()){
            return;
        }
        this.setState({
            detailsFilled: true, 
            winnerDetailsModal: !this.state.winnerDetailsModal
        })
    }

    onPaymentModalSubmit(){
        if(!this.paymentFormValidate()){
            return;
        }
        this.setState({
            paymentModal: !this.state.paymentModal
        })

        alert(this.state.totalPayment);
    }

    async onSubmitReceiverDetail(asset){

        if(!this.formValidate()){
            return;
        }

        var order = {
            item_id: asset._id,
            seller_details: {
                profile: asset.owner,
                contact_number: asset.owner_contact,
                address: asset.pickup_point
            },
            buyer_details: {
                profile: asset.bidder,
                contact_number: this.state.contact,
                address: {
                    addressLine1: this.state.address.addressLine1,
                    addressLine2: this.state.address.addressLine2,
                    city: this.state.address.city,
                    country: this.state.address.country,
                    state: this.state.address.addressState,
                    postalCode: this.state.address.postalCode
                }
            }
        }

        this.setState({
            winnerDetailsModal: false
        })

        var updatedAsset = asset;
        updatedAsset.sale = false;

        console.log(updatedAsset)

        await this.props.PostOrder(order);
        await this.props.UpdateSaleForItem(asset._id, false)

        if(this.props.orders.postFail || this.props.items.errMess){
            swal({
                title: "Failure!!", 
                text: (this.props.orders.postFailMess || this.props.items.errMess) ? 
                (this.props.orders.postFailMess || this.props.items.errMess) : 
                    "Something went wrong :( Try again!!", 
                icon: "error"
            });
        }else{
            swal({
                title: "Success!!",
                text: "Receiver Details Submitted!!",
                icon: "success"
            });
        }
    }

    async componentDidMount(){

        await this.props.FetchPhysicalAssetWinnings(0)

        if(this.props.winnings.winnings.length){
            this.setState({
                winnings: this.props.winnings.winnings
            })
        }
    }

    async fetchMoreAssets(){
        this.setState({
            page: this.state.page+1
        })

        await this.props.FetchPhysicalAssetWinnings(this.state.page);

        if(this.props.winnings.winnings.length){
            var tempWinnings = this.state.winnings;
            for(var i=0;i<this.props.winnings.winnings.length;i++){
                tempWinnings.push(this.props.winnings.winnings[i]);
            }
    
            this.setState({
                winnings: tempWinnings
            })
        }
    }

    renderTransaction = (asset) => {

        var transactionButton;
        if(!asset.sale){
            transactionButton =  <Button id='single-asset-purchase-button' onClick={() => this.setState({paymentModal: true})}>Make Payment</Button>
        }
        else if(this.state.detailsFilled){
            transactionButton =  <Button id='single-asset-purchase-button' onClick={() => this.onSubmitReceiverDetail(asset)}>Submit Details</Button>
        }
        else {
            transactionButton = <Button
                                    onClick={() => this.setState({
                                        winnerDetailsModal: !this.state.winnerDetailsModal
                                    })}
                                    id='single-asset-purchase-button' className='ml-4 mt-2'>
                                    Receiver Details
                                </Button>
        }

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
                            <h6 className='mr-4 winning-card-detail'>@{asset.owner.name}</h6>
                        </div>
                        <div className='col-6 col-md-4 col-lg-2'>
                            <h6 className='winning-card-label rainbow-lr'>To </h6>
                            <h6 className='winning-card-detail'>@{asset.bidder.name}</h6>
                        </div>
                        <div className='col-12 col-md-4 col-lg-2'>
                            {transactionButton}
                            <div className='mt-2 winning-card-detail '>
                                <h6>
                                    <span className='fa fa-phone-square' style={{marginRight: 10}} />
                                    {asset.owner_contact}
                                </h6>
                            </div>                     
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
                            <AddressForm 
                                address={this.state.address} 
                                handleAddressChange = {this.handleAddressChange} 
                                errors = {this.state.errors.address}/>
                            <Form.Group className="mb-3" controlId="contact">
                                <Form.Control
                                    type='number'
                                    name='contact'
                                    onChange={this.handleInputChange}
                                    className='new-item-form-field' 
                                    placeholder="Contact Number"
                                    style={{backgroundColor: '#03091F', 
                                        borderWidth: 0,
                                        color: 'white'
                                    }}
                            />
                            </Form.Group>
                            <div className='mb-4' id='new-item-form-error'>{this.state.errors.contact}</div>
                        </ModalBody>
                        <ModalFooter 
                                style={{backgroundColor: '#0B1126', borderWidth: 0}}
                        >
                            <Button 
                                onClick={() => this.onWinDetailModalSubmit()}
                                className='fa fa-lg fa-telegram' />
                            <Button 
                                onClick={() => this.setState({
                                    winnerDetailsModal: !this.state.winnerDetailsModal
                                })}
                                className='fa fa-lg fa-times-circle' />
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.paymentModal} >
                        <ModalHeader
                            style={{backgroundColor: '#0B1126', borderWidth: 0}}
                        >
                            <div style={{color: 'grey'}}>
                                Enter Total Payment 
                            </div>
                        </ModalHeader>
                        <ModalBody
                            style={{backgroundColor: '#0B1126', borderWidth: 0}}
                        >
                            <div className='mb-4' id='new-item-form-error'>{"Payment Can't be reverted ! Fill Carefully and then submit."}</div>
                            <Form.Group className="mb-3" controlId="totalPayment">
                                <Form.Control
                                    type='number'
                                    name='totalPayment'
                                    onChange={this.handleInputChange}
                                    className='new-item-form-field' 
                                    placeholder="Total Payment (Item Price + Delivery Cost) in ETH"
                                    style={{backgroundColor: '#03091F', 
                                        borderWidth: 0,
                                        color: 'white'
                                    }}
                            />
                            </Form.Group>
                            <div className='mb-4' id='new-item-form-error'>{this.state.errors.totalPayment}</div>
                        </ModalBody>
                        <ModalFooter 
                                style={{backgroundColor: '#0B1126', borderWidth: 0}}
                        >
                            <Button 
                                onClick={() => this.onPaymentModalSubmit()}
                                className='fa fa-lg fa-telegram' />
                            <Button 
                                onClick={() => this.setState({
                                    paymentModal: !this.state.paymentModal
                                })}
                                className='fa fa-lg fa-times-circle' />
                        </ModalFooter>
                    </Modal>
                </Card>
        );
    }

    render(){
        if(this.props.winnings.isLoading && !this.state.winnings.length){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if(this.props.winnings.errMess){
            return(
                <RenderError error={this.props.winnings.errMess} />
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
                            this.state.winnings.length 
                            ?
                            <InfiniteScroll
                                className={'row justify-content-center'}
                                dataLength={this.state.winnings.length}
                                next={() => this.fetchMoreAssets()}
                                hasMore={this.props.winnings.winnings.length ? true : false}
                                loader={<h4 style={{color: 'white'}}>Loading...</h4>}
                                endMessage={
                                    <div>
                                        <h4 className='col-12 rainbow-lr winnings-end-note'>
                                            No More Winnings :( 
                                            <br/>
                                            Participate in More Auctions :)
                                        </h4>
                                    </div>
                                }
                                >
                                {this.state.winnings.map((asset) => this.renderTransaction(asset))}
                            </InfiniteScroll>
                            :
                            <div>
                                <h4 className='col-12 rainbow-lr winnings-end-note'>
                                    No More Winnings :(
                                    <br/>
                                    Participate in More Auctions :)
                                </h4>
                            </div>
                        }
                </div>
            );
        }
    }
}

const  mapStateToProps = (state) => {
    return{
        winnings: state.winnings,
        orders: state.orders,
        items: state.items
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        FetchPhysicalAssetWinnings : (page) => dispatch(FetchPhysicalAssetWinnings(page)),
        PostOrder: (order) => dispatch(PostOrder(order)),
        UpdateSaleForItem: (itemId, sale) => dispatch(UpdateSaleForItem(itemId, sale))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Winnings);