import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as ipfsClient  from 'ipfs-http-client';
import moment from 'moment';
import Switch from "react-switch";
import Datetime from 'react-datetime';
import {Badge, Image} from 'react-bootstrap';
import {Card, CardText, CardBody, 
    CardSubtitle, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Alert} from "reactstrap";
import Form from 'react-bootstrap/Form';
import {FaPalette} from 'react-icons/fa';
import preview from "../../assets/images/nft.jpg";
import {categoryList} from '../../variables';
import {DisplayBadges} from '../FrequentComponents/Category_Badges';
import AddressForm from '../FrequentComponents/AddressForm';
import {addressValidation} from '../FrequentComponents/AddressForm';
import "./Add.css";

//Declare IPFS
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class LiveAuction extends Component {

    constructor(props){
        super(props);
        this.state={
            // general
            items:[],
            tags:[],
            categories: [],
            organizer:'',
            event_date_time:'',
            address:{
                addressLine1:'',
                addressLine2:'',
                city:'',
                addressState:'',
                country:'',
                postalCode:''
            },
            organizer_contact:'',

            // specific to each item
            name: "",
            description: "",
            base_price: 0.0000,
            assetFileHash: "",
            assetFileSize: 0,
            buffer:'',
            quantity: '',

            errors: {
                assetFile: "",
                name: "",
                description: "",
                price: "",
                categories: "",
                dateTime: "",
                quantity: "",
                organizer_contact: "",
                address:{
                    addressLine1:"",
                    addressLine2:"",
                    city:"",
                    addressState:"",
                    country:"",
                    postalCode:"",
                }
            },
            display_first: true,
            

            createrUsername: "john_bill123",

            onSale: false,
            dateTimeModal: false,
            assetFileUploading: false,
            success: false,
            fail: false,
        }
    }

    /*-----------------------------------------*/
    /*-----------------------------------------*/
    // INPUT HANDLERS

    handleInputChange = (event)=> {
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

    // file uploading
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

    uploadAssetFile = async() =>{
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



    /*-----------------------------------------*/
    /*-----------------------------------------*/

    // Form Validation
    validateItem = (item) =>{
        // validate each item
        const {assetFileHash, name, description, price, quantity} = item;
        let assetFileError = "", nameError = "", descriptionError = "", priceError = "", quantityError="", error = false;

        if(!assetFileHash.trim()){
            assetFileError='Asset File is required';
            error = true;
        }

        if(!name.trim()){
            nameError='Name is required';
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
        if(!quantity || quantity<1){
            quantityError="Quantity must be positive integer";
            error = true;
        }

        this.setState(prevState => ({
            errors:{
                assetFile: assetFileError,
                name:nameError,
                description: descriptionError,
                price: priceError,
                quantity: quantityError,
            }
        }))
        
        return !error;
    }

    validateform = () =>{
        // validate complete form
        const {items, tags, address, organizer_contact, event_date_time} = this.state;
        let itemsError = "", tagsError = "", organizerError = "", dateTimeError = "", error = false;
        if(!items||items.length<1){
            itemsError="At least one item is required";
            error = true;
        }
        if(!tags||tags.length<1){
            tagsError="At least one tag is required";
            error = true;
        }
        if(!organizer_contact.trim()){
            // also add phone number check
            organizerError="Organizer contact is required";
            error = true;
        }
        if(!event_date_time.trim()){
            dateTimeError="Event date and time is required";
            error = true;
        }
        const addressStatus = addressValidation(address);
        if(!error){
            error = addressStatus.error;
        }
        this.setState({
            errors:{
                items: itemsError,
                tags: tagsError,
                address: addressStatus.address_error,
                organizer: organizerError,
                dateTime: dateTimeError,
            }
        })
        return !error;
    }

/*-----------------------------------------*/
/*-----------------------------------------*/
    // Button handlers
    handleFormChange = e=>{
        this.setState({
            display_first: !this.state.display_first
        })
    }

    toggleCategory = (category) =>{
        const {categories} = this.state;
        if(categories.findIndex(cat => cat === category) === -1){
            categories.push(category);
        }else{
            categories.splice(categories.findIndex(cat => cat === category), 1);
        }
        this.setState({
            categories: categories
        })
    }

    handleAddItem = (e)=>{
        // adding a single item to items array
        e.preventDefault();
        const {name, description, price, assetFileHash, quantity} = this.state;
        
        const item = { name, description, price, assetFileHash, quantity };
        const isValid = this.validateItem(item);
        if(isValid){
            this.setState(prevState => ({
                items: [...prevState.items, item],
                name:'',
                description:'',
                price:0,
                assetFileHash:'',
                assetFileSize:0,
                assetFileUploading: false,
                buffer: null,
                quantity: '',
            }))
        }        
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {items, tags, address, organizer, organizer_contact, event_date_time} = this.state;
        const isValid = this.validateform();
        const data = {items, tags, address, organizer, organizer_contact, event_date_time};
        if(isValid){
            this.setState({
                success: true
            })
        }
    }
/*--------------------------------------*/
/*-----------------------------------------*/
    /* DISPLAY COMPONENTS*/

    renderItemForm = ()=>{
        return(
            <>
            <CardBody>
                                
                <CardSubtitle tag="h6" className="new-item-card-subtitle">
                    UPLOAD ASSET FILE
                </CardSubtitle>
                                
                <div className='new-item-dropbox'>
                    <CardText className='new-item-card-text'>
                        PNG, JPEG, GIF, WEBP, PDF, DOCX, MP4 or MP3. Max 100mb
                    </CardText>
                    <div className='new-item-card-button-div'>
                        <input type="file" onChange={this.onFileChange} className='new-item-card-button'/>
                    </div>
                    
                    <div className='row justify-content-center'>
                        <Button 
                            className='mt-4' style={{height:40, width: 40, borderRadius: 20}}>
                        <span className='fa fa-plus-circle'/>
                        </Button>
                    </div>
                </div> 
                <div className='invalid__feedback'>{this.state.errors.assetFile}</div>
            </CardBody>
                            
                            
            <CardBody> 
                <CardSubtitle tag="h6" className="new-item-card-subtitle">
                    ITEM DETAILS
                </CardSubtitle>

                <Form className='mt-3'>
                    <Form.Group className="mb-3" controlId="itemName">
                        <input name="name" className="form_input_field form-control" type="text" value={this.state.name} placeholder="Item Name" onChange={this.handleInputChange} />
                        <div className="invalid__feedback">{this.state.errors.name}</div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="itemDescription">
                        <textarea name="description" className="form_input_field form-control" type="text" rows={4} value={this.state.description} placeholder="Item Description" onChange={this.handleInputChange} />
                        <div className="invalid__feedback">{this.state.errors.description}</div>
                    </Form.Group>

                    <div className='row'>
                                    
                        <div className='col-6'>
                            <Form.Group className="mb-3" controlId="itemPrice">
                                <input name="price" className="form_input_field form-control" type="number" value={this.state.price} placeholder="Initial price in ETH" onChange={this.handleInputChange} min={0} step={'any'}/>
                                <div className="invalid__feedback">{this.state.errors.price}</div>
                            </Form.Group>
                        </div>

                        <div className='col-6'>
                            <Form.Group className="mb-3" controlId="itemPrice">
                                <input name="quantity" className="form_input_field form-control" type="number" value={this.state.quantity} placeholder="Quantity" onChange={this.handleInputChange} min={1}/>
                                <div className="invalid__feedback">{this.state.errors.quantity}</div>
                            </Form.Group>
                        </div>
                    </div>

                    <div>
                        <p className='text-muted'>** You can sell multiple items in a single auction. Make sure to click on add Item, before moving to next page</p>
                    </div>

                    <div className='mt-4 new-item-card-button-div'>
                        <Button className='mt-2 new-item-card-button' disabled={this.state.assetFileUploading} onClick={this.handleAddItem}>
                            ADD ITEM
                        </Button>

                        <Button className='mt-2 new-item-card-button'
                            // disabled={this.state.items.length === 0}
                            onClick={this.handleFormChange}
                        >
                            NEXT
                        </Button>     
                    </div>
                </Form>
            </CardBody>
            </>
        )
    }

    renderAuctionDetailsForm = ()=>{
        return(
            <>
            <CardBody>
                <CardSubtitle tag="h6" className="new-item-card-subtitle">
                    AUCTION DETAILS
                </CardSubtitle>

                {this.renderAllAssetCategories()}

                <Form className='mt-3'>
                    <div className='row'>
                                    
                     <div className='col-6'>
                        <Form.Group className="mb-3" controlId="itemPrice">
                            <input name="price" className="form_input_field form-control" type="number" value={this.state.price} placeholder="Initial price in ETH" onChange={this.handleInputChange} min={0} step={'any'}/>
                            <div className="invalid__feedback">{this.state.errors.price}</div>
                        </Form.Group>
                    </div>
            
                    <div className='col-6'>
                        <Form.Group className="mb-3" controlId="itemPrice">
                            <input name="organizer_contact" className="form_input_field form-control" type="text" value={this.state.organizer_contact} placeholder="Contact Number" onChange={this.handleInputChange}/>
                            <div className="invalid__feedback">{this.state.errors.organizer_contact}</div>
                        </Form.Group>
                    </div>
                    </div>

                    <AddressForm address={this.state.address} handleAddressChange = {this.handleAddressChange} errors = {this.state.errors.address}/>
                </Form>

                <Button className='mt-2 new-item-card-button'
                            // disabled={this.state.items.length === 0}
                            onClick={this.handleFormChange}
                        >
                            Previous
                        </Button> 
            </CardBody>
        </>
        )
    }

    nullHandler = (e)=>{
        e.preventDefault();  
    }

    renderSelectedCategories = () =>{
        const {categories} = this.state;
        return categories.map(category => {
            return(
                <DisplayBadges key={category} category={category} toggleCategory={this.nullHandler} selected_bg='True'/>
            )
        })
    }
    

    renderAllAssetCategories = ()=>{
        const avaliable_categories = categoryList;
        return(
        <>
            <CardText className='new-item-card-text'>
                Select Asset Categories
            </CardText>
            <div>
            {
                avaliable_categories.map(category => {
                    const isSelected = this.state.categories.findIndex(cat => cat === category.label) !== -1;
                    return(
                        <DisplayBadges key={category.label} category={category.label} toggleCategory={this.toggleCategory} selected_bg={isSelected}/>
                    )
                })
            }
            </div>
            <div className='mb-4' id='new-item-form-error'>{this.state.errors.categories}</div>
            
        </>
        )
    }

    renderItem = (item)=>{
        return(
            <>
            <p>Item will be displayed here</p>

            </>
        )
    }

    // onSuccessDismiss(){
    //     this.setState({
    //         success: !this.state.success
    //     })
    // }

    // onFailDismiss(){
    //     this.setState({
    //         fail: !this.state.fail
    //     })
    // }

    // async createItem() {
        
    //     if(this.formValidattion()){
    //         console.log(this.state);

    //         await this.uploadAssetFile()
    //         this.onSuccessDismiss()

    //         setTimeout(() => {
    //             this.onSuccessDismiss()
    //         }, 10000);
    //     }
    // }

    

    

    dateValidate(current){
        var yesterday = moment().subtract(1, 'day');

        return current.isAfter( yesterday );
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

    


    render(){        
        return(
            <div className='container-fluid'>
                <div className='row justify-content-center' id='new-item-card-row'>
                    <h3 className='col-12 rainbow-lr new-item-heading'>
                        CREATE NEW AUCTION
                    </h3>
                    
                    <div className='col-11 col-sm-8 col-md-7 col-lg-7'>
                        <Card id='new-item-card'>
                            {/* Input Image/ Video files */}
                            
                            
                            
                            <CardBody>
                                {this.state.display_first && this.renderItemForm()}
                                {!this.state.display_first && this.renderAuctionDetailsForm()}
                            
                                <Form>


                                    {/* <div className='row'>
                                        <div>
                                            <Button className='mt-2 new-item-card-button' disabled={this.state.assetFileUploading}
                                                onClick={this.handleAddItem}
                                            >
                                                ADD ITEM
                                            </Button>
                                        </div>
                                        <div>
                                            <p>You can sell multiple items in a single auction</p>
                                        </div>
                                    </div> */}

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
                                                                if(moment(this.state.startDateTime).format('MMMM Do YYYY, h:mm A')==='Invalid date'||moment(this.state.endDateTime).format('MMMM Do YYYY, h:mm A')==='Invalid date'){
                                                                    var er = this.state.errors;
                                                                    er.dateTime = "Invalid Date-Time"

                                                                    this.setState({
                                                                        errors: er
                                                                    })
                                                                }
                                                                else if(this.state.startDateTime >= this.state.endDateTime){

                                                                    er = this.state.errors;
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
                                    {/* <div className='mt-4 new-item-card-button-div'>
                                        <Button className='mt-2 new-item-card-button'
                                            disabled={this.state.assetFileUploading}
                                            onClick={() => this.addItem()}
                                        >
                                            ADD ITEM
                                        </Button>

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
                                    </div> */}
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
                                <Image className="new-item-image" rounded
                                    src={this.state.assetFileHash===""?preview:"https://ipfs.infura.io/ipfs/"+this.state.assetFileHash}
                                />
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
                                        
                                    </div>
                                    :
                                    <div>
                                        {
                                            this.renderSelectedCategories()
                                            // renderPhysicalAssetCategories(this.state.categories)
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
                                    Size{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {
                                            (!this.state.assetFileSize || this.state.assetFileSize === 0) ? 
                                            '0 KB' : this.state.assetFileSize+' KB'
                                        }
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
const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth:state.auth
    })

}

export default connect(mapStateToProps, {})(LiveAuction);
