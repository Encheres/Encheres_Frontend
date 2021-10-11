import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { categoryList, customSelectStyles } from '../../variables';
import Select from 'react-select'
import {renderPhysicalAssetCategories} from '../FrequentComponents/Asset'
import {Card, CardText, CardBody, Collapse, UncontrolledCarousel,
    CardSubtitle, Button, ListGroup, ListGroupItem} from "reactstrap";
import '../View/View.css'

var categories = ["Art", "Collectibles"];

var assetShowcaseCarousel = [
    {
        src: "https://ipfs.infura.io/ipfs/QmTD5WhB9hFi8sxMyZVRuEFbdRmi3uq3dt1BSxXqcV112f",
        altText: "Slide 1",
        key: "1"
    },
    {
        src: "https://ipfs.infura.io/ipfs/QmP9AKueSGHTDz3h8JaG62RsikHRaRBjvQNf43N7dYcQr5",
        altText: "Slide 2",
        key: "2"
    },
    ,
    {
        src: "https://ipfs.infura.io/ipfs/QmNMAB8Lfi13Jva6PQvF7CLo8qH6erUYrT3Z86paEBfoP6",
        altText: "Slide 3",
        key: "3"
    }
]

class ViewPhysicalAsset extends Component {

    constructor(props){
        super(props);

        this.state={
            categoryFilter: '',
            isFilterOpen: false,
            category: []
        }

        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
    }

    toggleFilter(){
        this.setState({
            isFilterOpen: !this.state.isFilterOpen
        })
    }

    handleMultiSelectChange = category => {
        this.setState({ category:category })
        console.log(category)
    }

    renderAssets(){
            return(
                <div className='col-10 col-sm-6 col-md-5 col-lg-3'>
                    <Card id="new-item-card">
                            <CardBody>
                                <UncontrolledCarousel items={assetShowcaseCarousel} /> :
                                <CardSubtitle
                                tag="h5"
                                className="mt-3 mb-3 new-item-card-subtitle"
                                id="new-item-card-username"
                                >
                                    {this.state.name === "" ? 'Deslajd ed d' : this.state.name}
                                </CardSubtitle>
                                <CardText id="new-item-card-info" className="mb-4">
                                    {   
                                        this.state.description === "" ? 
                                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' :
                                        this.state.description
                                    }
                                </CardText>
                                    <div>
                                        {
                                            renderPhysicalAssetCategories(categories)
                                        }
                                    </div>
                                <div>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Showcase Video{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {(!this.state.assetVideoHash) ? 
                                            "Not Available" : 
                                            <a style={{textDecoration: 'none', color: 'cyan'}} href={'https://ipfs.infura.io/ipfs/'+this.state.assetVideoHash}>Link</a>}
                                    </span>
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Price{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {(!this.state.price || this.state.price === 0.0000) ? '0.0000 ETH' : this.state.price+' ETH'}
                                    </span>
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Quantity{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {(!this.state.quantity || this.state.quantity === 1) ? '1' : this.state.quantity}
                                    </span>
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Pickup Point
                                    <p style={{ marginTop: 10, color: "cyan" }}>
                                        Adress-123, dummy
                                    </p>
                                    {/* <p style={{ marginTop: 10, color: "cyan" }}>
                                        {!this.state.address.addressLine1 ? 'Adress-123, dummy' : 
                                            this.state.address.addressLine1+', '+this.state.address.city+', '+
                                            this.state.address.addressState+', '+this.state.address.country}
                                    </p> */}
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

        var cardContainerStyle = this.state.isFilterOpen ? "asset-card-container" : "";
        return(
            <div className='container-fluid asset-container'>
                <div className='row justify-content-center mt-4 mb-4'>
                    <h3 className='col-12 rainbow-lr new-item-heading'>
                        VIEW INDEPENDENT ASSETS
                    </h3>
                    <div className='col-12 new-item-card-button-div mt-4'>
                        <Button 
                            className='mt-2 new-item-card-button'>
                            <Link style={{color: 'white', textDecoration: 'none'}} to='/view/independent-digital-assets'>
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
                    <div className='mt-4 mb-4 col-10 col-sm-8 col-md-7 col-lg-4 asset-filter'>
                        {
                            this.state.isFilterOpen ?
                            <Select isMulti name="category" 
                                styles={customSelectStyles}
                                options={categoryList} className="basic-multi-select" 
                                value={this.state.category} 
                                onChange={this.handleMultiSelectChange} 
                                classNamePrefix="select"/> :
                            <div/>
                        }
                    </div>
                </div>
                <div 
                    className={'row justify-content-center '+cardContainerStyle}
                    >
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