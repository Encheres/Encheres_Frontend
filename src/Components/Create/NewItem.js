import React, {Component} from 'react';
import '../Create/NewItem.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Badge, Row, Image} from 'react-bootstrap';
import {Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Breadcrumb, BreadcrumbItem, ButtonGroup} from "reactstrap";
import Form from 'react-bootstrap/Form';
import {FaPalette, FaMusic, FaFootballBall, 
    FaWallet, FaCopy, FaLinkedin, 
    FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';
import {GrDomain } from 'react-icons/gr';
import {GiCardRandom, GiBearFace} from 'react-icons/gi';
import { BiWorld } from "react-icons/bi";
import {Link} from 'react-router-dom'
import bgImg from '../../assets/images/dark-header.png'
import preview from '../../assets/images/preview-piece.jfif'

class NewItem extends Component {

    constructor(props){
        super(props);
        this.state={
            username: 'ultimate_creater',
            copied: 'false'
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#03091F"
    }

    render(){        
        return(
            <div className='container-fluid'>
                <div className='row justify-content-center new-item-card-row'>
                    <h3 className='rainbow-lr col-12' style={{textAlign: 'center'}}>CREATE INDEPENDENT ITEM</h3>
                    <div className='col-11 col-lg-7'>
                        <Card className='new-item-card'>
                            <CardBody>
                            <CardSubtitle tag="h6" className="mt-4 new-item-card-subtitle">
                                UPLOAD ITEM FILE
                            </CardSubtitle>
                            <div className='new-item-dropbox'>
                                <CardText className='new-item-card-text'>
                                    PNG, GIF, WEBP, MP4 or MP3. Max 100mb
                                </CardText>
                                <div className='new-item-card-button-div'>
                                <Button className='new-item-card-button'>
                                    UPLOAD FILE
                                </Button>
                                </div>
                            </div> 
                            </CardBody>
                            <CardBody> 
                                <CardText className='new-item-card-text'>
                                    Select Item Categories
                                </CardText>
                                <div>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><FaPalette/></span> Art
                                    </Badge>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><FaMusic/></span> Music
                                    </Badge>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><GrDomain/></span> Domain Names
                                    </Badge>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><BiWorld/></span> Virtual Worlds
                                    </Badge>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><GiCardRandom/></span> Trading Cards
                                    </Badge>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><GiBearFace/></span> Collectibles
                                    </Badge>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><FaFootballBall/></span> Sports
                                    </Badge>
                                    <Badge className='new-item-badge' pill bg="light" text="dark">
                                        <span><FaWallet/></span> Utility
                                    </Badge>
                                </div>
                                <Form className='mt-3'>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" 
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                }}
                                            placeholder="Item Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control 
                                            as="textarea"
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                }}
                                            className='new-item-form-field' 
                                            placeholder='Description'
                                            rows={4} />
                                    </Form.Group>
                                    <div className='row'>
                                    <div className='col-6'>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" 
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                }}
                                            placeholder="Item Price in ETH" />
                                    </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" 
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                }}
                                            placeholder="Royality" />
                                    </Form.Group>
                                    </div>
                                    </div>
                                    <div className='row'>
                                    <div className='col-6'>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" 
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                }}
                                            placeholder="Size" />
                                    </Form.Group>
                                    </div>
                                    <div key={`inline-checkbox`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Put On Auction"
                                            name="group1"
                                            type={"checkbox"}
                                            id={`inline-checkbox-1`}
                                            style={{color: 'grey'}}
                                        />
                                        <Form.Check
                                            inline
                                            label="Instant Sale Price"
                                            name="group1"
                                            type={"checkbox"}
                                            id={`inline-checkbox-2`}
                                            style={{color: 'grey'}}
                                        />
                                    </div>
                                    </div>
                                    <div className='new-item-card-button-div'>
                                        <Button className='new-item-card-button'>
                                            PREVIEW
                                        </Button>
                                        {" "}
                                        <Button className='new-item-card-button'>
                                            CREATE ITEM
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-11 col-lg-3'>
                        <Card className='new-item-card'>
                            <span className='mb-3' style={{marginLeft: 25, color: 'cyan'}}>
                                10Ds 08Hs 37Ms 05Ss
                            </span>
                            <Image className='new-item-image' src={preview} rounded />
                            <CardBody>
                                <CardSubtitle tag="h5" className="mt-3 mb-3 new-item-card-subtitle" 
                                    id='new-item-card-username'>
                                    Deslajd ed d
                                </CardSubtitle>
                                <CardText id='new-item-card-info' className='mb-4'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                </CardText>
                                <div>
                                <Badge className='new-item-badge' pill bg="light" text="dark">
                                    <span><FaPalette/></span> Art
                                </Badge>
                                <Badge className='new-item-badge' pill bg="light" text="dark">
                                    <span><GiBearFace/></span> Collectibles
                                </Badge>
                                </div>
                                <div>
                                    <CardSubtitle tag="h6" className='new-item-preview-price'>
                                        Price{"  "}<span style={{marginLeft: 10, color: 'cyan'}}>10 ETH</span>
                                    </CardSubtitle>
                                    <CardSubtitle tag="h6" className='new-item-preview-price'>
                                        Royality{"  "}<span style={{marginLeft: 10, color: 'cyan'}}>5%</span>
                                    </CardSubtitle>
                                    <CardSubtitle tag="h6" className='new-item-preview-price'>
                                        Size{"  "}<span style={{marginLeft: 10, color: 'cyan'}}>10 Mb</span>
                                    </CardSubtitle>
                                </div>
                                <div className='new-item-accountbox'>
                                    <CardText id='new-item-card-account'>
                                        @{this.state.username}
                                    </CardText>
                                </div>
                                <div className='row justify-content-center mt-4'>
                                <ButtonGroup size="md">
                                    <Button className='new-item-card-social'><FaLinkedin/></Button>
                                    <Button className='new-item-card-social'><FaFacebook/></Button>
                                    <Button className='new-item-card-social'><FaTwitter/></Button>
                                    <Button className='new-item-card-social'><FaInstagram/></Button>
                                </ButtonGroup>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewItem;