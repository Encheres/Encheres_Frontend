import React, { Component } from "react";
import { FaPalette, FaMusic, FaFootballBall, FaWallet } from "react-icons/fa";
import { GrDomain } from "react-icons/gr";
import { GiCardRandom, GiBearFace } from "react-icons/gi";
import { Badge } from "react-bootstrap";
import { BiWorld } from "react-icons/bi";
import { Accordion, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auctionlist.css";
class SingleAuctionComponent extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {}

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
                  {this.props.auctionName}
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
                <Button
                  variant="outline-danger"
                  style={{ marginRight: "15px" }}
                >
                  Edit
                </Button>
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
              {this.props.tags === "Art" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <FaPalette />
                  </span>
                  Art
                </Badge>
              ) : (
                <></>
              )}
              {this.props.tags === "Music" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <FaMusic />
                  </span>
                  Music
                </Badge>
              ) : (
                ""
              )}
              {this.props.tags === "Domain Names" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <GrDomain />
                  </span>{" "}
                  Domain Names
                </Badge>
              ) : (
                ""
              )}
              {this.props.tags === "Virtual Worlds" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <BiWorld />
                  </span>
                  Virtual Worlds
                </Badge>
              ) : (
                ""
              )}
              {this.props.tags === "Trading Cards" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <GiCardRandom />
                  </span>
                  Trading Cards
                </Badge>
              ) : (
                ""
              )}
              {this.props.tags === "Collectibles" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <GiBearFace />
                  </span>
                  Collectibles
                </Badge>
              ) : (
                ""
              )}
              {this.props.tags === "Sports" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <FaFootballBall />
                  </span>
                  Sports
                </Badge>
              ) : (
                ""
              )}
              {this.props.tags === "Documents" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span className="fa fa-file" /> Documents
                </Badge>
              ) : (
                ""
              )}
              {this.props.tags === "Utility" ? (
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <FaWallet />
                  </span>
                  Utility
                </Badge>
              ) : (
                ""
              )}
            </div>

            <div>
              <h6 style={{ marginBottom: "0px" }}>Description : </h6>
              {this.props.description}
            </div>
            <div style={{ marginTop: "5px" }}>
              <h6 style={{ marginBottom: "0px" }}>Address : </h6>
              {this.props.addressLine1}
              <br />
              <h6 style={{ marginBottom: "0px", marginTop: "3px" }}>
                Location :{" "}
              </h6>
              {this.props.city} <br />
              {this.props.postalCode},{this.props.state}
              <br />
              <h6 style={{ display: "inline" }}>Contact No.</h6>
              {" " + this.props.organizer_contact}
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    );
  };
}

export default SingleAuctionComponent;
