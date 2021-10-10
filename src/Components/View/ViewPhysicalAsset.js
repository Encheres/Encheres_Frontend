import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {renderAssetCategories} from '../FrequentComponents/Asset'
import {Image} from 'react-bootstrap';
import {Card, CardText, CardBody, Collapse,
    CardSubtitle, Button, ListGroup, ListGroupItem} from "reactstrap";
import preview from "../../assets/images/nft.jpg";
import '../View/View.css'

var categories = ["Art", "Collectibles", "Music"];

class ViewPhysicalAsset extends Component {

    constructor(props){
        super(props);

        this.state={
            nftCategoryFilter: '',
            isFilterOpen: false
        }
    }

    toggleFilter(){
        this.setState({
            isFilterOpen: !this.state.isFilterOpen
        })
    }

    handleChange = (nftCategoryFilter) => {
        this.setState({ nftCategoryFilter });
        console.log(`Option selected:`, nftCategoryFilter);

    };

    renderAssets(){
            return(
                <div className='col-10 col-sm-6 col-md-5 col-lg-3'>
                    <Card id="new-item-card">
                            <Image className="new-item-image" rounded
                                src={preview}
                                onClick={() => alert("Clicked!!")}
                            />
                        <CardBody>
                            <CardSubtitle
                                tag="h5"
                                className="mt-3 mb-3 new-item-card-subtitle"
                                id="new-item-card-username"
                            >
                                {'Deslajd ed d'}
                            </CardSubtitle>
                            <CardText id="new-item-card-info" className="mb-4">
                                {   
                                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
                                }
                            </CardText>
                                <div>
                                    {renderAssetCategories(categories)}
                                </div>
                            <div>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Price{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {'0.0000 ETH'}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Royality{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {'0%'}
                                </span>
                            </CardSubtitle>
                            <CardSubtitle tag="h6" className="new-item-preview-price">
                                Size{"  "}
                                <span style={{ marginLeft: 10, color: "cyan" }}>
                                    {
                                        '0 KB'
                                    }
                                </span>
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

    render(){
        return(
            <div className='container-fluid asset-container'>
                <div className='row justify-content-center mt-4 mb-4'>
                    <h3 className='col-12 rainbow-lr new-item-heading'>
                        VIEW INDEPENDENT ASSETS
                    </h3>
                    <div className='col-12 new-item-card-button-div mt-4'>
                        <Button 
                            className='mt-2 new-item-card-button'>
                            <Link style={{color: 'white', textDecoration: 'none'}} to='/create/independent-digital-assets'>
                                DIGITAL
                            </Link>
                        </Button>
                        <Button
                            className='mt-2 new-item-card-button' onClick={() => this.toggleFilter()}>
                            FILTER
                        </Button>
                        <Button 
                            disabled
                            className='mt-2 new-item-card-button'>
                            PHYSICAL
                        </Button>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='mt-4 col-6 col-sm-6 col-md-4 col-lg-4 col-xl-2 col-xxl-2'>
                        <Collapse isOpen={this.state.isFilterOpen}>
                            <Card>
                                <CardBody style={{padding: 0}}>
                                    <ListGroup>
                                        <ListGroupItem className='asset-filter' tag="button" action>Art</ListGroupItem>
                                        <ListGroupItem className='asset-filter' tag="button" action>Music</ListGroupItem>
                                        <ListGroupItem className='asset-filter' tag="button" action>Domain Names</ListGroupItem>
                                        <ListGroupItem className='asset-filter' tag="button" action>Virtual Worlds</ListGroupItem>
                                        <ListGroupItem className='asset-filter' tag="button" action>Trading Cards</ListGroupItem>
                                        <ListGroupItem className='asset-filter'tag="button" action>Collectibles</ListGroupItem>
                                        <ListGroupItem className='asset-filter' tag="button" action>Sports</ListGroupItem>
                                        <ListGroupItem className='asset-filter'tag="button" action>Documents</ListGroupItem>
                                        <ListGroupItem className='asset-filter'tag="button" action>Utility</ListGroupItem>
                                        <ListGroupItem className='asset-filter'tag="button" action>On Auction</ListGroupItem>
                                        <ListGroupItem className='asset-filter'tag="button" action>Fixed Price</ListGroupItem>
                                    </ListGroup> 
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className>

                    </div>
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                    {this.renderAssets()}
                </div>
            </div>
        );
    }
}

export default ViewPhysicalAsset;