import React, {Component} from 'react';
import Loading from '../loading';
import { RenderNftAssetCard } from './RenderNftAssetCard';
import { Row, Button, Modal, ModalHeader, ModalBody, ModalFooter  } from "reactstrap";
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import '../View/View.css'

import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import NftAsset from '../../abis/NftAsset.json';
import AuctionContract from '../../abis/Auctions.json';
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
            creator:'',
            royality:'',
            errors:{
                base_price: '',
                date_time: '',
                owner_account: '',
                nftId: '',
                creator: '',
                royality: ''
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
        try{

            this.setState({createdAssetsLoading: true});
            await this.loadWeb3();
            await this.integrateMetamaskAccount();
            await this.loadSmartContracts();
            await this.loadCreatedAssets();
            this.setState({createdAssetsLoading: false})
        }catch(err){
            console.log(err)
        }
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

    loaduserId = async()=>{
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

    toggleModal = (data) => {
        if(data){
            this.setState({   selected_asset:data,
                creator: data.creator,
                royality: data.royality, 
                modal_open: !this.state.modal_open,
            })
        }else{
            this.setState({
                selected_asset:'',
                creator: '',
                royality: '',
                modal_open: !this.state.modal_open
            })
        }
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    validateData = (data) => {
        let errors = {};
        let formIsValid = true;
        const {_nftId, _ownerAccount, _auctionEndTime, _auctionCreationTime, _auctionStartPrice,  _creatorAccount, _royality} = data;
        let nftId_error = '', owner_account_error = '',  date_time_error = '', base_price_error = '',  creator_account_error = '', royality_error = '';
        if(!_nftId){
            nftId_error = 'Invalid NFT Id';
            formIsValid = false;
        }
        
        if(!_ownerAccount){
            formIsValid = false;
            owner_account_error = 'Unable to fetch details of user account. Please ensure that metamask is connected to our website';
        }

        if(!_auctionEndTime|| _auctionEndTime<=0|| _auctionEndTime<=_auctionCreationTime){
            formIsValid = false;
            date_time_error = 'Enter a valid future auction end time';
        }
        
        if(!_auctionStartPrice|| _auctionStartPrice<=0){
            formIsValid = false;
            base_price_error = 'Base Price must be a positive value';
        }

        if(!_creatorAccount){
            formIsValid = false;
            creator_account_error = 'Unable to fetch details of creator of asset';
        }

        if(_royality<0){
            formIsValid = false;
            royality_error = 'Royality cannot be negative';
        }
        const formErrors = {
            base_price:base_price_error,
            date_time: date_time_error,
            owdner_account: owner_account_error,
            nftId: nftId_error,
            creator_account: creator_account_error,
            royality: royality_error
        }
        this.setState({
            errors:{
                ...errors,
                ...formErrors
            }
        })

        if(!formIsValid){
            console.log({formErrors});
        }

        return {formIsValid, ...formErrors};
    }

    dateValidate = (current) =>{
        const event_date = new Date(current._d);
        const now_date = new Date();
        if(Date.parse(event_date)<=Date.parse(now_date))
            return false;
        return true;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { selected_asset, base_price, date_time, account_address, creator, royality} = this.state;
        
        // form data according to the contract needs -> owner_id, nftId
        const data = {
            _nftId:selected_asset.tokenId,
            _ownerAccount:account_address,
            _auctionEndTime: Date.parse(date_time),
            _auctionCreationTime: Date.now(),
            _auctionStartPrice: window.web3.utils.toBN(base_price* window.web3.utils.toBN("1000000000000000000")),
            _creatorAccount: creator,
            _royality: royality,
        };

        let validationData = this.validateData(data);
        if(validationData.formIsValid){
            console.log("Valid data");
            this.createAuction(data);
        }
    }

    createAuction = async (data) => {
        try{
            const { auction_contract, account_address } = this.state;

            if(auction_contract){
                const res = await auction_contract.methods.CreateAuction(data._nftId, data._ownerAccount, data._auctionEndTime, 
                    data._auctionCreationTime, data._auctionStartPrice, data._creatorAccount, data._royality).send({from:account_address});
                
                if(res&& res.status===true){
                    console.log(res);
                    swal({
                        title: "Success",
                        text: "Auction created successfully",
                        icon: "success",
                    })
                    this.toggleModal();
                    console.log('Auction Created');    
                }
            }
        }catch(err){
            swal({
                title: "Error",
                text: "Unable to create auction",
                icon: "error",
            })
            console.log(err);
        }
    }

    renderModal = () =>{
        if(this.state.modal_open){
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
        }else return (
            <></>
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
                <>
                <div className='container-fluid asset-container'>
                    <div className='row justify-content-center mt-4 mb-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            DIGITAL ASSETS (NFTS)
                        </h3>
                        <div className='col-12 new-item-card-button-div mt-4'>
                            <Button 
                                onClick={() => this.onCreatedSelect()}
                                disabled={this.state.created}
                                className={'special_btn_dis mt-2 new-item-card-button '+ (this.state.created?'selected_button_navigation':'')}
                            >
                                    CREATED
                            </Button>
                            <Button 
                                onClick={() => this.onOwnedSelect()}
                                disabled={!this.state.created}
                                className={'special_btn_dis mt-2 new-item-card-button ' + (!this.state.created?'selected_button_navigation':'')}
                            >
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
                <div>
                </div>
                </>
            );
        }
        else{
            return(
                <>
                {this.renderModal()}
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
                </div>
                <div>
                    
                </div>
                </>
            )
        }   
        
    }
}

export default MyDigitalAssets;