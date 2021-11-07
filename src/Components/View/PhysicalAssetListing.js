import React from 'react';
import { Link } from "react-router-dom";
import {Card, CardBody, UncontrolledCarousel, CardSubtitle, Button} from 'reactstrap';
import { renderPhysicalAssetCategories } from '../FrequentComponents/Asset';
import { CountdownTimer } from '../FrequentComponents/CountdownTimer';
import {ipfs_base_url} from '../../apis_redux/apis/encheres';
import './View.css'

class RenderPhysicalAssets extends React.Component{

    constructor(props){
        super(props);

        this.state={
            
        }

    }

    render(){

        var asset = this.props.asset

        var assetShowcaseCarousel = [];
        var showcaseElement;
        for(var i=0;i<asset.asset.images.length;i++){
            showcaseElement = {
                src: ipfs_base_url+asset.asset.images[i],
                altText: "Slide "+i.toString(),
                key: i.toString()
            }

            assetShowcaseCarousel.push(showcaseElement);
        }

        return(
            <div className='col-10 col-sm-6 col-md-5 col-lg-3'>
                <Card id="asset-card-detail">
                     <CountdownTimer end_date_time={asset.event_end_date_time} />
                        <CardBody>
                            <div style={{height: '100%'}}>
                                <UncontrolledCarousel style={{height: '100%'}} items={assetShowcaseCarousel} /> :
                            </div>
                            <CardSubtitle
                                tag="h5"
                                className="mt-3 mb-3 new-item-card-subtitle"
                                id="new-item-card-username"
                            >
                                {asset.asset.name}
                            </CardSubtitle>
                            <div>
                                {
                                    renderPhysicalAssetCategories(asset.categories)
                                }
                            </div>
                            <div>
                                    <Button 
                                        id='single-asset-purchase-button' 
                                    >
                                        <Link style={{color: 'white', textDecoration: 'none'}} 
                                            to={`/view/independent-physical-assets/${asset._id}`}>
                                            View Details
                                        </Link>
                                    </Button>
                            </div>
                        </CardBody>
                    </Card>
            </div>
        )
    }
} 

export default RenderPhysicalAssets;