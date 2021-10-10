import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import Form from 'react-bootstrap/Form';
import AddressForm from '../FrequentComponents/AddressForm'
import './styles.css'
import { Link } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider'
// import {detectEthereumProvider} from '@metamask/detect-provider';
import {addressValidation} from '../FrequentComponents/AddressForm';

import {handleSignUp} from '../../apis_redux/actions/auth.js'

class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name:"",
            anonymous_name:"",
            email:"",
            password:"",
            address:{
                addressLine1:"",
                addressLine2:"",
                city:"",
                addressState:"",
                country:"",
                postalCode:"",
            },
            accounts:[],
            stateList:[],
            cityList:[],
            accept_conditions:false,
            account_integrated:false,
            display_first: true,
            errors:{
                name:"",
                anonymous_name:"",
                email:"",
                password:"",
                address:{
                    addressLine1:"",
                    addressLine2:"",
                    city:"",
                    addressState:"",
                    country:"",
                    postalCode:"",
                }
            }
        }
    }
    
    handleInputChange=(event)=>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }

    handleAddressChange = (address)=>{
        this.setState({
            address: address
        })
    }

    

    formValidation = ()=>{
        const {name, anonymous_name, email, password, address} = this.state;
        let nameerror="", anonynameerror="" ,emailerror="", passworderror="";
        let error = false;
        const valid_email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

        if(name.trim().length === 0){
            error = true;
            nameerror = "* Name is required";
        }

        if(anonymous_name.trim().length === 0){
            error = true;
            anonynameerror = "* Anonymous Name is required";
        }
        
        if(email.trim().length === 0 || email.match(valid_email) === null){
            error = true;
            emailerror = "* Enter a valid email";
        }

        if(password.trim().length < 6){
            error = true;
            passworderror = "* Password should be 6 or more characters long";
        }

        const addressStatus = addressValidation(address);
        if(!error){
            error = addressStatus.error;
        }
        
        this.setState({
            errors:{
                name:nameerror,
                anonymous_name:anonynameerror,
                email:emailerror,
                password:passworderror,
                address:addressStatus.address_error
            }
        })
        
        return error;
    }

    integrateMetamaskAccount = async(e)=>{
        e.preventDefault();
        try{
            const provider = await detectEthereumProvider();
            if(!provider){
                alert("Please use a browser with MetaMask installed in it");
                return;
            }
              
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            this.setState({
                accounts: accounts,
                account_integrated:true
            })
        }catch(err){
            alert("Account Integration failed");
        }  
    }

    handleCheckboxChange = e=>{
        this.setState({
            accept_conditions: !this.state.accept_conditions
        })
    }

    handleFormSubmit = e =>{
        e.preventDefault();
        const error = this.formValidation();
        if(!error){
            this.handleFormChange();
        }
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        if(this.state.account_integrated && this.state.accept_conditions){
            const {name, anonymous_name, email, password, address, accounts} = this.state;
            const data = {
                name:name,
                anonymous_name:anonymous_name,
                email:email,
                password:password,
                address:address,
                accounts:accounts
            }
            await this.props.handleSignUp(data);
            if(this.props.auth.isSignedIn){
                console.log("SignUp Successful");
                this.props.history.push('/');
            }else{
                console.log(this.props.auth.error);
            }


        }else{
            alert("Please integrate your account and accept the terms and conditions");
        }
    }

    handleFormChange = e=>{
        this.setState({
            display_first: !this.state.display_first
        })
    }

    renderForm= ()=>{
        return(
            <>
                <Row className="form_heading_row blue_violet_gradient">
                    Personal Details
                </Row>

                <Form>
                    <Row className="form_input_row">
                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicName">
                            {/* <Form.Label className="form_input_label">Name</Form.Label> */}
                            <input name="name" className="form_input_field form-control" type="text" value={this.state.name} placeholder="Name" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.name}</div>
                        </Form.Group>  
                        </Col>
                        
                        
                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicAnonymousName">
                            {/* <Form.Label className="form_input_label">Anonymous Name</Form.Label> */}
                            <input name="anonymous_name" className="form_input_field form-control" type="text" value={this.state.anonymous_name} placeholder="Anonymous Name" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.anonymous_name}</div>
                            <Form.Text className="text-muted">
                               Your this  name will be displayed to other users, while participating in auction.
                            </Form.Text>
                        </Form.Group>
                        </Col>
                        
                    </Row>
                    
                    <Row className="form_input_row">
                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label className="form_input_label">Email address</Form.Label> */}
                            <input name="email" className="form_input_field form-control" type="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.email}</div>
                        </Form.Group>
                        </Col>

                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label className="form_input_label">Password</Form.Label> */}
                            <input name="password" className="form_input_field form-control" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.password}</div>
                            <Form.Text className="text-muted ">
                                Password must be at least 6 characters long.
                            </Form.Text>
                        </Form.Group>  
                        </Col>
                    </Row>

                    <AddressForm address={this.state.address} handleAddressChange = {this.handleAddressChange} errors = {this.state.errors.address}/>

                                        
                    <Button className="form__button pink_blue_gradiend_btn" onClick={this.handleFormSubmit}>
                        Next
                    </Button>
                                        
                </Form>
            </>
        )
    }

    renderAccountIntegrator = () =>{
        return(
        <>
            <Row className="form_heading_row blue_violet_gradient">
                Integrate Crypto Wallet
            </Row>
            <p className="form__text--para">
                As we deal with crypto currency, we need to integrate your crypto-wallet. You will need to install <b>metamask</b> on your device, and sign in to your crypto account.
                <br/>
                You can install metamask from here: <a href='https://metamask.io/download.html' target='blank'> Download Metamask</a>
                <br/>
            </p>

            <p className='form__text--para'>
                As Encheres is being developed as a prototype application, you can create a <b>dummy crypto account using Ganache</b>. You can use this dummy account to signup to metamask and test Encheres application.
                <br/>
                You can install Ganache from here: <a href='https://www.trufflesuite.com/ganache' target='blank'> Download Ganache</a>
                <br/>

            </p>
            <Row>
                <p className='form__text--para'>
                <input type="checkbox" className="input_checkbox" id="terms_conditions" name="terms_conditions" value="" checked={this.state.accept_conditions} onChange={this.handleCheckboxChange}/> 
                        By using encheres application, you must agree to our <Link to='/terms-and-conditions' target='blank'>Terms and Conditions</Link></p>
            </Row>

            <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.integrateMetamaskAccount}>
                Enable Metamask
            </Button>

            {
                this.state.account_integrated ? <p className='form__text--para success_text'>Your account has been integrated successfully</p>:<p className='form__text--para muted_text'>Metamask account not integrated</p>
            }

            <br/><br/>
            <div>
                <Button className="form__button pink_blue_gradiend_btn" onClick={this.handleFormChange}>
                    Go Back
                </Button>
                
                <Button className="form__button pink_blue_gradiend_btn" onClick={this.handleSubmit}>
                    SignUp
                </Button>
            </div>
        
        </>
        )
    }

    
    render() {
        return(
            <Container>
                <Row className="heading_section_row">
                    {/* <h3 className='rainbow-lr section_heading'>
                        SIGNUP
                    </h3> */}
                    <h3 className='section_heading rainbow-lr '>
                        Create a new account
                    </h3>
                </Row>


                <Row className="section_content">
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                    {this.state.display_first? this.renderForm():this.renderAccountIntegrator()}
                                    
                                </CardText>
                            </CardBody>
                        </Card>
                        
                    </Col>
                </Row>
                
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth:state.auth
    })

}


export default connect(mapStateToProps, {handleSignUp})(SignUp);
