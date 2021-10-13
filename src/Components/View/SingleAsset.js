import {Card, CardBody, UncontrolledCarousel, CardSubtitle, CardText} from 'reactstrap';
import { renderPhysicalAssetCategories } from '../FrequentComponents/Asset';
import { CountdownTimer } from '../FrequentComponents/CountdownTimer';

export const renderPhysicalAssets = (asset) => {

    var assetShowcaseCarousel = [];
    var showcaseElement;
    for(var i=0;i<asset.asset.images.length;i++){
        showcaseElement = {
            src: "https://ipfs.infura.io/ipfs/"+asset.asset.images[i],
            altText: "Slide "+i.toString(),
            key: i.toString()
        }

        assetShowcaseCarousel.push(showcaseElement);
    }

        return(
            <div className='col-10 col-sm-6 col-md-5 col-lg-3'>
                <Card id="new-item-card">
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
                            <CardText id="new-item-card-info" className="mb-4">
                                {   
                                    asset.asset.description
                                }
                            </CardText>
                                <div>
                                    {
                                        renderPhysicalAssetCategories(asset.categories)
                                    }
                                </div>
                            <div>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Showcase Video{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {(!asset.asset.assetVideoHash) ? 
                                        "Not Available" : 
                                        <a style={{textDecoration: 'none', color: 'cyan'}} href={'https://ipfs.infura.io/ipfs/'+asset.assetVideoHash}>Link</a>}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Price{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {asset.asset.aggregate_base_price+' ETH'}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Quantity{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {asset.asset.quantity}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Pickup Point
                                <p style={{ marginTop: 10, color: "cyan" }}>
                                    { 
                                        asset.pickup_point.addressLine1+', '+asset.pickup_point.city+', '+
                                        asset.pickup_point.state+', '+asset.pickup_point.country
                                    }
                                </p>
                            </CardSubtitle>
                            </div>
                            <div className="new-item-accountbox">
                            <CardText id="new-item-card-account">
                                @{"john_bill123"}
                            </CardText>
                            </div>
                        </CardBody>
                        </Card>
            </div>
                
        )
}