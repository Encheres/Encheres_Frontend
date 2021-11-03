import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import { Image } from 'react-bootstrap';
import { renderAssetCategoriesFromIds } from '../FrequentComponents/Asset';
import '../View/View.css';
import './MyDigitalAssets.css';

export class RenderNftAssetCard extends Component{
    constructor(props){
        super(props);

        this.state={
            
        }
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