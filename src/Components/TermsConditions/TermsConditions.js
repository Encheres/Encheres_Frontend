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
                                    <br/>
                                    <div>
                                        <div className='condition_block'>
                                        <h3 className='section_heading rainbow-lr'>Important:</h3>
                                        <span>These terms and conditions apply to all online bidding at auction sales conducted by or in conjunction with Encheres. n y registering to participate in an Encheres auction sale via online bidding, you expressly agree to these terms and conditions.
                                        These terms and conditions are supplemental, meaning that they shall apply ito the general conditions of sale and other terms and conditions applicable to bidders and buyers participating in the subject sale (collectively, the “Bid Conditions”) and shall be deemed incorporated by reference and made a part of the bid conditions for such sale the general bid conditions are published on our website. Additional information will also be published on the website regarding any sales. Please be aware that announcements affecting sales may also be made on the website because it is purely a web-based service. In registering to bid at any sale, you agree to the applicable Bid Conditions.
                                        In Addition, some legal clauses will also be applicable in some scenarios.
                                        </span>
                                        <br/>

                                        </div>
                                        <div className='condition_block'>
                                        <h3 className='section_heading rainbow-lr'>Eligibility:</h3>
                                        <span>Our services are available only to individuals who can enter into legally binding contracts under the applicable law of their respective countries. Without limiting the foregoing, our services are not available to minors. If you are a minor, you may use our services only in conjunction with your parent or guardian. If you do not qualify, do not use our services. Further, your account and User ID may not be transferred or sold to another party. If you are registering as a business entity, you represent that you have the authority to bind each entity to this Agreement.
                                            Each AH (Account Holder) that conducts a live or timed auction will have its own eligibility requirements that must be met in order for you to participate in that must be met in order for you to participate in that auction. You are required to have metamask integration to your account at all times and in the case of digital assets, you need to have the amount bided in your wallet as the process requires deducting and reissuing of the money transferred. You agree to maintain at all times the accuracy of your account information including contact information, addresses, and metamask wallet information, and to allow us to provide any of your account information to AHs whenever necessary, including for participating in auctions. Approval to participate in one live or timed auction does not guarantee approval to participate in any other live or timed auction, conducted either by that AH, or by another AH. Each AH has sole discretion to refuse to approve your eligibility for any live or timed auction.
                                            For sellers and DCs (Digital Creators), it is required that they share all the information asked during the creation of an auction, failing to provide such will result in that item not being listed in any of the categories available in the web app. Sellers and DCs are required to be completely honest and responsible for the transfer of ownership after the sale of an item, failing to do so will make you liable for legal action under our terms of service.

                                        </span>
                                        
                                        </div>
                                        <div className='condition_block'>
                                            <h3 className='section_heading rainbow-lr'>Registration And Sale:</h3>
                                            <span>
                                                <div className='condition_number'>01 Registration:</div>
                                                                                            1.1. Before you can participate in any Online Auctions, you must first be registered to bid online and also fall under the eligibility criteria stated above. The registration or SignUp page can be accessed from the top right corner of Encheres Web-app. During the registration process, you’ll be asked to integrate your metamask wallet (if already activated) to your account as all the transactions will be undergone through blockchain services, if not activated click here to activate your metamask wallet and continue after that.
                                                                                            1.2. Once you have registered you must keep your account details strictly confidential and you must not permit any third party to use or access your account on your behalf or otherwise. You will be liable for all the transactions or bids made through your account, Encheres will not be held accountable for any mishappenings that may occur to your assets in such a scenario.
                                                <div className='condition_number'>02 Online Bidding Process:</div>
                                                                                            2.1. Once you have made an account you can participate in all types of available actions listed on our catalog.
                                                                                            2.2. Bidding process for non-digital goods will be done the same as an auction house which will give you a window timer before the sale goes to the highest bidder. 
                                                                                            2.3. During timed auction events the item will be listed on our catalog with the time remaining and the highest bid, through which you can decide whether to bid on a particular item at a particular time.
                                                                                            2.4. For bidding on Digital Items you need to keep in mind that the money will be deducted from your wallet once you place a bid both in live and timed action. So before placing a bid you are required to keep enough funds in your metamask wallet.
                                                                                            2.5. You acknowledge that you are bidding in an auction (Live or Timed) and you agree that each bid submitted as provided in these terms and conditions is irrevocable and cannot be amended or corrected even if submitted in error and notified to us. You accept full liability to pay in full and on time in accordance with the Bid Conditions for any lot that is the object of a successful bid submitted from your account.
                                                                                            2.6. Please note that Encheres reserves the right to reject a registration to bid online, withdraw its permission for you to use its services, or terminate any account, for any reason at any time prior to, during, or after a sale.

                                            </span>
                                        </div>
                                        
                                        

                                    </div>
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
                                                
                                            </span>
                                        </div>

                                        <div className='condition_block'>
                                            <span className='condition_number'>04</span>
                                            <span className='condition_text'>
                                                
                                            </span>
                                        </div>

                                        <div className='condition_block'>
                                            <span className='condition_number'>05</span>
                                            <span className='condition_text'>
                                                
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