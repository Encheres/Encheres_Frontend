import React, { Component } from "react";
import { Accordion, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auctionlist.css";
import { renderPhysicalAssetCategories } from "../FrequentComponents/Asset";

class SingleAuctionComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      type: 1 /* 0 = live , 1 = upcomming , 2 = past */,
    };
  }

  componentDidMount() {
    this.setState({ type: this.props.type });
  }

  isUserCreator = async (Organizer) => {
    const userid = await this.props.auth;
    if (userid.userId === Organizer) {
      return (
        <Button variant="outline-danger" style={{ marginRight: "15px" }}>
          Edit
        </Button>
      );
    } else {
      return <></>;
    }

    //  return this.props.auth.userId === Organizer; //equate to orgamixer id.
  };
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
                    <span
                      style={{
                        padding: "7px",
                        background: "yellow",
                        color: "red",
                        height: "35px",
                      }}
                    >
                      Live
                    </span>
                  ) : this.state.type === 1 ? (
                    <span
                      style={{
                        padding: "7px",
                        background: "green",
                        color: "white",
                      }}
                    >
                      Upcomming
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: "7px",
                        background: "grey",
                        color: "white",
                      }}
                    >
                      Past
                    </span>
                  )}
                </div>
                <div className="responsive-margin">{this.props.time}</div>
              </div>
              <div className="responsive-buttons">
                <Button
                  variant="outline-primary"
                  style={{ marginRight: "10px" }}
                >
                  Enter
                </Button>
                {this.isUserCreator(this.props.organizerId)}
              </div>
            </div>
            <div style={{ marginTop: "1px" }} className="responsive-margin hi">
              {this.props.organizerName}
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
          <div>
            <div
              style={{
                border: "2px solid blue",
                borderRadius: "20px",
                backgroundColor: "#0B1126",
                padding: "9px",
                marginBottom: "15px",
              }}
            >
              {renderPhysicalAssetCategories(this.props.tags)}
            </div>

            <div>
              <h6 style={{ marginBottom: "0px", fontWeight: "bold" }}>
                Description :{" "}
              </h6>
              {this.props.description}
            </div>
            <div style={{ marginTop: "5px" }}>
              <h6 style={{ marginBottom: "0px", fontWeight: "bold" }}>
                Address :{" "}
              </h6>
              {this.props.addressLine1}
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
              {this.props.city} <br />
              {this.props.postalCode},{this.props.state}
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
