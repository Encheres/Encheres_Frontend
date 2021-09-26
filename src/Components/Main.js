import React, { Component } from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Contactus from './contact-us/Contactus';
class Main extends Component {
  

  render() {

    return (
      <div>
        <Header />
        <Contactus/>
        <Footer />
      </div>
    );
  }
}

export default Main;