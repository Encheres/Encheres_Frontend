import React, { Component } from "react";
import { FaPalette, FaMusic, FaFootballBall, FaWallet } from "react-icons/fa";
import { GrDomain } from "react-icons/gr";
import { GiCardRandom, GiBearFace } from "react-icons/gi";
import { Badge } from "react-bootstrap";
import { BiWorld } from "react-icons/bi";
import { Accordion, Button } from "react-bootstrap";
class SingleAuctionComponent extends Component {
  render = () => {
    return (
      <Accordion.Item
        eventKey="1"
        style={{
          background: "#0B1126",
          color: "white",
          marginBottom: "25px",
          borderRadius: "20px",
        }}
      >
        <Accordion.Header style={{ backgroundColor: "#0B1126" }}>
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
            >
              <div>auctionName</div>
              <div>time</div>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button variant="outline-primary">Enter</Button>
                <Button variant="outline-danger">Edit</Button>
              </div>
            </div>
            <div style={{ marginTop: "1px" }}>Organizer Name</div>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div>
            <div>
              <div>
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <FaPalette />
                  </span>
                  Art
                </Badge>
                <Badge className="new-item-badge" pill text="dark" bg="light">
                  <span>
                    <FaMusic />
                  </span>
                  Music
                </Badge>
                <Badge className="new-item-badge" pill text="dark">
                  <span>
                    <GrDomain />
                  </span>{" "}
                  Domain Names
                </Badge>
                <Badge className="new-item-badge" pill text="dark">
                  <span>
                    <BiWorld />
                  </span>
                  Virtual Worlds
                </Badge>
                <Badge className="new-item-badge" pill text="dark">
                  <span>
                    <GiCardRandom />
                  </span>
                  Trading Cards
                </Badge>
                <Badge className="new-item-badge" pill text="dark">
                  <span>
                    <GiBearFace />
                  </span>
                  Collectibles
                </Badge>
                <Badge className="new-item-badge" pill text="dark">
                  <span>
                    <FaFootballBall />
                  </span>
                  Sports
                </Badge>
                <Badge className="new-item-badge" pill text="dark">
                  <span className="fa fa-file" /> Documents
                </Badge>
                <Badge className="new-item-badge" pill text="dark">
                  <span>
                    <FaWallet />
                  </span>
                  Utility
                </Badge>
                <div className="mb-4" id="new-item-form-error">
                  {this.state.errors.categories}
                </div>
              </div>
            </div>
            <div> this.props.description </div>
            <div>this.props.addres</div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    );
  };
}

export default SingleAuctionComponent;
