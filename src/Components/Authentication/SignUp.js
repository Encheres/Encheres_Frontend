import React, { Component } from 'react'
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import Form from 'react-bootstrap/Form';
import AddressForm from './AddressForm'
import './styles.css'

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
            stateList:[],
            cityList:[],
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

    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.address);
    }
    
    render() {
        return (
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
                                    <Form>
                                        <Row className="form_input_row">
                                            <Col md={6} className="form_grp">
                                            <Form.Group controlId="formBasicName">
                                                {/* <Form.Label className="form_input_label">Name</Form.Label> */}
                                                <input name="name" className="form_input_field form-control" type="text" value={this.state.name} placeholder="Name" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                            </Form.Group>  
                                            </Col>
                                            
                                            
                                            <Col md={6} className="form_grp">
                                            <Form.Group controlId="formBasicAnonymousName">
                                                {/* <Form.Label className="form_input_label">Anonymous Name</Form.Label> */}
                                                <input name="anonymous_name" className="form_input_field form-control" type="text" value={this.state.anonymous_name} placeholder="Anonymous Name" onChange={this.handleInputChange} />
                                                <Form.Text className="text-muted">
                                                   Your this  name will be displayed to other users, while participating in auction.
                                                </Form.Text>
                                                <div className="invalid__feedback">{}</div>
                                            </Form.Group>
                                            </Col>
                                            
                                        </Row>
                                        
                                        <Row className="form_input_row">
                                            <Col md={6} className="form_grp">
                                            <Form.Group controlId="formBasicEmail">
                                                {/* <Form.Label className="form_input_label">Email address</Form.Label> */}
                                                <input name="email" className="form_input_field form-control" type="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>
                                            </Col>

                                            <Col md={6} className="form_grp">
                                            <Form.Group controlId="formBasicPassword">
                                                {/* <Form.Label className="form_input_label">Password</Form.Label> */}
                                                <input name="password" className="form_input_field form-control" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                                <Form.Text className="text-muted">
                                                    Password must be at least 6 characters long.
                                                </Form.Text>
                                            </Form.Group>  
                                            </Col>
                                        </Row>

                                        <AddressForm address={this.state.address} handleAddressChange = {this.handleAddressChange} errors = {this.state.errors.address}/>

                                        
                                        <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.handleSubmit}>
                                            Submit
                                        </Button>
                                        
                                    </Form>
                                </CardText>
                            </CardBody>
                        </Card>
                        
                    </Col>
                </Row>
                
            </Container>
        )
    }
}


export default SignUp
