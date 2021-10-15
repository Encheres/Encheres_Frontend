import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DigitalAsset from "./Add/DigitalAsset";
import PhysicalAsset from "./Add/PhysicalAsset";
import LiveAuction from "./Add/LiveAuction";
import ViewDigitalAsset from "./View/ViewDigitalAsset";
import ViewPhysicalAsset from "./View/ViewPhysicalAsset";
import ContactUs from "./Contactus/Contactus";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import Home from "./Home/Home";
import Auctionlist from "./View/Auctionlist";
import Logout from "./Authentication/Logout";
import ForgotPassword from "./Authentication/ForgotPassword";
import ResetPassword from "./Authentication/ResetPassword";
import TermsConditions from "./TermsConditions/TermsConditions";
import { connect } from "react-redux";

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
              state: { from: location }
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

  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/*Authentication*/}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route
            exact
            path="/reset_password/:id/:token"
            component={ResetPassword}
          />
          <PrivateRoute userAuth={this.props.auth} exact path="/logout"><Logout/></PrivateRoute> 

          {/*Home Page*/}
          <Route exact path="/home" component={Home} />
          <Route exact path = "/terms_and_conditions" component={TermsConditions}/>

          {/*Contact us page*/}
          <Route exact path="/contact-us" component={() => <ContactUs />} />

          {/* Create Independent-Digital-Asset */}
          <Route
            exact
            path="/create/independent-digital-assets"
            component={() => <DigitalAsset />}
          />

          {/* Create Independent-Physical-Asset */}
          <Route
            exact
            path="/create/independent-physical-assets"
            component={() => <PhysicalAsset />}
          />

          {/* Create Live-Auction */}
          <Route exact path="/create/live_auction" component={() => <LiveAuction />} />

          {/* View Independent-Digital-Asset */}

          {/* View Independent DIgital Assets */}
          <Route
            exact
            path="/view/independent-digital-assets"
            component={() => <ViewDigitalAsset />}
          />

          {/* View Independent DIgital Assets */}
          <Route
            exact
            path="/view/independent-physical-assets"
            component={() => <ViewPhysicalAsset />}
          />
          {/* View Live Auctions List */}
          <Route
            exact
            path="/view/auctions"
            component={() => <Auctionlist />}
          />

          <Redirect to="home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops)=>{
  return{
    auth:state.auth
  }
}

export default connect(mapStateToProps,{})(Main);
