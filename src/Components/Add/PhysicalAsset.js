import React, {Component} from 'react';
import AddressForm from '../FrequentComponents/AddressForm';
import {Link} from 'react-router-dom';
import {renderPhysicalAssetCategories} from '../FrequentComponents/Asset'
import * as ipfsClient  from 'ipfs-http-client';
import moment from 'moment';
import Switch from "react-switch";
import Datetime from 'react-datetime';
import {Badge, Image} from 'react-bootstrap';
import {Card, CardText, CardBody, 
    CardSubtitle, Button, ButtonGroup,
    Modal, ModalHeader, ModalBody, ModalFooter, Alert} from "reactstrap";
import Form from 'react-bootstrap/Form';
import {FaPalette, FaFootballBall, FaCarSide,
    FaWallet, FaBuilding} from 'react-icons/fa';
import {GiBearFace, GiClockwork, 
    GiVendingMachine, GiSofa, GiClothes, GiWatch} from 'react-icons/gi';
import preview from "../../assets/images/nft.jpg";
import "./Add.css";
import "../Authentication/styles.css"

//Declare IPFS
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class PhysicalAsset extends Component {

    constructor(props){
        super(props);
        this.state={

            assetImagesHash: [],
            assetVideoHash: "",
            name: "",
            quantity: 1,
            description: "",
            price: 0.0000,
            contact: 0,
            categories: [],
            createrUsername: "john_bill123",

            errors: {
                name: "",
                quantity: "",
                description: "",
                price: "",
                contact: "",
                categories: "",
                dateTime: "",
                onSale: ""
            },

            dateTimeModal: false,
            onSale: false,
            bids: false,
            startDateTime: "",
            endDateTime: "",

            assetFileUploading: false,
            success: false,
            fail: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onSuccessDismiss(){
        this.setState({
            success: !this.state.success
        })
    }

    onFailDismiss(){
        this.setState({
            fail: !this.state.fail
        })
    }

    async createItem() {
        
        if(this.formValidattion()){
            console.log(this.state);

            // await this.uploadAssetFile()
            // this.onSuccessDismiss()

            // setTimeout(() => {
            //     this.onSuccessDismiss()
            // }, 10000);
        }
    }

    formValidattion() {

        const {name, quantity, description, price, contact, categories, onSale} = this.state;
        let nameError = "", quantityError = "", descriptionError = "", priceError = "", royalityError = "",
        contactError = "", categoriesError = "", saleError = "", error;

        if(!onSale){
            saleError="Date Time is Required for sale";
            error = true;
        }

        if(!name.trim()){
            nameError='Name is required';
            error = true;
        }

        if(quantity <= 0){
            quantityError="Quantity Should be 1 or more";
            error = true;
        }

        if(!description.trim() || !description.trim().length){
            descriptionError="Description is required";
            error = true;
        }

        if(!price || isNaN(price) || price<0){
            priceError="Price must be positive number";
            error = true;
        }

        var temp = contact.toString();

        if(!temp.trim() || temp.length != 10){
            contactError="Invalid Contact Number";
            error = true;
        }

        if(!categories.length){
            categoriesError='Your item must have one of the categories';
            error = true;
        }

        this.setState(prevState => ({
            errors:{
                name:nameError,
                description: descriptionError,
                categories:categoriesError,
                price: priceError,
                quantity: quantityError,
                contactNumber: contactError,
                royality: royalityError,
                onSale: saleError
            }
        }))
        
        return !error;
    }

    dateValidate(current){
        var yesterday = moment().subtract(1, 'day');

        return current.isAfter( yesterday );
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
      }

    addCategory(name){
        var cat = this.state.categories;
        var ind = cat.indexOf(name);

        if(ind >= 0)
            cat.splice(ind, 1);
        else 
            cat.push(name);

        this.setState({
            categories: cat
        })

        console.log(this.state.categories);
    }

    onFileChange = (e) => {

        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend = () => {
        this.setState({ buffer: Buffer(reader.result) })
        console.log('buffer', this.state.buffer)
        }

        console.log("Submitting file to ipfs...")
    };

    async uploadAssetFile(){
        try {
            
            this.setState({
                assetFileUploading: true
            })

            const file = await ipfs.add(this.state.buffer)
            this.setState({
                assetFileHash: file.path,
                assetFileSize: (file.size/1000),
                assetFileUploading: false
            })

            console.log(file.path)

        } catch (error) {

            this.onFailDismiss();
            setTimeout(() => {
                this.onFailDismiss()
            }, 10000);

        }

        //https://ipfs.infura.io/ipfs/<hash>
    }
    
    handleCheckChange() {
        this.setState({
            bids : !this.state.bids
        });
    }

    onStartDateTimeChange(){
        this.setState({
            startDateTime: this.state.startDateTime
        })
    }

    onEndDateTimeChange(){
        this.setState({
            endDateTime: this.state.endDateTime
        })
    }


    render(){        
        return(
            <div className='container-fluid'>
                <div className='row justify-content-center' id='new-item-card-row'>
                    <h3 className='col-12 rainbow-lr new-item-heading'>
                        ADD INDEPENDENT ASSET
                    </h3>
                    <div className='new-item-card-button-div mt-4'>
                        <Button 
                            className='new-item-card-button'>
                            <Link style={{color: 'white', textDecoration: 'none'}} to='/create/independent-digital-assets'>
                                DIGITAL (NFT) 
                            </Link>
                        </Button>
                        {" "}
                        <Button 
                            disabled
                            className='new-item-card-button'>
                            PHYSICAL
                        </Button>
                    </div>
                    <div className='col-11 col-sm-8 col-md-7 col-lg-7'>
                        <Card id='new-item-card'>
                            <CardBody>
                            <CardSubtitle tag="h6" className="new-item-card-subtitle">
                                UPLOAD ASSET SHOWCASE IMAGES (MULTIPLE)
                            </CardSubtitle>
                            <div className='new-item-dropbox'>
                                <CardText className='new-item-card-text'>
                                    PNG, JPEG, WEBP, MP4 or MP3. Max 5mb
                                </CardText>
                                <div className='new-item-card-button-div'>
                                    <input 
                                        type="file"
                                        onChange={this.onFileChange}
                                        className='new-item-card-button'
                                    />
                                </div>
                            </div> 
                            </CardBody>
                            <CardBody>
                            <CardSubtitle tag="h6" className="new-item-card-subtitle">
                                UPLOAD ASSET SHOWCASE VIDEO (SINGLE)
                            </CardSubtitle>
                            <div className='new-item-dropbox'>
                                <CardText className='new-item-card-text'>
                                    MP4 or MP3. Max 20mb
                                </CardText>
                                <div className='new-item-card-button-div'>
                                    <input 
                                        type="file"
                                        onChange={this.onFileChange}
                                        className='new-item-card-button'
                                    />
                                </div>
                            </div> 
                            </CardBody>
                            <CardBody> 
                                <CardText className='new-item-card-text'>
                                    Select Asset Categories
                                </CardText>
                                <div>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Art")}
                                        bg={this.state.categories.indexOf("Art")>=0 ? "secondary": "light"}
                                    >
                                        <span><FaPalette/></span> Art
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Antiques")}
                                        bg={this.state.categories.indexOf("Antiques")>=0 ? "secondary": "light"}
                                    >
                                        <span><GiClockwork/></span> Antiques
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Electronics")}
                                        bg={this.state.categories.indexOf("Electronics")>=0 ? "secondary": "light"}
                                    >
                                        <span><GiVendingMachine/></span> Electronics
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Vehicles")} 
                                        bg={this.state.categories.indexOf("Vehicles")>=0 ? "secondary": "light"}                             
                                    >
                                        <span><FaCarSide/></span> Vehicles
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Households")}  
                                        bg={this.state.categories.indexOf("Households")>=0 ? "secondary": "light"}                                                      
                                    >
                                        <span><GiSofa/></span> Households
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Collectibles")} 
                                        bg={this.state.categories.indexOf("Collectibles")>=0 ? "secondary": "light"}                                                       
                                    >
                                        <span><GiBearFace/></span> Collectibles
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Sports")} 
                                        bg={this.state.categories.indexOf("Sports")>=0 ? "secondary": "light"}                                                       
                                    >
                                        <span><FaFootballBall/></span> Sports
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Fashion")}  
                                        bg={this.state.categories.indexOf("Fashion")>=0 ? "secondary": "light"}                                                      
                                    >
                                        <span><GiClothes/></span> Fashion
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Mini Items")}    
                                        bg={this.state.categories.indexOf("Mini Items")>=0 ? "secondary": "light"}                                                    
                                    >
                                        <span><GiWatch/></span> Mini Items
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Real Estate")}    
                                        bg={this.state.categories.indexOf("Real Estate")>=0 ? "secondary": "light"}                                                    
                                    >
                                        <span><FaBuilding/></span> Real Estate
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Miscellaneous")}    
                                        bg={this.state.categories.indexOf("Miscellaneous")>=0 ? "secondary": "light"}                                                    
                                    >
                                        <span><FaWallet/></span> Miscellaneous
                                    </Badge>
                                    <div className='mb-4' id='new-item-form-error'>{this.state.errors.categories}</div>
                                </div>
                                <Form className='mt-3'>
                                    <div className='row'>
                                        <Form.Group className="col-5 mb-3" controlId="itemName">
                                            <Form.Control
                                                name='name'
                                                onChange={this.handleInputChange}
                                                className='new-item-form-field' 
                                                style={{backgroundColor: '#03091F', 
                                                    borderWidth: 0,
                                                    color: 'white'
                                                    }}
                                                placeholder="Item Name" />
                                            <div className='mb-4' id='new-item-form-error'>{this.state.errors.name}</div>
                                        </Form.Group>
                                        <Form.Group className="col-7 mb-3" controlId="itemName">
                                        <Form.Control
                                            type="number"
                                            name='quantity'
                                            onChange={this.handleInputChange}
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                color: 'white'
                                                }}
                                            placeholder="Item Quantity (Count)" />
                                            <div className='mb-4' id='new-item-form-error'>{this.state.errors.quantity}</div>
                                    </Form.Group>
                                    </div>
                                    <Form.Group className="mb-3" controlId="itemDescription">
                                        <Form.Control 
                                            name='description'
                                            onChange={this.handleInputChange}
                                            as="textarea"
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                color: 'white'
                                                }}
                                            className='new-item-form-field' 
                                            placeholder='Description'
                                            rows={4} />
                                        <div className='mb-4' id='new-item-form-error'>{this.state.errors.description}</div>
                                    </Form.Group>
                                    <div className='row'>
                                    <div className='col-12'>
                                    <Form.Group className="mb-3" controlId="itemPrice">
                                        <Form.Control
                                            type='number'
                                            name='price'
                                            onChange={this.handleInputChange}
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                color: 'white'
                                                }}
                                            placeholder="Aggregate-Base/Fix Price in ETH"
                                            />
                                        <div className='mb-4' id='new-item-form-error'>{this.state.errors.price}</div>
                                    </Form.Group>
                                    </div>
                                    <div className='col-12'>
                                    <Form.Group className="mb-3" controlId="itemPrice">
                                        <Form.Control
                                            type='number'
                                            name='contact'
                                            onChange={this.handleInputChange}
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                color: 'white'
                                                }}
                                            placeholder="Contact Number"
                                            />
                                        <div className='mb-4' id='new-item-form-error'>{this.state.errors.contactNumber}</div>
                                    </Form.Group>
                                    </div>
                                    </div>
                                    <div className='row'>
                                        <span style={{marginLeft: 4}} className='mb-4 new-item-switch-label'>
                                            Pickup Point Address
                                        </span>
                                        {/* <AddressForm /> */}
                                    </div>
                                    <div className='mt-4'>
                                        <span className='new-item-switch-label'>
                                            Add Date-Time
                                        </span>
                                        <Switch 
                                            onChange={() => {

                                                if(this.state.onSale){
                                                    this.setState({
                                                        bids: false
                                                    })
                                                }
                                                this.setState({
                                                onSale: !this.state.onSale,
                                                dateTimeModal: true
                                            })
                                        }} 
                                            checked={this.state.onSale}
                                            height={24}
                                            width={50}
                                            offColor='#03091F'
                                            onColor='#00CAFF'
                                            />
                                            <div className='mb-4' id='new-item-form-error'>{this.state.errors.onSale}</div>
                                        <p className='mt-4' id='new-item-form-error'>
                                            {
                                                this.state.onSale && this.state.startDateTime !== "" ? "Start: "+moment(this.state.startDateTime).format('MMMM Do YYYY, h:mm A') : ""
                                            }
                                        </p>
                                        <p id='new-item-form-error'>
                                            {
                                                this.state.onSale && this.state.endDateTime !== "" ? "End: "+moment(this.state.endDateTime).format('MMMM Do YYYY, h:mm A') : ""
                                            }
                                        </p>
                                    </div>
                                    {
                                        this.state.onSale ?
                                        <div>
                                            <div className='mt-4'>
                                            <span className='new-item-switch-label'>
                                                Allow Bids
                                            </span>
                                            <Switch 
                                                onChange={() => this.handleCheckChange()} 
                                                checked={this.state.bids}
                                                height={24}
                                                width={50}
                                                offColor='#03091F'
                                                onColor='#00CAFF'
                                                />
                                            </div>
                                            <div className='mt-4 mb-4'>
                                            <span className='new-item-date-time-label'>
                                                <Modal isOpen={this.state.dateTimeModal}
                                                >
                                                    <ModalHeader
                                                        style={{backgroundColor: '#222242'}}
                                                    >
                                                        <div style={{color: 'grey'}}>
                                                            Enter Date and Time
                                                        </div>
                                                    </ModalHeader>
                                                    <ModalBody
                                                    >
                                                        Start
                                                        <Datetime initialValue={this.state.startDateTime}
                                                            isValidDate={this.dateValidate}
                                                            onChange={(d) => {
                                                                this.setState({
                                                                    startDateTime: d
                                                                })
                                                            }}
                                                            />
                                                        End
                                                        <Datetime initialValue={this.state.endDateTime}
                                                            isValidDate={this.dateValidate}
                                                            onChange={(d) => {
                                                                this.setState({
                                                                    endDateTime: d
                                                                })
                                                            }}
                                                            />
                                                        <div className='mb-4' style={{color: 'red'}}>{this.state.errors.dateTime}</div>
                                                    </ModalBody>
                                                    <ModalFooter 
                                                            style={{backgroundColor: '#222242'}}
                                                    >
                                                        <Button 
                                                            className='fa fa-lg fa-telegram'
                                                            onClick={() => {
                                                                if(moment(this.state.startDateTime).format('MMMM Do YYYY, h:mm A')=='Invalid date'||moment(this.state.endDateTime).format('MMMM Do YYYY, h:mm A')=='Invalid date'){
                                                                    var er = this.state.errors;
                                                                    er.dateTime = "Invalid Date-Time"

                                                                    this.setState({
                                                                        errors: er
                                                                    })
                                                                }
                                                                else if(this.state.startDateTime >= this.state.endDateTime){

                                                                    var er = this.state.errors;
                                                                    er.dateTime = "End Date-time must be greater than Start Date-time"

                                                                    this.setState({
                                                                        errors: er
                                                                    })
                                                                }else{
                                                                    this.setState({
                                                                        dateTimeModal: !this.state.dateTimeModal
                                                                    })
                                                                }
                                                            }}
                                                        >
                                                        </Button>
                                                        <Button 
                                                            className='fa fa-lg fa-times-circle'
                                                            onClick={() => {
                                                                this.setState({
                                                                onSale: !this.state.onSale,
                                                                dateTimeModal: false,
                                                                bids: false,
                                                                startDateTime: "",
                                                                endDateTime: ""
                                                            })
                                                        }}>
                                                        </Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </span>
                                            </div>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                    <div className='mt-4 new-item-card-button-div'>
                                        <Button className='mt-2 new-item-card-button'
                                            disabled={this.state.assetFileUploading}
                                            onClick={() => this.uploadAssetFile()}
                                        >
                                            PREVIEW ASSET FILE
                                        </Button>  
                                        <Button className='mt-2 new-item-card-button'
                                            onClick={() => this.createItem()}
                                        >
                                            CREATE ASSET
                                        </Button>   
                                    </div>
                                </Form>
                            </CardBody>
                            <Alert color="success" isOpen={this.state.success}>
                                Sucess!!
                            </Alert>
                            <Alert color="danger" isOpen={this.state.fail}>
                                Failed!!
                            </Alert>
                        </Card>
                        </div>
                        <div className="col-11 col-sm-8 col-md-4 col-lg-3">
                            <Card id="new-item-card">
                                {/* <Image className="new-item-image" rounded
                                    src={this.state.assetFileHash===""?preview:"https://ipfs.infura.io/ipfs/"+this.state.assetFileHash}
                                /> */}
                            <CardBody>
                                <CardSubtitle
                                tag="h5"
                                className="mt-3 mb-3 new-item-card-subtitle"
                                id="new-item-card-username"
                                >
                                    {this.state.name === "" ? 'Deslajd ed d' : this.state.name}
                                </CardSubtitle>
                                <CardText id="new-item-card-info" className="mb-4">
                                    {   
                                        this.state.description === "" ? 
                                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' :
                                        this.state.description
                                    }
                                </CardText>
                                {
                                    this.state.categories.length === 0 
                                    ?
                                    <div>
                                        <Badge className="new-item-badge" pill bg="light" text="dark">
                                            <span>
                                            <FaPalette />
                                            </span>{" "}
                                            Art
                                        </Badge>
                                        <Badge className="new-item-badge" pill bg="light" text="dark">
                                            <span>
                                            <GiBearFace />
                                            </span>{" "}
                                            Collectibles
                                        </Badge>
                                    </div>
                                    :
                                    <div>
                                        {
                                            renderPhysicalAssetCategories(this.state.categories)
                                        }
                                    </div>
                                }
                                <div>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Price{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {(!this.state.price || this.state.price === 0.0000) ? '0.0000 ETH' : this.state.price+' ETH'}
                                    </span>
                                </CardSubtitle>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Quantity{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {(!this.state.quantity || this.state.quantity === 1) ? '1' : this.state.quantity}
                                    </span>
                                </CardSubtitle>
                                </div>
                                <div className="new-item-accountbox">
                                <CardText id="new-item-card-account">
                                    @{this.state.createrUsername}
                                </CardText>
                                </div>
                            </CardBody>
                            </Card>
                        </div>
                  </div>
                </div>
        );
        }
}

export default PhysicalAsset;
