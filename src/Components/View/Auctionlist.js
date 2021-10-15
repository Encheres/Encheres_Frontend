import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import SingleAuctionComponent from "./SingleAuctionComponent";
import "./auctionlist.css";
import { Accordion } from "react-bootstrap";
import Select from "react-select";
// redux stuff
import { connect } from 'react-redux';
import { get_auction_list, get_filtered_auction } from '../../apis_redux/actions/auction_list'
const styles = {
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#222242",
      color: "red",
    };
  },
};
class Auctionlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: "Art", label: "Art" },
        { value: "Music", label: "Music" },
        { value: "Domain Names", label: "Domain Names" },
        { value: "Virtual World", label: "Virtual World" },
        { value: "Trading Cards", label: "Trading Cards" },
        { value: "Collectibles", label: "Collectibles" },
        { value: "Sports", label: "Sports" },
        { value: "Documents", label: "Documents" },
        { value: "Utility", label: "Utility" },
      ],
      loading: false,

    };
  }
  render = () => {
    return (
      <section style={{ paddingTop: "100px" }}>
        <div className="container">
          <div style={{ marginTop: "10px" }}>
            <h5 style={{ color: "white" }}>Select Tags</h5>
            <Select
              styles={styles}
              closeMenuOnSelect={false}
              isMulti
              options={this.state.options}
            />
            <h5 style={{ color: "white" }}>Select time</h5>
            <Select
              styles={styles}
              closeMenuOnSelect={true}
              options={[
                { value: "Past", label: "Past" },
                { value: "Live", label: "Live" },
                { value: "Upcomming", label: "Upcomming" },
              ]}
            />
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button className="new-item-card-button">Filter</Button>
            </div>
          </div>
          <Accordion defaultActiveKey="0" style={{ marginTop: "50px" }}>
            <SingleAuctionComponent
              auctionName="Auction Name"
              eventKey="1"
              time="time"
              organizerName="Organizer Name"
              description="Description"
              address="address"
            />
            <SingleAuctionComponent
              auctionName="Auction Name"
              eventKey="2"
              time="time"
              organizerName="Organizer Name"
              description="Description"
              address="address"
            />
            <SingleAuctionComponent
              auctionName="Auction Name"
              eventKey="3"
              time="time"
              organizerName="Organizer Name"
              description="Description"
              address="address"
            />
            <SingleAuctionComponent
              auctionName="Auction Name"
              eventKey="4"
              time="time"
              organizerName="Organizer Name"
              description="Description"
              address="address"
            />
          </Accordion>
        </div>
      </section>
    );
  };
}


export default Auctionlist;
