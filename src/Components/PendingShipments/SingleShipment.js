import React, { Component } from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

class SingleShipment extends Component {
  
  render = () => {
    const order = this.props.order;
    console.log(order)
    return (
      <Card className='col-10 col-sm-6 col-md-5 col-lg-3' id='winning-card'>
        <div>
            <h6 className='winning-card-label rainbow-lr'>Asset</h6>
            <Link className='winning-card-link' 
                to={`/view/independent-physical-assets/${order.item_id}`}>
                <h6 className='winning-card-detail'>@{order.item_id}</h6>
            </Link>
        </div>
        <div>
            <h6 className='winning-card-label rainbow-lr'>Recepient</h6>
            <Link className='winning-card-link' 
                to={`/profile/${order.buyer_details.profile}`}>
                <h6 className='mt-2 winning-card-detail'>@Profile</h6>
            </Link>
        </div>
        <div>
            <div className='mt-2 winning-card-detail '>
                <h6>
                    <span className='fa fa-address-card' style={{marginRight: 10}} />
                    {
                      order.buyer_details.address.addressLine1+', '+order.buyer_details.address.city+', '+
                      order.buyer_details.address.state+', '+order.buyer_details.address.country
                    }
                </h6>
            </div>                     
        </div>
        <div>
            <div className='mt-2 winning-card-detail '>
                <h6>
                    <span className='fa fa-phone-square' style={{marginRight: 10}} />
                    {order.buyer_details.contact_number}
                </h6>
            </div>                     
        </div>
        <div>
            <div className='mt-2 winning-card-detail '>
                <h6>
                    <span className='fa fa-history' style={{marginRight: 10}} />
                    {moment(order.createdAt).format('MMMM Do YYYY, h:mm A')}
                </h6>
            </div>                     
        </div>
      </Card>
    );
  };
}
export default SingleShipment;