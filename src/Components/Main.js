import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DigitalAsset from "./Add/DigitalAsset";
import PhysicalAsset from "./Add/PhysicalAsset";
import ViewDigitalAsset from "./View/ViewDigitalAsset";
import ViewPhysicalAsset from "./View/ViewPhysicalAsset";
import ContactUs from "./Contactus/Contactus";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import Home from "./Home/Home";
import Auctionlist from "./View/Auctionlist";
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import DigitalAsset from "./Add/DigitalAsset";
import PhysicalAsset from "./Add/PhysicalAsset";
import ViewDigitalAsset from "./View/ViewDigitalAsset";
import ViewPhysicalAsset from "./View/ViewPhysicalAsset";
import ContactUs from "./Contactus/Contactus";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import Logout from "./Authentication/Logout";
import Home from "./Home/Home";
import ForgotPassword from "./Authentication/ForgotPassword";
import ResetPassword from "./Authentication/ResetPassword";

class Main extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#03091F";
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/forgot_password" component={ForgotPassword} />
          <Route
            exact
            path="/reset_password/:id/:token"
            component={ResetPassword}
          />

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

export default Main;
