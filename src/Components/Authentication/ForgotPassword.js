import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ForgotPassImg from '../../assets/images/forgot_password.jpg';
import './styles.css'

import {handleForgetPassword} from '../../apis_redux/actions/auth.js';

class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            message:'',
            error:'',
            errors:{
                email:""
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
        const {email} = this.state;
        const valid_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        let emailerror="", error = false;
        if(!email ||email.match(valid_email)===null){
            emailerror = "* Please enter a valid email address";
            error = true;
        }
        this.setState({
            errors:{
                email:emailerror
            }
        });
        return error;
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        const {email} = this.state;
        const data = { email}
        const error = this.validateForm();
        if(!error){
            await this.props.handleForgetPassword(data);
            console.log(this.props.resetPass);
            this.setState({
                message:this.props.resetPass.message,
                error: this.props.resetPass.error
            })
        }
    }

    render(){
        return(
            <Container>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Forgot Password?
                    </h3>
                </Row>
                <Row className="section_content">
                    
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                <Row>
                                    <Col lg={6}>
                                        <Image src={ForgotPassImg} className="login_image" alt="forgot password image"/>
                                    </Col>
                                    <Col lg={6}>
                                    <Form className="login_form">
                                        <Row>
                                            <h4 className="main_heading__form blue_violet_gradient">It Happens...</h4>
                                            <br/>
                                            <h4 className="form__text--para text__small"> Please enter your email id registered with us. <br/> 
                                                Your password reset link will be sent to your email id.
                                            </h4>
                                        </Row>
                                        <br/>
                                        <Row className="form_input_row form_grp">
                                            <Form.Group controlId="formBasicEmail">
                                                {/* <Form.Label className="form_input_label">Email address</Form.Label> */}
                                                <input name="email" className="form_input_field form-control" type="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{this.state.errors.email}</div>
                                            </Form.Group>
                                        </Row>
                                        {this.state.message && 
                                            <>
                                                <div className="success_text">{this.state.message}</div>
                                                <div className="text-muted">If you didn't get an mail from our side, then please try again after some time</div>
                                            </>    
                                        }
                                        {this.state.error && <div className="failed_text">{this.state.error}</div>}

                                        <br/>
                                        <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.handleSubmit}>
                                            Send Reset Link
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
        resetPass:state.resetPass
    })

}

export default connect(mapStateToProps, {handleForgetPassword})(ForgotPassword);