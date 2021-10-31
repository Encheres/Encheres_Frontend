import React, {Component} from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import { Image } from 'react-bootstrap';
import { renderAssetCategoriesFromIds } from '../FrequentComponents/Asset';
import '../View/View.css'

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
                <Card id="asset-card-detail">
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
                                    View Details
                            </Button>
                            <Button 
                                id='single-asset-purchase-button' 
                                className='ml-4'
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