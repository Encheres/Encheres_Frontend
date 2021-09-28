
import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import NewItem from './Create/NewItem';
import Contact from './Contactus/Contactus'
class Main extends Component {


  render() {

    return (
      <div>
        <Header />
        <Switch>
          {/*Contact us page*/}
          <Route exact path='/contact-us' component={() => <Contact />} />
          <Route exact path='/create/Independent-Item' component={() => <NewItem />} />
          <Redirect to='/create/Independent-Item' />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;