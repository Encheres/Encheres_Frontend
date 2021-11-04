import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import { Image } from 'react-bootstrap';
import {handleSignOut} from '../../apis_redux/actions/auth.js'
import LogoutImg from '../../assets/images/logout.jpg'
import './styles.css'


class Logout extends Component{
    componentDidMount(){
        if(this.props.auth.isSignedIn){
            this.props.handleSignOut(this.props.auth);
        }else{
            this.props.history.push('/')
        }
    }

    handleLoginRedirect = e =>{
        e.preventDefault();
        this.props.history.push('/login');
    }


    render(){
        return(
            <Container>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Logout
                    </h3>
                </Row>

                <Row className="section_content">
                    
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                <Row>
                                    <Col lg={6}>
                                        <Image src={LogoutImg} className="login_image" alt="lock image" fluid/>
                                    </Col>
                                    <Col lg={6}>
                                    
                                        <Row>
                                            <h4 className="main_heading__form light__blue"> Thanks for using our website </h4>
                                        </Row>
                                        <div>
                                            <p className='form__text--para'>You have been logged out, and you can login again by using the following button:</p>
                                            <br/>
                                            <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.handleLoginRedirect}>
                                                Login
                                            </Button>
                                        </div>
                                        
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
}
const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        auth:state.auth
    }
}

export default connect(mapStateToProps,{handleSignOut})(Logout);