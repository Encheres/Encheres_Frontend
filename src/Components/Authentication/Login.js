import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Lock from '../../assets/images/lock.jpg';
import './styles.css'

import {handleSignIn} from '../../apis_redux/actions/auth.js';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errors:{
                email:"",
                password:"",
            }
        }
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    validateForm = ()=>{
        const {email, password} = this.state;
        const valid_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        let emailerror="", passworderror="", error = false;
        if(!email ||email.match(valid_email)===null){
            emailerror = "* Please enter a valid email address";
            error = true;
        }
        if(!password ||password.length<6){
            passworderror = "* Please enter a valid password";
            error = true;
        }
        this.setState({
            errors:{
                email:emailerror,
                password:passworderror,
            }
        });
        return error;
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        const {email, password} = this.state;
        const data = { email, password}
        const error = this.validateForm();
        if(!error){
            await this.props.handleSignIn(data);
            if(this.props.auth.isSignedIn){
                console.log("SignIn Successful");
                this.props.history.push('/');
            }else{
                console.log(this.props.auth.error);
            }

        }
    }

    render(){
        return(
            <Container>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Login
                    </h3>
                </Row>
                <Row className="section_content">
                    
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                <Row>
                                    <Col lg={6}>
                                        <Image src={Lock} className="login_image" alt="lock image"/>
                                    </Col>
                                    <Col lg={6}>
                                    <Form className="login_form">
                                        <Row>
                                            <h4 className="main_heading__form light__blue">Welcome Back, </h4>
                                            <h4 className="main_heading_secondary"> Please login to continue</h4>

                                        </Row>
                                        <Row className="form_input_row form_grp">
                                            <Form.Group controlId="formBasicEmail">
                                                {/* <Form.Label className="form_input_label">Email address</Form.Label> */}
                                                <input name="email" className="form_input_field form-control" type="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{this.state.errors.email}</div>
                                            </Form.Group>
                                        </Row>

                                        <Row className="form_input_row form_grp">
                                            <Form.Group controlId="formBasicPassword">
                                                {/* <Form.Label className="form_input_label">Password</Form.Label> */}
                                                <input name="password" className="form_input_field form-control" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{this.state.errors.password}</div>
                                            </Form.Group>  
                                        </Row>

                                        
                                        <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.handleSubmit}>
                                            Login
                                        </Button>
                                        
                                    </Form>
                                    </Col>
                                </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </Container>
        )

    }
};

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth:state.auth
    })

}

export default connect(mapStateToProps, {handleSignIn})(LoginForm);