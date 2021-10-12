import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../loading';
import { connect } from 'react-redux';
import { FetchPhysicalAssets } from '../../apis_redux/actions/physicalAsset';
import { categoryList, customSelectStyles } from '../../variables';
import Select from 'react-select'
import InfiniteScroll from "react-infinite-scroll-component";
import {renderPhysicalAssetCategories} from '../FrequentComponents/Asset'
import {Card, CardText, CardBody, Collapse, UncontrolledCarousel,
    CardSubtitle, Button, ListGroup, ListGroupItem} from "reactstrap";
import '../View/View.css'


class ViewPhysicalAsset extends Component {

    constructor(props){
        super(props);

        this.state={
            page: 0,
            assets: [],
            categoryFilter: '',
            isFilterOpen: false,
            category: []
        }

        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
    }

    async componentDidMount(){
        await this.props.FetchPhysicalAssets(this.state.page)

        if(this.props.physicalAsset.assets.length){
            this.setState({
                assets: this.props.physicalAsset.assets
            })
        }
    }

    async fetchMoreAssets(){
        this.setState({
            page: this.state.page+1
        })

        await this.props.FetchPhysicalAssets(this.state.page);

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

    toggleFilter(){
        this.setState({
            isFilterOpen: !this.state.isFilterOpen
        })
    }

    handleMultiSelectChange = category => {
        this.setState({ category:category })
        console.log(category)
    }

    renderAssets(asset){

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

    render(){

        if(this.props.physicalAsset.isLoading && !this.state.assets.length){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if(this.props.physicalAsset.errMess){
            return(
                <div>
                    <h1>{this.props.physicalAsset.errMess}</h1>
                </div>
            );
        }
        else {
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
                                {this.state.assets.map((asset) => this.renderAssets(asset))}
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
        physicalAsset: state.physicalAsset
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        FetchPhysicalAssets : (page) => dispatch(FetchPhysicalAssets(page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhysicalAsset);