import React, { Component } from 'react';
import Web3 from 'web3';
import AuctionContract from '../../abis/Auctions.json';
import {Row, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Datetime from 'react-datetime';
import './testing.css'
// add functionality to return money back, when person outbidded

class DigitalAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_address: '',
            auction_contract:'',
            base_price:'',
            date_time:'',
            modal_open: false,
            errors:{
                base_price: '',
                date_time: ''
            }
        }
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    dateValidate(current){
        const event_date = new Date(current._d);
        const now_date = new Date();
        if(Date.parse(event_date)<=Date.parse(now_date))
            return false;
        return true;
    }



    toggleModal = () => {
        this.setState({
            modal_open: !this.state.modal_open
        })
    }

    renderModal = () =>{
        return(
            <>
            <Modal isOpen={this.state.modal_open} 
               toggle={() => this.toggleModal()}
               className='modal-dialog modal-dialog-centered modal-lg'
               backdrop='static'
               >
                <ModalHeader className='digital_modal_header' toggle={() => this.toggleModal()}>Sell Digital Asset</ModalHeader>
                <ModalBody>
                    <Form className="login_form">
                        <Row className="form_input_row form_grp">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="form_input_label">Initial Price (in ethers)</Form.Label>
                                <input name="base_price" className="form_input_field form-control" type="number" value={this.state.base_price} placeholder="Initial price in ETH" onChange={this.handleInputChange} min={0} step={'any'}/>
                                <div className="invalid__feedback">{this.state.errors.base_price}</div>
                            </Form.Group>
                        </Row>

                        <Row className="form_input_row form_grp">
                            <Form.Group className="mb-3" controlId="itemPrice">
                            <Form.Label className="form_input_label">Auction end Date and Time</Form.Label>
                                <Datetime initialValue={this.state.date_time}
                                    inputProps={{
                                        className:"form_input_field form-control date_time_input",
                                        placeholder: "End Date and Time"
                                    }} 
                                isValidDate={this.dateValidate}
                                    onChange={(d) => {
                                        this.setState({
                                            date_time: d
                                        })
                                    }}/>
                            
                                <div className='invalid__feedback'>{this.state.errors.date_time}</div>
                            </Form.Group>
                        </Row>
                        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} color='info'>Sell Asset</Button>
                    <Button color='danger' onClick={() => this.toggleModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>

            </>
        )
    }

    loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        // console.log(window.web3);
    }

    loadContract = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts()
        this.setState({account_address: accounts[0]});
         
        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        const networkData = AuctionContract.networks[networkId]
        const auction_contract = new web3.eth.Contract(AuctionContract.abi, networkData.address);
        // console.log(auction_contract);
        this.setState({
            auction_contract:auction_contract
        }) 
    }
    
    createAuction = async () => {
        const { auction_contract } = this.state;
        const nft_id = 3;
        const auctionStartprice = 2;
        const accounts  = await window.web3.eth.getAccounts();
        const account = accounts[0];
        const end_time = Date.now() + 10000;
        const auctionCreationTime = Date.now();

        let data = {_nftId:nft_id, _ownerAccount:account, _ownerId:1,_auctionEndTime:end_time, _auctionCreationTime:auctionCreationTime, _auctionStartPrice:auctionStartprice};

        if(auction_contract){
            const res = await auction_contract.methods.CreateAuction(data._nftId, data._ownerAccount, data._ownerId, 
                data._auctionEndTime, data._auctionCreationTime, data._auctionStartPrice).send({from:account});
            
            if(res&& res.status===true){
                console.log(res);
               console.log('Auction Created');    
            }
        }
    }
    
    getAuctionDetails = async (nft_id) => {
        const { auction_contract } = this.state;
        if(auction_contract){
            const auction_details = await auction_contract.methods.GetAuctionDetails(nft_id).call();
            let data  = {
                nftId: nft_id,
                owner_account:auction_details[0],
                owner_id:auction_details[1],
                auction_end_time:auction_details[2],
                auction_start_price:auction_details[3],
                auction_current_bid:auction_details[4],
                auction_ended:auction_details[5],
                bid_started:auction_details[6]
            }
            console.log(data);
            return data;
        }
    }
    getAuctionsList = async () => {
        const { auction_contract } = this.state;
        if(auction_contract){
            const auctions_list = await auction_contract.methods.GetAvaliableAuctionsList().call();
            console.log(auctions_list);
        }
    }

    bidAuction = async () => {
        const { auction_contract } = this.state;
        const nft_id = 1;
        const bid_price = 3; // take care of conversion from wei to ethers, and also for floats
        const bidder_id = 2;
        const bidTime = Date.now();
        const { account_address } = this.state;
        if(auction_contract){
            const res = await auction_contract.methods.BidAuction(nft_id, bid_price, bidder_id, account_address, bidTime).send({from:account_address, 
                value: window.web3.utils.toBN(bid_price*1000000000000000)});
            console.log(res);
        }
    }

    endAuction = async () => {
        const { auction_contract } = this.state;
        const nft_id = 3;
        const end_time = Date.now();
        const res = await auction_contract.methods.EndAuction(nft_id, end_time).send({from:this.state.account_address});
        console.log(res);
    }

    getData = async () => {
        const { auction_contract } = this.state;
        if(auction_contract){
            // await this.createAuction();
            // await this.getAuctionsList();
            // await this.bidAuction();
            await this.endAuction();
            await this.getAuctionDetails(3);
        }
    }

    init = async () => {
        try{
            await this.loadWeb3();
            await this.loadContract();
            await this.getData();
        }catch(error){
            console.log(error.message);
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.init();
    }

    render(){
        return(
            <div className='test_div'>
                <button className='' onClick={this.toggleModal}>Click Here</button>
                {this.renderModal()}
            </div>
        )
    }
}

export default DigitalAsset;