import React, {Component, useState} from 'react';
import Loading from '../loading';
import { RenderNftAssetCard } from './RenderNftAssetCard';
import { Row, Button, Modal, ModalHeader, ModalBody, Form, ModalFooter  } from "reactstrap";
import swal from 'sweetalert';
import '../View/View.css'

import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import NftAsset from '../../abis_2/NftAsset.json';
import AuctionContract from '../../abis_2/Auctions.json';
import Datetime from 'react-datetime';

class MyDigitalAssets extends Component {

    constructor(props){
        super(props);

        this.state={
            nftasset_contract: null,
            account_contract: null,
            account_address: '',
            account_integrated: false,
            createdAssetsLoading: true,
            createdAssets: [],
            ownedAssetsLoading: true,
            ownedAssets: [],
            created: true,
            base_price:'',
            date_time:'',
            modal_open: false,
            selected_asset:'',
            errors:{
                base_price: '',
                date_time: '',
                owner_account: '',
                nftId: '',
                ownerId:''
            }
        }
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

    async loadSmartContracts() {
       
        const web3 = window.web3

        // Network ID
        const networkId = await web3.eth.net.getId()

        const networkDataNft = NftAsset.networks[networkId]
        const networkDataAuction = AuctionContract.networks[networkId]


        if(networkDataNft && networkDataAuction){
            const nftasset_contract = new web3.eth.Contract(NftAsset.abi, networkDataNft.address)
            const auction_contract = new web3.eth.Contract(AuctionContract.abi, networkDataAuction.address)
            this.setState({ nftasset_contract, auction_contract })
        } else {
            swal({
                title: "OOPS!!",
                text: 'contract not deployed to detected network.',
                icon: "error"
            })
        }
    }

    integrateMetamaskAccount = async()=>{
        try{
            const provider = await detectEthereumProvider();
            if(!provider){
                swal({
                    title: "OOPS!!",
                    text: "Please use a browser with MetaMask installed in it",
                    icon: "error"
                })
                return;
            }
              
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            this.setState({
                account_address: accounts[0],
                account_integrated:true
            })
            console.log(accounts[0])

        }catch(err){
            swal({
                title: "OOPS!!",
                text: "Metamask Account Integration failed",
                icon: "error"
            })
        }  
    }

    async componentDidMount(){
        
        this.setState({createdAssetsLoading: true});
        await this.loadWeb3();
        await this.integrateMetamaskAccount();
        await this.loadSmartContracts();
        await this.loadCreatedAssets();
        this.setState({createdAssetsLoading: false})

    }

    async loadCreatedAssets(){
            this.setState({createdAssets: []});
            
            var createdAssets = [], assetsCount;
            await this.state.nftasset_contract.methods.getAccountCreatedAssets().call({from: this.state.account_address})
            .then((result) => {
                createdAssets = result[0];
                assetsCount = result[1]
            })
            .catch((er) => {
                console.log(er)
                this.setState({createdAssetsLoading: false})
            })

            for (var i = 0; i < assetsCount; i++) {
                const asset = await this.state.nftasset_contract.methods.assets(createdAssets[i]).call()
                const categories = await this.state.nftasset_contract.methods.getAssetCategories(asset.tokenId).call()
                asset.categories = categories[0];
            
                this.setState({
                    createdAssets: [...this.state.createdAssets, asset]
                })
            }

    }

    async loadOwnedAssets(){

        this.setState({ownedAssets: []})
        var ownedAssets = [], assetsCount;
        await this.state.nftasset_contract.methods.getAccountOwnedAssets().call({from: this.state.account_address})
        .then((result) => {
            ownedAssets = result[0];
            assetsCount = result[1]
        })
        .catch((er) => {
            console.log(er)
            this.setState({ownedAssetsLoading: false})
        })

        for (var i = 0; i < assetsCount; i++) {
            const asset = await this.state.nftasset_contract.methods.assets(ownedAssets[i]).call()
            const categories = await this.state.nftasset_contract.methods.getAssetCategories(asset.tokenId).call()
            asset.categories = categories[0];
            
            this.setState({
                ownedAssets: [...this.state.ownedAssets, asset]
            })
        }

    }

    async onCreatedSelect(){
        this.setState({created: true, createdAssetsLoading: true})
        await this.loadCreatedAssets();
        this.setState({createdAssetsLoading: false})
    }

    async onOwnedSelect(){
        this.setState({created: false, ownedAssetsLoading: true})
        await this.loadOwnedAssets();
        this.setState({ownedAssetsLoading: false})
    }

    validateData = (data) => {
        let errors = {};
        let formIsValid = true;
        const { auctionEndTime, auctionStartPrice,ownerAccount,
            _ownerId, nftId} = data;
        let base_price_error = '', date_time_error = '', owner_account_error = '', nftId_error = '', ownerId_error:'';
        if(!auctionStartPrice|| auctionStartPrice<=0){
            formIsValid = false;
            base_price_error = 'Base Price must be a positive value';
        }
        if(!auctionEndTime){
            formIsValid = false;
            date_time_error = 'Auction End Time must be selected';
        }
        if(!ownerAccount){
            formIsValid = false;
            owner_account_error = 'Unable to fetch details of user account. Please ensure that metamask is connected to our website';
        }

        if(!nftId){
            formIsValid = false;
            nftId_error = 'Invalid Item';
        }

        if(!_ownerId){
            formIsValid = false;
            ownerId_error = 'You must login to continue';
        }
        const formErrors = {
            base_price:base_price_error,
            date_time: date_time_error,
            owdner_account: owner_account_error,
            nftId: nftId_error,
            ownerId: ownerId_error
        }
        this.setState({
            errors:{
                ...errors,
                ...formErrors
            }
        })

        if(!formIsValid){
            console.log(formErrors);
        }

        return {formIsValid, ...formErrors};
    }

    createAuction = async (data) => {
        try{
            // await this.loadWeb3();
            // await this.loadContract();
            const { auction_contract, account_address } = this.state;

            if(auction_contract){
                const res = await auction_contract.methods.CreateAuction(data._nftId, data._ownerAccount, data._ownerId, 
                    data._auctionEndTime, data._auctionCreationTime, data._auctionStartPrice).send({from:account_address});
                
                if(res&& res.status===true){
                    console.log(res);
                console.log('Auction Created');    
                }
            }
        }catch(err){
            console.log(err);
        }
    }


    toggleModal = (e) => {
        e.preventDefault();
        const data= e.target.data;
        if(data){
            this.setState({
                selected_asset:data, 
                modal_open: !this.state.modal_open
            })
        }else{
            this.setState({
                selected_asset:'',
                modal_open: !this.state.modal_open
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { selected_asset, base_price, date_time, account_address} = this.state;
        
        // form data according to the contract need
        const data = {
            _auctionEndTime: Date.parse(date_time),
            _auctionStartPrice: base_price,
            _ownerAccount:account_address,
            _ownerId:1,
            _nftId:selected_asset.tokenId,
            _auctionCreationTime: Date.now()
        };

        let validationData = this.validateData(data);
        if(validationData.formIsValid){
            this.createAuction(data);
        }

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

    render(){

        if((!this.state.created && this.state.ownedAssetsLoading) || (this.state.created && this.state.createdAssetsLoading)){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if((this.state.created && this.state.createdAssets.length === 0) || (!this.state.created && this.state.ownedAssets.length === 0)){
            return(
                <div className='container-fluid asset-container'>
                    <div className='row justify-content-center mt-4 mb-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            DIGITAL ASSETS (NFTS)
                        </h3>
                        <div className='col-12 new-item-card-button-div mt-4'>
                            <Button 
                                onClick={() => this.onCreatedSelect()}
                                disabled={this.state.created}
                                className='mt-2 new-item-card-button'>
                                    CREATED
                            </Button>
                            <Button 
                                onClick={() => this.onOwnedSelect()}
                                disabled={!this.state.created}
                                className='mt-2 new-item-card-button'>
                                OWNED
                            </Button>
                        </div>
                    </div>
                    <div 
                        className={'row justify-content-center'}>
                            <h4 className='col-12 rainbow-lr new-item-heading'>
                                You don't own any digital assets :(
                                <br/>
                                <br/>
                                Create or Buy a digital asset!!
                            </h4>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className='container-fluid asset-container'>
                    <div className='row justify-content-center mt-4 mb-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            DIGITAL ASSETS (NFTS)
                        </h3>
                        <div className='col-12 new-item-card-button-div mt-4'>
                            <Button 
                                disabled={this.state.created}
                                onClick={() => this.onCreatedSelect()}
                                className='mt-2 new-item-card-button'>
                                    CREATED
                            </Button>
                            <Button 
                                onClick={() => this.onOwnedSelect()}
                                disabled={!this.state.created}
                                className='mt-2 new-item-card-button'>
                                OWNED
                            </Button>
                        </div>
                    </div>
                    <div 
                        className={'row justify-content-center'}>
                        {
                            this.state.created ?
                            this.state.createdAssets.map((asset) => 
                                <RenderNftAssetCard asset={asset} onSellClick={this.toggleModal}/>
                            ) :
                            this.state.ownedAssets.map((asset) => 
                                <RenderNftAssetCard asset={asset} />
                            )
                        }
                    </div>
                    {this.renderModal()}
                </div>
            )
        }   
        
    }
}

export default MyDigitalAssets;