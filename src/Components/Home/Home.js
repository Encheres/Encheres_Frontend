import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col} from "reactstrap";
import { Image } from 'react-bootstrap';
import MainHeaderBackground from '../../assets/images/main_header_bg.jpg';
import NFT_Img from '../../assets/images/nft.jpg'
import Auction_img from '../../assets/images/auction.jpg'
import Blockchain_img from '../../assets/images/blockchain_secure.jpg'
import Buy_sell from '../../assets/images/sales.jpg'
import './home.css'

class Home extends Component{
    render(){
        return(
            <React.Fragment>
                <section className="hero_section_home">
                    <Row className="hero_section_row">
                        <Col sm={12} md={8}>
                        <div className="hero_section_text">
                            <h3 className=" title_heading--minor rainbow-lr">
                                Bring auction to your home
                            </h3>
                            <br/>
                            <h1 className="title_heading--main">
                                Trade at Best marketplace
                            </h1>

                            <br/><br/>
                            <h4 className="title_heading--helper">
                                Now trading with NFT's, and  physical assets become much more easier and secure.
                                <br/>
                                Now sell and buy assets, conduct auctions, from the comfort of your home.
                                <br/><br/>
                                We use blockchain technology to ensure the security of your assets.

                            </h4>
                        </div>    
                        </Col>
                        
                        <Col sm={0} md={4}>
                            <div className="hero_section_side_img">
                            <Image src={MainHeaderBackground} alt = "image" fluid />
                            </div>
                        </Col>
                    </Row>
                    <div className="hero_section_home_overlay"></div>
                </section>

                <Container>

                <section className="new__section">
                    <Row>
                        <Col sm={12} md={6} className="image_col">
                            <Image src={NFT_Img} alt = "nft-image"  className="section__side__image section__image--left"/>
                        </Col>
                        <Col sm={12} md={6} className="text_col">
                        <div className="section__heading--main">
                            <h3 className="rainbow-lr">
                                Create &amp; Trade NFT's
                            </h3>
                        </div>
                    
                        <div className="section__content">
                            <p> 
                            NFT (Non Fungible tokens) are unique digital assets whose ownership is completely yours.
                            No third party to intervene. You can now create these NFT's at our Market places
                            and can then also put them on auction. Our Platform uses ERC-721 standards to mint NFT's 
                            and Ethereum Blockchain network to store them.
                            </p>    
                        </div>

                        <div className='btn__section'>
                            <Button className='new-item-card-button'>
                                <Link style={{color: 'white', textDecoration: 'none'}} to='/view/independent-digital-assets'>
                                    Explore NFT's
                                </Link>
                            </Button>            
                        </div>

                        </Col>
                    </Row>
                </section>

                <section className="new__section">
                    <Row>
                        <Col sm={12} md={6} className="text_col">
                        <div className="section__heading--main">
                            <h3 className="rainbow-lr">
                                Buy &amp; Sell assets
                            </h3>
                        </div>
                    
                        <div className="section__content">
                            <p> 
                            Have you ever thought of a marketplace where you get access to trade both physical
                            and digital assets at one place! Then you are at the right place. Here you can buy and 
                            sell assets both physical and digital with wide variety of categorization. The best part
                            is here you can trade assets at fixed price or allow bids to get profted from compeition of bidders. 
                            </p>    
                        </div>

                        <div className='btn__section'>
                            <Button className='new-item-card-button'>
                                <Link style={{color: 'white', textDecoration: 'none'}} 
                                    to='/view/independent-physical-assets'>
                                    Explore Assets 
                                </Link>
                            </Button>            
                        </div>
                        </Col>
                        <Col sm={12} md={6} className="image_col">
                            <Image src={Buy_sell} alt = "buying ans selling image"  className="section__side__image section__image--left"/>
                        </Col>
                    </Row>
                    </section>

                    <section className="new__section">
                    <Row>
                        <Col sm={12} md={6} className="image_col">
                            <Image src={Auction_img} alt = "auction-image"  className="section__side__image"/>
                        </Col>
                        <Col sm={12} md={6} className="text_col">
                        <div className="section__heading--main">
                            <h3 className="rainbow-lr">
                                Take part in Live Auctions
                            </h3>
                        </div>
                    
                        <div className="section__content">
                            <p> 
                            Are you the ones who loves to take part in live auctions a lot but can't get time 
                            out from your busy schedules and have thought of getting a means to take part in auctions from home
                            by any chnace ? or are you the auctioneer who wants to get advantage from wide variety 
                            of competitive bidders reagardless of geographical limitations ? Then we've got you covered. 
                            </p>    
                        </div>
                        
                        <div className='btn__section'>
                            <Button className='new-item-card-button'>
                                <Link style={{color: 'white', textDecoration: 'none'}} 
                                    to='/view/auctions'>
                                    Explore Live Auctions
                                </Link>
                            </Button>            
                        </div>

                        </Col>
                    </Row>
                    </section>

                    <section className="new__section">
                    <Row>
                        <Col sm={12} md={6} className="text_col">
                        <div className="section__heading--main">
                            <h3 className="rainbow-lr">
                                Your Security, Our Priority
                            </h3>
                        </div>
                    
                        <div className="section__content">
                            <p> 
                            For creation and storage of digital assets we use Blockchain network. This provides 
                            excellent security and unhackable marketplace. The payment gateways for 
                            both digital and physical assets also take place on Blockchain to add another 
                            layer of great security.
                            </p>    
                        </div>
                        </Col>
                        <Col sm={12} md={6} className="image_col">
                            <Image src={Blockchain_img} alt = "blockchain-security"  className="section__side__image"/>
                        </Col>
                    </Row>
                    </section>

                </Container>

            
            </React.Fragment>
        )
    }
}
export default Home;