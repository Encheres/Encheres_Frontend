import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./pendingshipment.css";
class SingleShipment extends Component {
  /*ui = () => {
    return (
      <div className="pending-shipment">
        <div style={{ width: "30%" }}>
          <img
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-select-2019-family?wid=882&hei=1058&fmt=jpeg&qlt=80&.v=1567022175704"
            alt="image_product"
            className="pending-shipment_img"
          />
        </div>
        <div style={{ width: "70%", paddingLeft: "9px" }}>
          <div>
            <div>
              <h1>Iphone X</h1>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>Seller</div>
              <div style={{ width: "50%" }}>Buyer</div>
            </div>
            <div>
              <p>Address</p>
              <p>Contact No : {"7347504481"}</p>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>Price</div>
              <div style={{ width: "50%" }}>quantity</div>
            </div>
          </div>
        </div>
      </div>
    );
  };*/

  render = () => {
    return (
      <MDBCard
        style={{
          maxWidth: "70%",
          boxShadow: "5px 5px 9px 0px rgb(255, 255, 255)",
          background: "#222242",
          color: "white",
          margin: "50px",
        }}
      >
        <MDBRow className="g-0">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
              alt="Product"
              fluid
              style={{
                width: "100%",
              }}
            />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <div>
                  <h1>Iphone X</h1>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>Seller</div>
                  <div style={{ width: "50%" }}>Buyer</div>
                </div>
                <div>
                  <p>Address</p>
                  <p>Contact No : {"7347504481"}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>Price</div>
                  <div style={{ width: "50%" }}>quantity</div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    );
  };
}
export default SingleShipment;
