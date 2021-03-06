import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DigitalAsset from "./Add/DigitalAsset";
import PhysicalAsset from "./Add/PhysicalAsset";
import LiveAuction from "./Add/LiveAuction";
import ViewDigitalAsset from "./View/ViewDigitalAsset";
import ViewPhysicalAsset from "./View/ViewPhysicalAsset";
import SingleAssetDetail from "./View/SingleAsset";
import Winnings from "./Winnings/WinningsListing";
import ContactUs from "./Contactus/Contactus";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import Home from "./Home/Home";
import Auctionlist from "./View/Auctionlist";
import Logout from "./Authentication/Logout";
import ForgotPassword from "./Authentication/ForgotPassword";
import ResetPassword from "./Authentication/ResetPassword";
import TermsConditions from "./TermsConditions/TermsConditions";
import LiveAuctionRoom from "./LiveAuctionRoom/LiveAuctionRoom";
import PendingShipment from "./PendingShipments/PendingShipment";
import MyDigitalAssets from "./MyDigitalAssets/MyDigitalAssets";
import NftAssetDetails from "./MyDigitalAssets/RenderNftAssetDetails";
import { connect } from "react-redux";
import TestingDigitalAsset from './View/DigitalAssets_test';
import UserProfile from "./UserProfile/UserProfile";

function PrivateRoute({ userAuth, children, ...rest }) {
  let auth = userAuth;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
}

class Main extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#03091F";
  }

  renderPhysicalAssetDetail = ({ match }) => {
    return <SingleAssetDetail itemId={match.params.assetId} />;
  };

  renderDigitalAssetDetail = ({ match }) => {
    return <NftAssetDetails nftAssetId={match.params.nftAssetId} />
  };

  renderProfile = ({match}) => {
    return <UserProfile user={match.params.userId} />
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          {" "}
          <Route exact path='/testing' component={TestingDigitalAsset} />
          {/*Authentication*/} <Route exact path="/signup" component={SignUp} />{" "}
          <Route exact path="/login" component={Login} />{" "}
          <Route exact path="/forgot_password" component={ForgotPassword} />{" "}
          <Route
            exact
            path="/reset_password/:id/:token"
            component={ResetPassword}
          />{" "}
          {/*Pending Shipment*/}
          <Route
            exact
            path="/pending-shipment"
            component={PendingShipment}
          />{" "}
          <PrivateRoute userAuth={this.props.auth} exact path="/logout">
            <Logout />
          </PrivateRoute>
          {/*Home Page*/} <Route exact path="/home" component={Home} />{" "}
          <Route
            exact
            path="/terms_and_conditions"
            component={TermsConditions}
          />
          {/*Contact us page*/}{" "}
          <Route exact path="/contact-us" component={() => <ContactUs />} />
          
          {/* Create Independent-Digital-Asset */}{" "}
          <PrivateRoute userAuth={this.props.auth} exact path="/create/independent-digital-assets">
            <DigitalAsset />
          </PrivateRoute>
           
          {/* Create Independent-Physical-Asset */}{" "}
          <PrivateRoute userAuth={this.props.auth} exact path="/create/independent-physical-assets">
            <PhysicalAsset />
          </PrivateRoute>
        
          {/* Create Live-Auction */}{" "}
          <PrivateRoute userAuth={this.props.auth} exact path="/create/live_auction">
            <LiveAuction />
          </PrivateRoute>
          
          {/* View Independent Digital Assets */}{" "}
          <Route
            exact
            path="/view/independent-digital-assets"
            component={() => <ViewDigitalAsset />}
          />
          {/* View Independent Pysical Assets */}{" "}
          <Route
            exact
            path="/view/independent-physical-assets"
            component={() => <ViewPhysicalAsset />}
          />
          {/* Independent Physical Asset Detail */}{" "}
          <Route
            exact
            path="/view/independent-physical-assets/:assetId"
            component={this.renderPhysicalAssetDetail}
          />
          {/* My Nfts Listing */}{" "}
          <PrivateRoute userAuth={this.props.auth} exact path="/my-digital-assets">
            <MyDigitalAssets/>
          </PrivateRoute>
          {/* Nft Asset Details */}{" "}
          <Route
            exact
            path="/digital-assets/:nftAssetId"
            component={this.renderDigitalAssetDetail}
          />
          {/* View Live Auctions List */}{" "}
          <PrivateRoute userAuth={this.props.auth} exact path="/view/auctions">
            <Auctionlist />
          </PrivateRoute>
          {/* Live Auction Room */}
          <Route
            exact
            path="/view/auctions/:auctionId"
            component={LiveAuctionRoom}
          />

          <Route exact path="/my-winnings" component={() => <Winnings />} />
          <Route exact path="/profile/:userId" component={this.renderProfile} />
          <Redirect to="home" />
        </Switch>{" "}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Main);
