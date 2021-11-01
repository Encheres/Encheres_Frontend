import React, {Component} from 'react';
import {Card, CardBody, CardSubtitle, CardText } from 'reactstrap';
import { Image } from 'react-bootstrap';
import Loading from '../loading';
import RenderError from '../FrequentComponents/RenderError';
import swal from 'sweetalert';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { renderAssetCategoriesFromIds } from '../FrequentComponents/Asset';
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import NftAsset from '../../abis/NftAsset.json';

class NftAssetDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            nftAssetLoading: true,
            nftAsset: null,
            nftasset_contract: null
        }
    }

    async componentDidMount(){
        
        this.setState({nftAssetLoading: true});
        await this.loadWeb3();
        await this.integrateMetamaskAccount();
        await this.loadSmartContracts();
        await this.loadNftAsset(this.props.nftAssetId);
        this.setState({nftAssetLoading: false})

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
                    <div className='col-12 col-md-7 col-lg-6'>
                        <Card id="new-item-card">
                            <Image className="new-item-image" rounded
                                src={"https://ipfs.infura.io/ipfs/"+asset.assetFileHash}
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
                <div className='col-12 col-md-5 col-6'>
                    <Card id="digital-asset-card-detail">
                        <CardBody>
                            <CardSubtitle tag="h5" className="mb-4 new-item-preview-price">
                                Properties <span className='fa fa-tags' />
                            </CardSubtitle>
                            <div>
                                {
                                    renderAssetCategoriesFromIds(asset.categories)
                                }
                            </div>
                            <CardSubtitle tag="h5" className="mb-4 new-item-preview-price">
                                Details <span className='fa fa-bars' />
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
                                Ownsership <span className='fa fa-certificate' />
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