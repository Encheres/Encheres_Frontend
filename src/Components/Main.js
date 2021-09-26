import React, { Component } from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import NewItem from './Create/NewItem';

class Main extends Component {
  

  render() {

    return (
      <div>
        <Header />
          <Switch>
              <Route exact path='/create/Independent-Item' component={() => <NewItem/>}/>
              <Redirect to='/create/Independent-Item' />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;