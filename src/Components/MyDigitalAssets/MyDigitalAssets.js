import React, {Component, useState} from 'react';
import Loading from '../loading';
import { RenderNftAssetCard } from './RenderNftAssetCard';
import { Button } from "reactstrap";
import swal from 'sweetalert';
import '../View/View.css'

import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import NftAsset from '../../abis_1/NftAsset.json';


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
            created: true
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

        if(networkDataNft) {
            const nftasset_contract = new web3.eth.Contract(NftAsset.abi, networkDataNft.address)
            this.setState({ nftasset_contract })
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
                                <RenderNftAssetCard asset={asset} />
                            ) :
                            this.state.ownedAssets.map((asset) => 
                                <RenderNftAssetCard asset={asset} />
                            )
                        }
                    </div>
                </div>
            )
        }   
        
    }
}

export default MyDigitalAssets;