import React, { Component } from 'react'
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import Form from 'react-bootstrap/Form';
// import AddressForm from './AddressForm'
import './styles.css'

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            username:"",
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
                username:"",
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
    componentDidMount() {
        document.body.style.backgroundColor = "#03091F"
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
                    <h3 className='rainbow-lr section_heading'>
                        SIGNUP
                    </h3>
                    <h3 className='section_heading--secondary'>
                        Create a new account
                    </h3>
                </Row>


                <Row>
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                    <Form>
                                        <Row className="form_input_row">
                                            <Col md={6}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label className="form_input_label">Name</Form.Label>
                                                <input name="name" className="form_input_field form-control" type="text" value={this.state.name} placeholder="Enter Name" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                            </Form.Group>  
                                            </Col>
                                            
                                            
                                            <Col md={6}>
                                            <Form.Group controlId="formBasicUserName">
                                                <Form.Label className="form_input_label">UserName</Form.Label>
                                                <input name="username" className="form_input_field form-control" type="text" value={this.state.username} placeholder="Enter Username" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                            </Form.Group>
                                            </Col>
                                            
                                        </Row>
                                        
                                        <Row className="form_input_row">
                                            <Col md={6}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label className="form_input_label">Email address</Form.Label>
                                                <input name="email" className="form_input_field form-control" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                                <Form.Text className="text-muted">
                                                    We'll never share your email with anyone else.
                                                </Form.Text>
                                            </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label className="form_input_label">Password</Form.Label>
                                                <input name="password" className="form_input_field form-control" type="password" value={this.state.password} placeholder="Password must be at least 6 characters" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                                <Form.Text className="text-muted">
                                                    Password must be at least 6 characters
                                                </Form.Text>
                                            </Form.Group>  
                                            </Col>
                                        </Row>

                                        {/* <AddressForm address={this.state.address} handleAddressChange = {this.handleAddressChange} errors = {this.state.errors.address}/> */}

                                        
                                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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
