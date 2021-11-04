import React, { Component } from 'react';
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
                           <div className = 'btn-group-vertical'>
                               <button type = 'button' className = 'btn btn-dark btn-lg'>User details</button>
                               <button type = 'button' className = 'btn btn-dark btn-lg'>My Winnings</button>
                               <button type = 'button' className = 'btn btn-dark btn-lg'>Account</button>
                               <button type = 'button' className = 'btn btn-dark btn-lg'>Terms and Conditions</button>
                               <button type = 'button' className = 'btn btn-dark btn-lg'>Log-out</button>
                            </div>  
                        </div>   
                        <div className='col-md-6'></div>
                    </div>    
                </div> 

            </section>
        )
    }
}

export default UserProfile;