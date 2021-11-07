import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FetchPhysicalAssetWinnings } from '../../apis_redux/actions/winning';
import { PostOrder, RemoveOrder } from '../../apis_redux/actions/order';
import { UpdateSaleForItem } from '../../apis_redux/actions/item';
import { UpdateShippedStatusForItem } from '../../apis_redux/actions/item';
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../loading';
import RenderError from '../FrequentComponents/RenderError';
import RenderWinning from './RenderWinning';
import './winnings.css'

class Winnings extends Component{

    constructor(props){
        super(props);

        this.state={
            page: 0,
            winnings: [],
        }

    }
   

    async componentDidMount(){

        await this.props.FetchPhysicalAssetWinnings(0)

        if(this.props.winnings.winnings.length){
            this.setState({
                winnings: this.props.winnings.winnings
            })
        }
    }

    async fetchMoreAssets(){
        this.setState({
            page: this.state.page+1
        })

        await this.props.FetchPhysicalAssetWinnings(this.state.page);

        if(this.props.winnings.winnings.length){
            var tempWinnings = this.state.winnings;
            for(var i=0;i<this.props.winnings.winnings.length;i++){
                tempWinnings.push(this.props.winnings.winnings[i]);
            }
    
            this.setState({
                winnings: tempWinnings
            })
        }
    }


    render(){
        if(this.props.winnings.isLoading && !this.state.winnings.length){
            return(
                <Loading type='spokes' color='white' />
            );
        }
        else if(this.props.winnings.errMess){
            return(
                <RenderError error={this.props.winnings.errMess} />
            );
        }
        else{
            return(
                <div>
                    <div className='row justify-content-center mt-4'>
                        <h3 className='col-12 rainbow-lr new-item-heading'>
                            MY WINNINGS
                        </h3>
                    </div>
                        {
                            this.state.winnings.length 
                            ?
                            <InfiniteScroll
                                className={'row justify-content-center'}
                                dataLength={this.state.winnings.length}
                                next={() => this.fetchMoreAssets()}
                                hasMore={this.props.winnings.winnings.length ? true : false}
                                loader={<h4 style={{color: 'white'}}>Loading...</h4>}
                                endMessage={
                                    <div>
                                        <h4 className='col-12 rainbow-lr winnings-end-note'>
                                            No More Winnings :( 
                                            <br/>
                                            Participate in More Auctions :)
                                        </h4>
                                    </div>
                                }
                                >
                                {this.state.winnings.map((asset) => <RenderWinning 
                                    asset={asset}
                                    PostOrder={this.props.PostOrder}
                                    UpdateSaleForItem={this.props.UpdateSaleForItem}
                                    UpdateShippedStatusForItem={this.props.UpdateShippedStatusForItem}
                                    RemoveOrder={this.props.RemoveOrder}
                                    postFail={this.props.orders.postFail}
                                    errMess={this.props.items.errMess}
                                 />)}
                            </InfiniteScroll>
                            :
                            <div>
                                <h4 className='col-12 rainbow-lr winnings-end-note'>
                                    No More Winnings :(
                                    <br/>
                                    Participate in More Auctions :)
                                </h4>
                            </div>
                        }
                </div>
            );
        }
    }
}

const  mapStateToProps = (state) => {
    return{
        winnings: state.winnings,
        orders: state.orders,
        items: state.items
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        FetchPhysicalAssetWinnings : (page) => dispatch(FetchPhysicalAssetWinnings(page)),
        PostOrder: (order) => dispatch(PostOrder(order)),
        RemoveOrder: (itemId) => dispatch(RemoveOrder(itemId)),
        UpdateSaleForItem: (itemId, sale) => dispatch(UpdateSaleForItem(itemId, sale)),
        UpdateShippedStatusForItem: (itemId, shipped) => dispatch(UpdateShippedStatusForItem(itemId, shipped))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Winnings);