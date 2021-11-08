import React, { Component } from "react";
import { Accordion, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./auctionlist.css";
import { renderPhysicalAssetCategories } from "../FrequentComponents/Asset";
import './auctionlist.css'
import moment from "moment";

class SingleAuctionComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      type: 1 /* 0 = live , 1 = upcoming , 2 = past */,
    };
  }

  componentDidMount() {
    this.setState({ type: this.props.type });
  }

  render = () => {
    return (
      <Accordion.Item
        eventKey={this.props.eventKey}
        style={{
          color: "white",
          marginBottom: "25px",
        }}
      >
        <Accordion.Header>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="responsive-flex"
            >
              <div
                className="responsive-names"
                style={{ display: "flex", width: "70%" }}
              >
                <div className="responsive-margin">
                  {this.state.type === 0 ? (
                    <span className='auction_time_text'
                      style={{
                        background: "yellow",
                        color: "red",
                      }}
                    >
                      Live
                    </span>
                  ) : this.state.type === 1 ? (
                    <span className='auction_time_text'
                      style={{
                        background: "green",
                        color: "white",
                      }}
                    >
                      Upcoming
                    </span>
                  ) : (
                    <span className='auction_time_text'
                      style={{
                        background: "grey",
                        color: "white",
                      }}
                    >
                      Past
                    </span>
                  )}
                </div>
                <div className="responsive-margin">{moment(this.props.time).format('MMMM Do YYYY, h:mm A')}</div>
              </div>
              <div className="responsive-buttons">
                { this.props.type===0?
                <Button
                  variant="primary"
                  style={{ marginRight: "10px" }}
                >
                  
                  <Link style={{color: 'white', textDecoration: 'none'}} to={`/view/auctions/${this.props.auctionName}`}>
                    Enter Auction
                  </Link>
                </Button>
                :<></>
              }
                <Button
                  variant="danger"
                  style={{ marginRight: "15px" }}
                >
                  View Details
                </Button>
              </div>
            </div>
            {/* <div style={{ marginTop: "1px" }} className="responsive-margin hi">
              {this.props.organizerName}
            </div> */}
          </div>
        </Accordion.Header>
        <Accordion.Body style={{ backgroundColor: "#bab8de", color: "black" }}>
          <div>
            <div
              style={{
                border: "2px solid blue",
                borderRadius: "20px",
                backgroundColor: "#0B1126",
                padding: "9px",
                marginBottom: "15px",
                paddingTop: "18px",
              }}
            >
              {renderPhysicalAssetCategories(this.props.tags)}
            </div>
            
            <div style={{ marginTop: "5px" }}>
              <h6 style={{ marginBottom: "0px", fontWeight: "bold" }}>
                Start Time:{" "}
              </h6>
              {moment(this.props.time).format('MMMM Do YYYY, h:mm A')}
              
              <br/>
              <h6 style={{ marginBottom: "0px", fontWeight: "bold" }}>
                Pickup Point Address:{" "}
              </h6>
              {this.props.addressLine1}{this.props.addressLine2?<> , {this.props.addressLine2}</>:<></>}
              <br />
              <h6
                style={{
                  marginBottom: "0px",
                  marginTop: "3px",
                  fontWeight: "bold",
                }}
              >
                Location :{" "}
              </h6>
              {this.props.city}, {this.props.state}, {this.props.country} <br />
              <h6
                style={{
                  marginBottom: "0px",
                  marginTop: "3px",
                  fontWeight: "bold",
                }}
              >
                Postal Code :{" "}
              </h6>
              {this.props.postalCode}
              <br />
              <h6 style={{ display: "inline", fontWeight: "bold" }}>
                Contact No.
              </h6>
              {" " + this.props.organizer_contact}
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    );
  };
}

export default SingleAuctionComponent;