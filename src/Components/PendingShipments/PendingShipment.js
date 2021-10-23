import React, { Component } from "react";
import SingleShipment from "./SingleShipment";
import { connect } from "react-redux";
import getting_pending_orders_seller from "../../apis_redux/actions/pending_order_seller";
import Loading from "../loading";
class PendingShipment extends Component {
  componentDidMount = () => {
    this.get_from_db();
  }
  componentDidUpdate = () => {
    console.log(this.props)
  }
  get_from_db = () => {
    this.props.get_pending_order_seller();
    console.log(this.props)
  }
  ui = () => {
    return (
      <section className="section-padding-100" style={{}}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <h3>Pending Orders : {this.props.payload? this.props.payload.length : 0 } </h3>{" "}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SingleShipment/>
          {!this.props.payload ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  height: "25vh",
                }}
              >
                <span style={{ fontSize: "xx-large" }}> No value loaded </span>
              </div>
            ) : (
              this.props.auctionlist.payload.data.map((element, index) => {
                return (
                  <SingleShipment/>
                );
              })
            )}
        </div>
      </section>
    );
  };
  render = () => {
    return this.props.loading ? <Loading color='white' /> : <>{this.ui()}</>;
  };
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    loading: state.pendingOrderSeller.loading,
    payload: state.pendingOrderSeller.payload,
    error: state.pendingOrderSeller.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    get_pending_order_seller: ()=>dispatch(getting_pending_orders_seller())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PendingShipment);
