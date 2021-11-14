import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import AddressForm from '../FrequentComponents/AddressForm';
import { addressValidation } from '../FrequentComponents/AddressForm';
import swal from 'sweetalert';
import Web3 from 'web3';
import Account from '../../abis/Account.json';
import { connect } from 'react-redux';

class RenderWinning extends Component {
    constructor(props){
        super(props);
        this.state={
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
            },
            account_smart_contract: null
        }

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async loadWeb3() {
        if (window.web3) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          console.log(window.web3)
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            swal({
                title: "OOPS!!",
                text: 'Non-Ethereum browser detected. You should consider trying MetaMask!',
                icon: "error"
            })
        }
    }

    async loadAccountSmartContract() {
       
        const web3 = window.web3

        // Network ID
        const networkId = await web3.eth.net.getId()

        const networkData = Account.networks[networkId]
        if(networkData) {
            const account_contract = new web3.eth.Contract(Account.abi, networkData.address)
            this.setState({ account_smart_contract: account_contract })
        } else {
            swal({
                title: "OOPS!!",
                text: 'contract not deployed to detected network.',
                icon: "error"
            })
        }
    }

    async componentDidMount(){

        await this.loadWeb3();

        await this.loadAccountSmartContract();


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

        var error = false, contactError='', paymentError='';
        var temp = this.state.contact.toString();

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
            alert("called")
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

    }

    async onSubmitPayment(assetId, receiver, payer){
        if(!this.paymentFormValidate()){
            return;
        }

        let paymentAmount = window.web3.utils.toWei(this.state.totalPayment.toString(), 'Ether')

        await this.state.account_smart_contract.methods.receivePayment(receiver)
        .send({ from: payer, value: paymentAmount })
        .once('receipt', async (receipt) => {

            await this.props.UpdateShippedStatusForItem(assetId, true);
            await this.props.RemoveOrder(assetId);

            swal({
                title: "Payment Successfull",
                text: "Congratulations! Now you own this asset.",
                icon: "success"
            })
            
            setTimeout(() => {
                window.location.reload(); 
            }, 5000);
        })
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

    render(){

        const asset = this.props.asset;

        var transactionButton;
        if(!asset.sale){

            if(asset.shipped){
                transactionButton =  <Button id='single-asset-purchase-button' disabled>Asset Shipped</Button>
            }
            else{
                if(this.state.totalPayment == 0)
                    transactionButton =  <Button id='single-asset-purchase-button' 
                                            onClick={() => this.setState({paymentModal: true})}>
                                            Make Payment
                                        </Button>
                else 
                    transactionButton =  <Button id='single-asset-purchase-button' 
                                            onClick={() => this.onSubmitPayment(asset._id, asset.owner.accounts[0], asset.bidder.accounts[0])}>
                                            Pay {this.state.totalPayment} ETH
                                        </Button>
            }
            
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
                            <Link className='winning-card-link' 
                                to={`/profile/${asset.owner._id}`}>
                                <h6 className='winning-card-detail'>@{asset.owner.name}</h6>
                            </Link>
                        </div>
                        <div className='col-6 col-md-4 col-lg-2'>
                            <h6 className='winning-card-label rainbow-lr'>To </h6>
                            <Link className='winning-card-link' 
                                to={`/profile/${asset.bidder._id}`}>
                                <h6 className='winning-card-detail'>@{asset.bidder.name}</h6>
                            </Link>
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
}
const mapStateToProps = (state) => ({
    orders: state.orders,
    items: state.items,
});
export default connect(mapStateToProps,{})(RenderWinning);