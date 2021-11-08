import React, { Component } from "react";
import { Button } from "reactstrap";
import SingleAuctionComponent from "./SingleAuctionComponent";
import "./auctionlist.css";
import { Accordion } from "react-bootstrap";
import Select from "react-select";
// redux stuff
import { connect } from "react-redux";
import {
  get_auction_list,
  get_filtered_auction,
} from "../../apis_redux/actions/auction_list";
import Loading from "../loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Error from "../FrequentComponents/RenderError";
import { categoryList } from "../../variables";

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
      selectedTag: [],
      selectedTime: "",
      page: 0,
      data: [],
      filter: false,
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
    /*
      tags , page , time
    */
    this.setState({ page: 0, data: [], filter: true });
    // console.log("new state with filter true");
    this.clearFilterButtonHandler();
  };

  clearFilterButtonHandler = async () => {
    if (this.state.filter) {
      //with filters
      // console.log("filter");
      const tosend = {
        tags: this.onlyValuesarray(this.state.selectedTag),
        time: this.state.selectedTime.value,
        page: this.state.page,
      };
      //console.log(tosend);
      await this.props.get_filtered_auction(tosend);
      if (!this.props.auctionlist.loading && !this.props.auctionlist.errors) {
        this.setState({
          data: [this.state.data, this.props.auctionlist.payload].flat(),
        });
      }
    } else {
      //console.log("withour filters");
      //without filters
      await this.props.getAllAuctions(this.state.page);
      while (true) {
        if (!this.props.auctionlist.loading) {
          //  console.log("finally done");
          this.setState({
            data: [
              this.state.data.flat(),
              this.props.auctionlist.payload.flat(),
            ].flat(),
          });
          break;
        }
      }
    }
  };
  whatTime = () => {
    const now = new Date();
    const abhi = now.toISOString();
  };
  fetchMoreAssets = () => {
    this.setState({ page: this.state.page + 1 });
    this.clearFilterButtonHandler();
  };
  isMorefunc = () => {
    if (this.props.auctionlist.loading) {
      return false;
    } else if (this.props.auctionlist.errors) {
      return false;
    } else {
      if (this.props.auctionlist.payload.data.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  };
  ui = () => {
    return (
      <div className="container container-fluid asset-container">
        <div className="row justify-content-center mt-4 mb-4">
          <h3 className="col-12 rainbow-lr new-item-heading">VIEW AUCTIONS</h3>
        </div>
        <div className="input_div_auctionList">
          <h5 style={{ color: "white" }}>Select Tags</h5>
          <Select
            onMenuOpen={() =>
              this.setState({
                dropDownOpen: true,
              })
            }
            onMenuClose={() =>
              this.setState({
                dropDownOpen: false,
              })
            }
            styles={styles}
            closeMenuOnSelect={false}
            isMulti
            placeholder="Select Tags"
            options={categoryList}
            onChange={(e) => {
              this.setState({ selectedTag: e });
              if (this.state.selectedTag.length || this.state.selectedTime) {
                this.setState({ filter: true });
              } else {
                this.setState({ filter: false });
              }
            }}
            value={this.state.selectedTag}
          />
        </div>
        <div className="input_div_auctionList">
          <h5 style={{ color: "white" }}>Select time</h5>
          <Select
            value={this.state.selectedTime}
            onMenuOpen={() =>
              this.setState({
                dropDownOpen: true,
              })
            }
            onMenuClose={() =>
              this.setState({
                dropDownOpen: false,
              })
            }
            styles={styles}
            placeholder="Select Auction time"
            closeMenuOnSelect={true}
            options={[
              { value: "Past", label: "Past" },
              { value: "Live", label: "Live" },
              { value: "Upcoming", label: "Upcoming" },
            ]}
            onChange={(e) => {
              this.setState({ selectedTime: e });

              if (this.state.selectedTag.length || this.state.selectedTime) {
                this.setState({ filter: true });
              } else {
                this.setState({ filter: false });
              }
            }}
          />
        </div>

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
            Apply Filters
          </Button>

          <Button
            color="danger"
            onClick={() => {
              this.setState({
                selectedTag: [],
                selectedTime: "",
                filter: false,
                data: [],
              });
              this.clearFilterButtonHandler();
            }}
          >
            Clear Filters
          </Button>
        </div>

        <InfiniteScroll
          dataLength={this.state.data.length}
          next={() => this.fetchMoreAssets()}
          hasMore={this.props.auctionlist.payload.length > 0 ? true : false}
          // loader={<Loading />}
          endMessage={
            <h3 className="col-12 rainbow-lr new-item-heading">
              No More auctions :(
              <br />
              <br />
              Check Back Soon!!
            </h3>
          }
        >
          <Accordion
            defaultActiveKey="0"
            style={{ marginTop: "50px" }}
            onScroll={this.handleScroll}
          >
            {this.state.data.map((element, index) => {
              if (element) {
                const now = new Date();
                const abhi = now.toISOString();
                let whichtype = 2;
                const one = new Date(abhi);
                const two = new Date(element.event_date_time);
                if (element.completed === true) {
                  //past
                  whichtype = 2;
                } else if (two > one) {
                  //upcomming
                  whichtype = 1;
                } else {
                  whichtype = 0;
                }
                return (
                  <SingleAuctionComponent
                    auctionName={element._id}
                    eventKey={index}
                    organizer_contact={element.organizer_contact}
                    time={element.event_date_time}
                    organizerName="Organizer Name"
                    description="Description"
                    tags={element.tags}
                    addressLine1={element.pickup_point.addressLine1}
                    addressLine2={element.pickup_point.addressLine2}
                    city={element.pickup_point.city}
                    postalCode={element.pickup_point.postalCode}
                    state={element.pickup_point.addressState}
                    country={element.pickup_point.country}
                    type={whichtype}
                  />
                );
              }
            })}
          </Accordion>
        </InfiniteScroll>
      </div>
    );
  };
  render = () => {
    if (this.props.auctionlist.loading) {
      return <Loading />;
    } else if (this.props.auctionlist.errors) {
      return <Error />;
    } else {
      return <>{this.ui()}</>;
    }
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
