import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Row, Col} from "reactstrap";
import "./UserProfile.css";
import Form from 'react-bootstrap/Form';
import { Image } from 'react-bootstrap';
import UserImage from '../../assets/images/user.jpg'

class UserProfile extends Component{
    render(){
        return(
            <section className= "section-padding-100">
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                           <div id='pfp'></div>
                           {
                               this.props.userId==this.props.user ?
                                <div className = 'btn-group-vertical'>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>User details</button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/my-digital-assets`}>
                                        My Digital Assets
                                    </Link>
                                    </button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/my-winnings`}>
                                        My Winnings
                                    </Link>
                                    </button>
                                    <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/pending-shipment`}>
                                        Pending Shipments
                                    </Link>
                                    </button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>Account</button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/terms_and_conditions`}>
                                        Encheres Terms and Conditions
                                    </Link>
                                    </button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/logout`}>
                                        Log-out
                                    </Link>
                                </button>
                                </div> :
                                <></> 
                           }
                        </div> 
                        <div className='col-md-6'></div>
                    </div>    
                </div> 

            </section>
        )
    }
}

const mapStateToProps = (state, ownprops) => {
    return {
      userId: state.auth.userId
    };
};

export default connect(mapStateToProps, {})(UserProfile);