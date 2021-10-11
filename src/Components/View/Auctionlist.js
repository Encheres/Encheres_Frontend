import React, { Component } from "react";
import SingleAuctionComponent from "./SingleAuctionComponent";
import "./auctionlist.css";
import { Accordion, Button, ButtonGroup } from "react-bootstrap";
class Auctionlist extends Component {
  componentDidMount = () => {};

  render() {
    return (
      <section style={{ paddingTop: "100px" }}>
        <div className="container">
          <Accordion defaultActiveKey="0">
            <SingleAuctionComponent props={{}}></SingleAuctionComponent>

            <SingleAuctionComponent props={{}}></SingleAuctionComponent>

            <SingleAuctionComponent props={{}}></SingleAuctionComponent>

            <SingleAuctionComponent props={{}}></SingleAuctionComponent>
          </Accordion>
        </div>
      </section>
    );
  }
}

export default Auctionlist;
