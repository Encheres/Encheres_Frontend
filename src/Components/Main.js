
import React, { Component } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import NewItem from './Create/NewItem';
import ContactUs from './Contactus/Contactus';
import SignUp from './Authentication/SignUp';
class Main extends Component {


  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/signup' component={SignUp} />

          {/*Contact us page*/}
          <Route exact path='/contact-us' component={() => <ContactUs />} />
          <Route exact path='/create/Independent-Item' component={() => <NewItem />} />
          <Redirect to='/create/Independent-Item' />

        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;