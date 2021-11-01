import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import { Image } from 'react-bootstrap';
import { renderAssetCategoriesFromIds } from '../FrequentComponents/Asset';
import '../View/View.css';
import './MyDigitalAssets.css';
import Web3 from 'web3';
import AuctionContract from '../../abis_2/Auctions.json';

export class RenderNftAssetCard extends Component{
    constructor(props){
        super(props);

        this.state={
            account_address: '',
            auction_contract:'',
            modal_open: false,
        }
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

    

    
    

    render(){
        const asset = this.props.asset
        return(
            <div className='col-10 col-sm-6 col-md-5 col-lg-3'>
                <Card id="digital-asset-card">
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
                            {asset.description}
                        </CardText>
                        <div>
                            {
                                renderAssetCategoriesFromIds(asset.categories)
                            }
                        </div>
                        <CardSubtitle tag="h6" className="new-item-preview-price">
                            Creator Royality{"  "}
                            <span style={{ marginLeft: 10, color: "cyan" }}>
                                {asset.royality+'%'}
                            </span>
                        </CardSubtitle>
                        <div style={{display: 'flex', justifyContent: 'center'}} className='mt-4'>
                            <Button 
                                id='single-asset-purchase-button' 
                                style={{marginRight: 10}}
                            >
                                <Link style={{color: 'white', textDecoration: 'none'}} to={`/digital-assets/${asset.tokenId}`}>
                                    View Details
                                </Link>
                            </Button>
                            <Button 
                                id='single-asset-purchase-button' 
                                className='ml-4'
                                data = {asset}
                                onClick={() => this.props.onSellClick(asset)}
                            >
                                    Sell Asset
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}