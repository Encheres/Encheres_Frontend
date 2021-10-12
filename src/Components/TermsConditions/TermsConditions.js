import React, { Component } from 'react'
import {Card, CardText, CardBody, Container, Row, Col} from "reactstrap";
import '../Authentication/styles.css'
import './terms_conditions.css'


class TermsConditions extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <Container>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Terms &amp; Conditions
                    </h3>
                </Row>
                <Row className="section_content">
                    
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                <Row>
                                    <h4 className="main_heading_secondary heading__blue">By using Encheres, you agree to our following terms and conditions:</h4>
                                    <div>
                                        <div className='condition_block'>
                                            <span className='condition_number'>01</span>
                                            <span className='condition_text'>
                                            Purpose:  The purpose of these specifications is to require the furnishing and delivery of the highest quality products and services in accordance with the specifications.  These documents, and any subsequent addenda, constitute the complete set of specification requirements and bid response forms. 
                                            </span>
                                        </div>

                                        <div className='condition_block'>
                                            <span className='condition_number'>02</span>
                                            <span className='condition_text'>
                                            Taxes:  The contractor shall assume and pay all taxes and contributions including, but not limited to, State, Federal, and Municipal which are payable by virtue of the furnishing and delivery of the items specified.  Materials and services supplied by the College are not subject to sales tax and may be waived for the accepted contractor.
                                            </span>
                                        </div>

                                        <div className='condition_block'>
                                            <span className='condition_number'>03</span>
                                            <span className='condition_text'>
                                                Sample
                                            </span>
                                        </div>

                                        <div className='condition_block'>
                                            <span className='condition_number'>04</span>
                                            <span className='condition_text'>
                                                Sample
                                            </span>
                                        </div>

                                        <div className='condition_block'>
                                            <span className='condition_number'>05</span>
                                            <span className='condition_text'>
                                                Sample
                                            </span>
                                        </div>
                                        
                                    </div>
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


export default TermsConditions;