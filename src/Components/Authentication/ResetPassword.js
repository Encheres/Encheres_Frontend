import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link}from 'react-router-dom';
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ForgotPassImg from '../../assets/images/reset_password.jpg';
import './styles.css'

import {handleResetPassword} from '../../apis_redux/actions/auth.js';
import swal from 'sweetalert';

class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            password:"",
            re_enter_password:"",
            userId:"",
            token:"",
            message:"",
            error:"",
            errors:{
                email:""
            }
        }
    }
    componentDidMount(){
        if(this.props.auth.isSignedIn){
            this.props.history.push('/');
        }
        const token = this.props.match.params.token;
        const userId = this.props.match.params.id;
        this.setState({
            token, userId
        })
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    validateForm = ()=>{
        const {password, re_enter_password} = this.state;
        let passworderror="", error = false;
        if(!password ||password.length<6){
            passworderror = "* Please enter a valid password";
            error = true;
        }else if(password!==re_enter_password){
            passworderror = "* Password and Re-enter Password must be same";
            error = true;
        }
        this.setState({
            errors:{
                password:passworderror
            }
        });
        return error;
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        const {password, userId, token} = this.state;
        const data = { password, userId, token };
        const error = this.validateForm();
        if(!error){
            await this.props.handleResetPassword(data);
            if(this.props.resetPass.error){
                this.setState({
                    error:this.props.resetPass.error
                })
                swal("Oops!", this.props.resetPass.error, "error");
            }else{
                this.setState({
                    message:this.props.resetPass.message
                })
                swal("Success!", "Password has been reset successfully", "success");
            }
        }
    }

    render(){
        return(
            <Container>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Reset Password
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
                                            <h4 className="main_heading__form blue_violet_gradient">Set New Password</h4>
                                            <br/>
                                            <h4 className="form__text--para text__small"> Please enter the new password you would like to use.</h4>
                                            
                                        </Row>
                                        <br/>
                                        <Row className="form_input_row form_grp">
                                        <Form.Group controlId="formBasicPassword">
                                            <input name="password" className="form_input_field form-control" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                                            <Form.Text className="text-muted ">
                                                Password must be at least 6 characters long.
                                            </Form.Text>
                                        </Form.Group>  
                                        </Row>

                                        <Row className="form_input_row form_grp">
                                        <Form.Group controlId="formBasicPassword">
                                            <input name="re_enter_password" className="form_input_field form-control" type="password" value={this.state.re_enter_password} placeholder="Password" onChange={this.handleInputChange} />
                                            
                                            <Form.Text className="text-muted ">
                                                Re-enter Password
                                            </Form.Text>
                                        </Form.Group>  
                                        </Row>
                                        <div className="invalid__feedback">{this.state.errors.password}</div>

                                        {this.state.message && 
                                            <>
                                                <div className="success_text">{this.state.message}</div>
                                                <div className="form__text--para">Please login to continue: <Link to="/login">Login</Link></div>
                                            </>    
                                        }
                                        {this.state.error && <div className="failed_text">{this.state.error}</div>}

                                        <br/>
                                        <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.handleSubmit}>
                                            Set new Password
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
        auth:state.auth,
        resetPass:state.resetPass
    })

}

export default connect(mapStateToProps, {handleResetPassword})(ResetPassword);