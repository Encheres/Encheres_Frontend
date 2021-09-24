import React, { Component } from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class Main extends Component {
  

  render() {

    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }
}

export default Main;