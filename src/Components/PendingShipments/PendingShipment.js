import React, { Component } from "react";
import SingleShipment from "./SingleShipment";
import RenderError from '../FrequentComponents/RenderError';
import { connect } from "react-redux";
import getting_pending_orders_seller from "../../apis_redux/actions/pending_order_seller";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchOrders } from '../../apis_redux/actions/order';
import Loading from "../loading";
class PendingShipment extends Component {

  constructor(props){
    super(props);
    this.state={
      orders: [],
      page: 0
    }
  }

  componentDidMount = async () => {

    await this.props.FetchOrders(0);

    if(this.props.orders.orders.length){
      this.setState({
          orders: this.props.orders.orders
      })
  }
  }

  async fetchMoreOrders(){
    this.setState({
        page: this.state.page+1
    })

    await this.props.FetchOrders(this.state.page);

    if(this.props.orders.orders.length){
        var temporders = this.state.orders;
        for(var i=0;i<this.props.orders.orders.length;i++){
            temporders.push(this.props.orders.orders[i]);
        }

        this.setState({
            orders: temporders
        })
    }
}
  
  render = () => {
    if(this.props.orders.isLoading && !this.state.orders.length){
      return(
        <Loading type='spokes' color='white' />
      )
    }
    else if(this.props.orders.errMess){
      return(
        <RenderError error={this.props.orders.errMess} />
      )
    }
    else{
      return (
        <div>
            <div className='row justify-content-center mt-4'>
                <h3 className='col-12 rainbow-lr new-item-heading'>
                    PENDING SHIPMENTS
                </h3>
            </div>
            <div className='row justify-content-center' style={{marginBottom: 100}}>
            {
                  this.state.orders.length 
                  ?
                  <InfiniteScroll
                    className={'row justify-content-center'}
                    dataLength={this.state.orders.length}
                    next={() => this.fetchMoreOrders()}
                    hasMore={this.props.orders.orders.length ? true : false}
                    loader={<h4 style={{color: 'white', textAlign: 'center', marginTop: 50}}>Loading More...</h4>}
                    endMessage={
                      <div>
                          <h4 className='col-12 rainbow-lr winnings-end-note'>
                              No More Shipments.
                          </h4>
                      </div>
                    }
                    >
                    {this.state.orders.map((order) => <SingleShipment order={order} />)}
                  </InfiniteScroll>
                  :
                  <div>
                      <h4 className='col-12 rainbow-lr winnings-end-note'>
                          No More Shipments.
                      </h4>
                  </div>
              }
            </div>
              
        </div>
        
      );
    }
  };
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    get_pending_order_seller: ()=>dispatch(getting_pending_orders_seller()),
    FetchOrders: (page) => dispatch(FetchOrders(page))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PendingShipment);