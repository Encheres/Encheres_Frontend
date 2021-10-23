import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
class SingleShipment extends Component {
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
                width: "100%",padding:'5px',borderRadius : '15px',objectFit:'contain',
              }}
            />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody style={{display:'flex',height:'100%'}}>
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
