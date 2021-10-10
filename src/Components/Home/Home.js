import React, { Component } from 'react'
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
                            <Image src={Buy_sell} alt = "buying ans selling image"  className="section__side__image section__image--left"/>
                        </Col>
                        <Col sm={12} md={6} className="text_col">
                        <div className="section__heading--main">
                            <h3 className="rainbow-lr">
                                Buy &amp; Sell assets
                            </h3>
                        </div>
                    
                        <div className="section__content">
                            <p> 
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 
                            1500s, when an unknown printer took a galley of type and scrambled it to 
                            make a type specimen book. It has survived not only five centuries, but also
                             the leap into electronic typesetting, remaining essentially unchanged. 
                             It was popularised in the 1960s with the release of Letraset sheets 
                             containing Lorem Ipsum passages, and more recently with desktop 
                             publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </p>    
                        </div>

                        <div className='btn__section'>
                            <Button className='new-item-card-button'>
                                Explore Items
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
                                Take part in Auctions
                            </h3>
                        </div>
                    
                        <div className="section__content">
                            <p> 
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 
                            1500s, when an unknown printer took a galley of type and scrambled it to 
                            make a type specimen book. It has survived not only five centuries, but also
                             the leap into electronic typesetting, remaining essentially unchanged. 
                             It was popularised in the 1960s with the release of Letraset sheets 
                             containing Lorem Ipsum passages, and more recently with desktop 
                             publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </p>    
                        </div>
                        
                        <div className='btn__section'>
                            <Button className='new-item-card-button'>
                                Explore Auctions
                            </Button>            
                        </div>

                        </Col>
                        <Col sm={12} md={6} className="image_col">
                            <Image src={Auction_img} alt = "auction-image"  className="section__side__image"/>
                        </Col>
                    </Row>
                    </section>


                    <section className="new__section">
                    <Row>
                        <Col sm={12} md={6} className="image_col">
                            <Image src={NFT_Img} alt = "nft-image"  className="section__side__image section__image--left"/>
                        </Col>
                        <Col sm={12} md={6} className="text_col">
                        <div className="section__heading--main">
                            <h3 className="rainbow-lr">
                                Trade with NFT's
                            </h3>
                        </div>
                    
                        <div className="section__content">
                            <p> 
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 
                            1500s, when an unknown printer took a galley of type and scrambled it to 
                            make a type specimen book. It has survived not only five centuries, but also
                             the leap into electronic typesetting, remaining essentially unchanged. 
                             It was popularised in the 1960s with the release of Letraset sheets 
                             containing Lorem Ipsum passages, and more recently with desktop 
                             publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </p>    
                        </div>

                        <div className='btn__section'>
                            <Button className='new-item-card-button'>
                                Explore NFT's
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
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 
                            1500s, when an unknown printer took a galley of type and scrambled it to 
                            make a type specimen book. It has survived not only five centuries, but also
                             the leap into electronic typesetting, remaining essentially unchanged. 
                             It was popularised in the 1960s with the release of Letraset sheets 
                             containing Lorem Ipsum passages, and more recently with desktop 
                             publishing software like Aldus PageMaker including versions of Lorem Ipsum
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