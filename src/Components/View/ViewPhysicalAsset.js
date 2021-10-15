import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../loading';
import { connect } from 'react-redux';
import { FetchPhysicalAssets, FetchFilteredPhysicalAssets, UpdatePhysicalAsset } from '../../apis_redux/actions/physicalAsset';
import RenderPhysicalAssets from './SingleAsset';
import { categoryList, customSelectStyles } from '../../variables';
import Select from 'react-select'
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "reactstrap";
import '../View/View.css'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


class ViewPhysicalAsset extends Component {

    constructor(props){
        super(props);

        this.state={
            page: 0,
            bids: true,
            assets: [],
            filter: false,
            dropDownOpen: false,
            category: []
        }

        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this)
    }

    async componentDidMount(){

        await this.props.FetchPhysicalAssets(0)

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

        if(this.state.filter){
            await this.props.FetchFilteredPhysicalAssets(this.state.page, this.state.category)
        }
        else{
            await this.props.FetchPhysicalAssets(this.state.page);
        }

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

    handleMultiSelectChange = async category => {

        this.setState({
            page: 0
        })

        if(category.length === 0){
            this.setState({
                assets: [],
                filter: false,
                page: 0,
                isFilterOpen: false
            })
    
            await this.props.FetchPhysicalAssets(0)
    
            if(this.props.physicalAsset.assets.length){
                this.setState({
                    assets: this.props.physicalAsset.assets
                })
            }
        }

        this.setState({ category:category })
        console.log(category)
    }

    onFilterSubmit = async () => {

        this.setState({
            assets: [],
            page:0,
            filter: true
        })

        await this.props.FetchFilteredPhysicalAssets(0, this.state.category)

        if(this.props.physicalAsset.assets.length){
            this.setState({
                assets: this.props.physicalAsset.assets
            })
        }
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
            
            var cardContainerStyle = this.state.dropDownOpen ? "asset-card-container" : "";
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
                                className='mt-2 new-item-card-button' onClick={() => this.onFilterSubmit()}>
                                FILTER
                            </Button>
                            <Button 
                                disabled
                                className='mt-2 new-item-card-button'>
                                PHYSICAL
                            </Button>
                        </div>
                        <div className='mt-4 mb-3 col-10 col-sm-8 col-md-7 col-lg-4 asset-filter'>
                            <Select isMulti name="category" 
                                onMenuOpen={() => this.setState({
                                    dropDownOpen: true
                                })}
                                onMenuClose={() => this.setState({
                                    dropDownOpen: false
                                })}
                                styles={customSelectStyles}
                                options={categoryList} className="basic-multi-select" 
                                value={this.state.category} 
                                onChange={this.handleMultiSelectChange} 
                                classNamePrefix="select"
                            />
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
                                {this.state.assets.map((asset) => < RenderPhysicalAssets 
                                    asset={asset}  
                                    placeBid = {this.props.UpdatePhysicalAsset}
                                    auth = {this.props.auth}
                                    assetStatus = {this.props.physicalAsset}
                                />)}
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
        FetchPhysicalAssets : (page) => dispatch(FetchPhysicalAssets(page)),
        FetchFilteredPhysicalAssets: (page, categories) => dispatch(FetchFilteredPhysicalAssets(page, categories)),
        UpdatePhysicalAsset: (assetId, updateAsset) => dispatch(UpdatePhysicalAsset(assetId, updateAsset))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPhysicalAsset);