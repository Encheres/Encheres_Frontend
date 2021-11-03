import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../loading';
import { connect } from 'react-redux';
import { FetchPhysicalAssets, FetchFilteredPhysicalAssets, 
    UpdatePhysicalAsset } from '../../apis_redux/actions/physicalAsset';
import { fetchItem } from '../../apis_redux/actions/item';
import RenderPhysicalAssets from './PhysicalAssetListing';
import { categoryList, customSelectStyles } from '../../variables';
import Select from 'react-select'
import InfiniteScroll from "react-infinite-scroll-component";
import RenderError from '../FrequentComponents/RenderError';
import { Button } from "reactstrap";
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import swal from 'sweetalert';
import AuctionContract from '../../abis/Auctions.json';
import NftAssetContract from '../../abis/NftAsset.json';
import '../View/View.css'


class ViewDigitalAsset extends Component {

    constructor(props){
        super(props);

        this.state={
            page: 0,
            bids: true,
            assets: [],
            filter: false,
            dropDownOpen: false,
            account_address:'',
            account_integrated: false,
            auction_contract:'',
            nftasset_contract:'',
            auctions_list:'',
            category: [],
            createdAssetsLoading: true,
            fetched_count:0,
            digitalAssets:[]
        }

        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
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
        const networkDataNft = NftAssetContract.networks[networkId]


        if(networkDataAuction && networkDataNft){
            const auction_contract = new web3.eth.Contract(AuctionContract.abi, networkDataAuction.address)
            const nftasset_contract = new web3.eth.Contract(NftAssetContract.abi, networkDataNft.address)
            this.setState({auction_contract, nftasset_contract })
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
            await this.props.FetchPhysicalAssets(0)
            this.setState({createdAssetsLoading: true});
            await this.loadWeb3();
            await this.integrateMetamaskAccount();
            await this.loadSmartContracts();
            await this.getAuctionsList();
            this.setState({createdAssetsLoading: false})

            // await this.props.FetchPhysicalAssets(0)

            if(this.props.physicalAsset.assets.length){
                this.setState({
                    assets: this.props.physicalAsset.assets
                })
            }
        }catch(err){
            console.log(err)
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

    fetchDigitalAsset = async (id) => {
        const { nftasset_contract, digitalAssets } = this.state;
        if(nftasset_contract){
            const asset = await nftasset_contract.methods.getAssetDetails(id).call();
            const assetData = {
                nft_id: asset[0],
                name: asset[1],
                description: asset[2],
                asserFileHash: asset[3],
                royality: asset[4],
                category: asset[5],
            }
            digitalAssets.push(assetData);
            this.setState({
                digitalAssets, 
                fetched_count: this.state.fetched_count + 1 
            })
            // this.props.fetchItem(asset.item_id)
        } 
    }

    fetchAssets = async () => {
        const {auctions_list, fetched_count} = this.state;
        if(fetched_count>=auctions_list.length){
            return;
        }else{
            const id = auctions_list[fetched_count];
            await this.fetchDigitalAsset(id);
        }

    }

    async fetchMoreAssets(){
        this.setState({
            page: this.state.page+1
        })

        if(this.state.filter){
            await this.props.FetchFilteredPhysicalAssets(this.state.page, this.state.category)
        }
        else{
            await this.props.FetchPhysicalAssets(this.state.page);
        }

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

    handleMultiSelectChange = async category => {

        this.setState({
            page: 0
        })

        if(category.length === 0){
            this.setState({
                assets: [],
                filter: false,
                page: 0,
                isFilterOpen: false
            })
    
            await this.props.FetchPhysicalAssets(0)
    
            if(this.props.physicalAsset.assets.length){
                this.setState({
                    assets: this.props.physicalAsset.assets
                })
            }
        }

        this.setState({ category:category })
        console.log(category)
    }

    onFilterSubmit = async () => {

        this.setState({
            assets: [],
            page:0,
            filter: true
        })

        await this.props.FetchFilteredPhysicalAssets(0, this.state.category)

        if(this.props.physicalAsset.assets.length){
            this.setState({
                assets: this.props.physicalAsset.assets
            })
        }
    }


    render(){

        if(this.props.physicalAsset.isLoading && !this.state.assets.length){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if(this.props.physicalAsset.errMess){
            return(
                <RenderError error={this.props.physicalAsset.errMess} />
            );
        }
        else {
            
            var cardContainerStyle = this.state.dropDownOpen ? "asset-card-container" : "";
            return(
                <div className='container-fluid asset-container'>
                    <div className='row justify-content-center mt-4 mb-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            VIEW INDEPENDENT ASSETS
                        </h3>
                        <div className='col-12 new-item-card-button-div mt-4'>
                            <Button 
                                disabled
                                className='mt-2 new-item-card-button'>
                                DIGITAL
                            </Button>
                            <Button
                                className='mt-2 new-item-card-button' onClick={() => this.onFilterSubmit()}>
                                FILTER
                            </Button>
                            <Button 
                                className='mt-2 new-item-card-button' >
                                <Link style={{color: 'white', textDecoration: 'none'}} 
                                    to='/view/independent-physical-assets'>
                                    PHYSICAL
                                </Link>
                            </Button>
                        </div>
                        <div className='mt-4 mb-3 col-10 col-sm-8 col-md-7 col-lg-4 asset-filter'>
                            <Select isMulti name="category" 
                                onMenuOpen={() => this.setState({
                                    dropDownOpen: true
                                })}
                                onMenuClose={() => this.setState({
                                    dropDownOpen: false
                                })}
                                styles={customSelectStyles}
                                options={categoryList} className="basic-multi-select" 
                                value={this.state.category} 
                                onChange={this.handleMultiSelectChange} 
                                classNamePrefix="select"
                            />
                        </div>
                    </div>
                    <div 
                        className={'row justify-content-center '+cardContainerStyle}>
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
                                    <h3 className='col-12 rainbow-lr new-item-heading'>
                                        No More Assets Currently On Sale :(
                                        <br/>
                                        <br/>
                                        Check Back Soon!!
                                    </h3>
                                }
                                >
                                {this.state.assets.map((asset) => < RenderPhysicalAssets 
                                    asset={asset}  
                                    placeBid = {this.props.UpdatePhysicalAsset}
                                    auth = {this.props.auth}
                                    assetStatus = {this.props.physicalAsset}
                                />)}
                            </InfiniteScroll>
                            :
                            <h3 className='col-12 rainbow-lr new-item-heading'>
                                No Assets Currently On Sale :(
                                <br/>
                                <br/>
                                Check Back Soon!!
                            </h3>
                        }
                    </div>
                </div>
            );
        }
        
    }
}

const  mapStateToProps = (state) => {
    return{
        auth: state.auth,
        physicalAsset: state.physicalAsset,
        item: state.item
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        FetchPhysicalAssets : (page) => dispatch(FetchPhysicalAssets(page)),
        FetchFilteredPhysicalAssets: (page, categories) => dispatch(FetchFilteredPhysicalAssets(page, categories)),
        UpdatePhysicalAsset: (assetId, updateAsset) => dispatch(UpdatePhysicalAsset(assetId, updateAsset)),
        fetchItem: (itemId) => dispatch(fetchItem(itemId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDigitalAsset);