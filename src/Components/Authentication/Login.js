import React, { Component } from 'react'
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Lock from '../../assets/images/lock.jpg';
import './styles.css'

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
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                [name]: value
            },
        }), ()=>{
            this.props.handleAddressChange(this.state.address);
        });
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
                                            <h4 className="main_heading__form">Welcome Back, </h4>
                                            <h4 className="main_heading_secondary"> Please login to continue</h4>

                                        </Row>
                                        <Row className="form_input_row form_grp">
                                            <Form.Group controlId="formBasicEmail">
                                                {/* <Form.Label className="form_input_label">Email address</Form.Label> */}
                                                <input name="email" className="form_input_field form-control" type="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
                                            </Form.Group>
                                        </Row>

                                        <Row className="form_input_row form_grp">
                                            <Form.Group controlId="formBasicPassword">
                                                {/* <Form.Label className="form_input_label">Password</Form.Label> */}
                                                <input name="password" className="form_input_field form-control" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                                                <div className="invalid__feedback">{}</div>
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
export default LoginForm;