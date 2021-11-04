import React, {Component} from 'react';
import {Button, Card, CardBody, CardSubtitle, CardText } from 'reactstrap';
import { Image, Badge } from 'react-bootstrap';
import Loading from '../loading';
import RenderError from '../FrequentComponents/RenderError';
import swal from 'sweetalert';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { renderAssetCategoriesFromIds } from '../FrequentComponents/Asset';
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import NftAsset from '../../abis/NftAsset.json';
import AuctionContract from '../../abis/Auctions.json';
import {CountdownTimer} from '../FrequentComponents/CountdownTimer';
import{ipfs_base_url} from '../../apis_redux/apis/encheres';
import './MyDigitalAssets.css';

class NftAssetDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            auction_contract:'',
            nftId:'',
            auctions_list:[],
            auction_details:'',
            OnSale:false,
            account_address:'',
            nftAssetLoading: true,
            nftAsset: null,
            nftasset_contract: null,
            errors:{
                bid_value:''
            }
        }
    }

    async componentDidMount(){
        
        this.setState({nftAssetLoading: true, nftId: this.props.nftAssetId});
        await this.loadWeb3();
        await this.integrateMetamaskAccount();
        await this.loadSmartContracts();
        await this.getAuctionsList();
        await this.fetchAuctionDetails();
        await this.loadNftAsset(this.props.nftAssetId);
        this.setState({nftAssetLoading: false})

    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    async loadNftAsset(nftAssetId){
        const asset = await this.state.nftasset_contract.methods.assets(nftAssetId).call()
        const categories = await this.state.nftasset_contract.methods.getAssetCategories(nftAssetId).call()
        const owner = await this.state.nftasset_contract.methods.ownerOf(nftAssetId).call()
        asset.categories = categories[0];
        asset.owner = owner;

        this.setState({nftAsset: asset});
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
        const networkDataAuction = AuctionContract.networks[networkId]
        const networkDataNft = NftAsset.networks[networkId]

        if(networkDataNft&&networkDataAuction){
            const auction_contract = new web3.eth.Contract(AuctionContract.abi, networkDataAuction.address)
            const nftasset_contract = new web3.eth.Contract(NftAsset.abi, networkDataNft.address)
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
    getAuctionsList = async () => {
        try{
            const { auction_contract } = this.state;
            if(auction_contract){
                const auctions_list = await auction_contract.methods.GetAvaliableAuctionsList().call();
                console.log(auctions_list);
                this.setState({
                    auctions_list
                })
            }
        }catch(err){
            console.log(err)
        }
    }

    fetchAuctionDetails = async() =>{
        try{
            const {auction_contract, auctions_list, nftId} = this.state;
            if(auctions_list.includes(nftId)){
                const auction_details = await auction_contract.methods.GetAuctionDetails(nftId).call();
                const data  = {
                    owner_account: auction_details[0],
                    auction_end_time: auction_details[1],
                    auction_start_price: auction_details[2],
                    auction_current_bid: auction_details[3],
                    auction_ended: auction_details[4],
                    bid_started: auction_details[5],
                    highest_bidder: auction_details[6]
                }
                console.log({data})
                this.setState({
                    auction_details:data,
                    OnSale:true
                })
                this.updateAuctionDetails();
            }else{
                console.log('not on sale')
                this.setState({
                    OnSale:false
                })
            }
        }catch(err){
            console.log(err)
        }
    }
    updateAuctionDetails = async() =>{
        const time = setInterval(async()=>{
            await this.fetchAuctionDetails();
            if(this.state.auction_details.auction_ended){
                clearInterval(time);
            }
        },120000) // fetch details every 2 min.
    }

    validBid = (bid_value) =>{
        const {auction_details} = this.state;
        let bid_value_error = '';
        if(!bid_value|| bid_value<=0|| bid_value<auction_details.auction_start_price|| bid_value<=auction_details.auction_current_bid){
            bid_value_error = 'Your bid must be greater than start price and prev bids';
        }
        this.setState({
            errors:{
                bid_value:bid_value_error
            }
        })
        console.log(this.state.bid_value);
        return bid_value_error?false:true;
    }
 

    bidOnAsset = async() =>{
        const{auction_contract, nftId, account_address, bid_value, auction_details} = this.state;
        if(!bid_value){
            return;
        }
        let auction_bid_value = window.web3.utils.toBN(bid_value* window.web3.utils.toBN("1000000000000000000"));
        if(!this.validBid(auction_bid_value)){
            return;
        }
        try{
            if(auction_bid_value>0&& auction_bid_value>auction_details.auction_current_bid){
                const bid_time = Date.now();
                await auction_contract.methods.BidAuction(nftId, auction_bid_value, account_address, bid_time).send({from:account_address, 
                    value: auction_bid_value});// 1 ether = 1000000000000000000 wei
                swal({
                    title: "Success",
                    text: "Bid Placed Successfully",
                    icon: "success"
                })

            }else{
                swal({
                    title: "OOPS!!",
                    text: "Bid value should be greater than current bid",
                    icon: "error"
                })

            }
        }catch(err){
            console.log(err);
        }
        await this.fetchAuctionDetails();
    }

    endAuction = async() =>{
        const {OnSale, auction_details, auction_contract,nftasset_contract, nftId} = this.state;
        if(!OnSale){
            return;
        }  
        try{
            console.log("trying")
            
            if(OnSale&& auction_details && auction_details.end_date_time){
                let end_date_time = auction_details.end_date_time;
                end_date_time = parseInt(end_date_time);
                if(Date.now()>=end_date_time){
                    console.log('ending aucttion')
                    const details = await auction_contract.methods.EndAuction(nftId, end_date_time).send({from:auction_details.owner_account});
                    const det2 = await nftasset_contract.methods.transferAssetOwnership(auction_details.owner_account, auction_details.highest_bidder, nftId).send({from:auction_details.highest_bidder});
                    console.log({details, det2});
                    swal({
                        title: "Success",
                        text: "Auction Ended Successfully",
                        icon: "success"
                    })
                    this.setState({
                        OnSale:false,
                        auction_details:''
                    })
                }
            }
        }catch(err){
            swal({
                title: "OOPS!!",
                text: "Auction End Failed",
                icon: "error"
            })
        }
    }

    renderBidDetails = (asset) =>{
        let {auction_details} = this.state;
        const highestBidder = auction_details.highest_bidder.toString().slice(0, 8)+'...  ';
        if(auction_details){
            const end_date_time = parseInt(auction_details.auction_end_time);
            if(Date.now()>=end_date_time){
                // console.log(Date.now(), end_date_time);
                this.endAuction();
            }
            return(
                <div className='Item_bid_section'>
                    {/* {end_date_time>=Date.now()?this.endAuction():''} */}
                    <CardSubtitle tag="h6" className="new-item-preview-price">
                        Auction Ends In{"  "}
                        <div className="timer_div_asset" style={{ marginLeft: 10, color: "cyan" }}>
                            <CountdownTimer end_date_time={end_date_time} />
                        </div>
                    </CardSubtitle>
                    {auction_details.bid_started?<>
                    <CardSubtitle tag="h6" className="new-item-preview-price">
                        Highest Bid{"  "}
                        <span style={{ marginLeft: 10, color: "cyan" }}>
                            {auction_details.auction_current_bid/1000000000000000000} ETH
                        </span>
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="new-item-preview-price">
                        Highest Bidder{"  "}
                        <span style={{ marginLeft: 10, color: "cyan" }}>
                            {highestBidder}
                            <CopyToClipboard text={auction_details.highest_bidder}>
                                <span className='fa fa-copy' />
                            </CopyToClipboard>
                        </span>
                    </CardSubtitle>
                    </>
                    :<>
                    <CardSubtitle tag="h6" className="new-item-preview-price">
                        Start Price{"  "}
                        <span style={{ marginLeft: 10, color: "cyan" }}>
                            {auction_details.auction_start_price/1000000000000000000} ETH
                        </span>
                    </CardSubtitle>
                    
                    </>}

                    <CardSubtitle tag="h6" className="new-item-preview-price">
                        Place Bid{"  "}
                        <div className="digital_asset_bid_div">
                            <input name="bid_value" className="form_input_field form-control" type="number" value={this.state.bid_value} placeholder="Price in ETH" onChange={this.handleInputChange} min={0} step={'any'}/>
                            <div className="invalid__feedback" style={{textAlign:'left'}}>{this.state.errors.bid_value}</div>
                            <Button color="primary"  className="digital_asset_bid_btn" onClick={this.bidOnAsset}>Bid Asset</Button>
                        </div>
                    </CardSubtitle>
                    
                </div>
            )
        }else{
            return<></>
        }
    }

    render(){

        if(this.state.nftAssetLoading){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if(!this.state.nftAsset){
            return(
                <RenderError error={"Asset didn't load! Try again"} />
            );
        }
        else{
            var asset = this.state.nftAsset;
            const assetCreator = asset.creator.toString().slice(0, 8)+'...  ';
            const assetOwner = asset.owner.toString().slice(0, 8)+'...  ';

            return(
            <div className='container'>
                <div className='row justify-content-center mt-4 mb-4'>
                    <h3 className='col-12 rainbow-lr new-item-heading'>
                        {asset.name.toUpperCase()} #{asset.tokenId}
                    </h3>
                </div>
                <div className='digital-asset-card-detail-container row mt-4'>
                    <div className='col-12 col-md-6 col-lg-6'>
                        <Card id="new-item-card">
                            <Image className="new-item-image" rounded
                                src={ipfs_base_url+asset.assetFileHash}
                            />
                            <CardBody>
                            <CardSubtitle
                                tag="h5"
                                className="mt-3 mb-3 new-item-card-subtitle"
                                id="new-item-card-username"
                            >
                                {asset.name}
                            </CardSubtitle>
                            <CardText id="new-item-card-info" className="mb-4">
                                {   
                                    asset.description
                                }
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className='col-12 col-md-6 col-6'>
                    <Card id="digital-asset-card-detail">
                        <CardBody>
                            {this.state.OnSale && <>
                                <Badge className='sale_badge_digital_asset'> On Sale</Badge>
                                {this.renderBidDetails(asset)}
                                </>
                            }
                            <CardSubtitle tag="h5" className="mb-4 new-item-preview-price">
                                <span className='fa fa-tags' /> Categories 
                            </CardSubtitle>
                            <div>
                                {
                                    renderAssetCategoriesFromIds(asset.categories)
                                }
                            </div>
                            <CardSubtitle tag="h5" className="mb-4 new-item-preview-price">
                                <span className='fa fa-bars' /> Details 
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Contract Address{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {"0x3fc1c8... "}
                                    <CopyToClipboard text={"0x3fc1c81d8551933349E36A65058d3F79251d8a97"}>
                                        <span className='fa fa-copy' />
                                    </CopyToClipboard>
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Token ID{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {asset.tokenId}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Token Standard{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {"ERC-721"}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Blockchain {"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {"Ethereum"}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h5" className="mt-4 mb-4 new-item-preview-price">
                                <span className='fa fa-certificate' /> Ownsership 
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Creator{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {assetCreator}
                                    <CopyToClipboard text={asset.creator}>
                                        <span className='fa fa-copy' />
                                    </CopyToClipboard>
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Creator Royality{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {asset.royality+'%'}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Owner{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {assetOwner}
                                    <CopyToClipboard text={asset.owner}>
                                        <span className='fa fa-copy' />
                                    </CopyToClipboard>
                                </span>
                            </CardSubtitle>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
    }
        
    }
}

export default NftAssetDetails