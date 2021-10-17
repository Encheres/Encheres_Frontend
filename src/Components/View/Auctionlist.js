import React, { Component } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import SingleAuctionComponent from "./SingleAuctionComponent";
import "./auctionlist.css";
import { Accordion } from "react-bootstrap";
import Select from "react-select";
// redux stuff
import { connect } from "react-redux";

import {
  GiCardRandom,
  GiBearFace,
  GiClockwork,
  GiVendingMachine,
  GiSofa,
  GiClothes,
  GiWatch,
} from "react-icons/gi";
import {
  get_auction_list,
  get_filtered_auction,
} from "../../apis_redux/actions/auction_list";
import Loading from "../loading";

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
        { value: "Antiques", label: "Antiques" },
        { value: "Electronics", label: "Electronics" },
        { value: "Vehicles", label: "Vehicles" },
        { value: "Households", label: "Households" },
        { value: "Collectibles", label: "Collectibles" },
        { value: "Sports", label: "Sports" },
        { value: "Fashion", label: "Fashion" },
        { value: "Real Estate", label: "Real Estate" },
        { value: "Miscellaneous", label: "Miscellaneous" },
        { value: "Mini Items", label: "Mini Items" },
      ],
      selectedTag: [],
      selectedTime: "",
      customer_id: "not loaded",
    };
  }
  componentDidUpdate = () => {};
  componentDidMount = () => {
    this.clearFilterButtonHandler();
  };
  isUserCreator = () => {
    return this.props.auth.userId; //equate to orgamixer id.
  };
  convertTimetoUserLocation = (s) => {
    return new Date(s).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };
  onlyValuesarray = (arr) => {
    return arr.map((e) => {
      return e.value;
    });
  };
  buttonPressHandler = () => {
    let tagsarr = this.onlyValuesarray(this.state.selectedTag);
    /* 
      tags , page , time
    */
    this.props.get_filtered_auction({
      tags: tagsarr,
      time: this.state.selectedTime,
      page: 10,
    });
  };
  clearFilterButtonHandler = () => {
    this.props.getAllAuctions(10);
  };
  ui = () => {
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
              onChange={(e) => {
                this.setState({ selectedTag: e });
              }}
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
              onChange={(e) => {
                this.setState({ selectedTime: e.value });
              }}
            />
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                className="new-item-card-button"
                onClick={this.buttonPressHandler}
              >
                Filter
              </Button>
              <Button color="danger">Clear Filters</Button>
            </div>
          </div>
          <Accordion defaultActiveKey="0" style={{ marginTop: "50px" }}>
            {!this.props.auctionlist.payload ? (
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
                  <SingleAuctionComponent
                    auctionName={element._id}
                    eventKey={index}
                    organizer_contact={element.organizer_contact}
                    time={this.convertTimetoUserLocation(
                      element.event_date_time
                    )}
                    organizerName="Organizer Name"
                    description="Description"
                    tags={element.tags}
                    addressLine1={element.pickup_point.addressLine1}
                    city={element.pickup_point.city}
                    postalCode={element.pickup_point.postalCode}
                    state={element.pickup_point.state}
                  />
                );
              })
            )}
          </Accordion>
        </div>
      </section>
    );
  };
  render = () => {
    return this.props.auctionlist.loading ? <Loading color='white' /> : <> {this.ui()} </>;
  };
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    auctionlist: state.auctionlist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllAuctions: (page) => dispatch(get_auction_list(page)),
    get_filtered_auction: (filters) => dispatch(get_filtered_auction(filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auctionlist);
