import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as ipfsClient  from 'ipfs-http-client';
import moment from 'moment';
import Datetime from 'react-datetime';
import {Card, CardText, CardBody, UncontrolledCarousel,
    CardSubtitle, Button, Alert} from "reactstrap";
import Form from 'react-bootstrap/Form';
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
            assetImagesHash:[],
            assetImageFileUploading:false,
            assetShowcaseCarousel: [],
            assetVideoHash:"",
            assetVideoFileUploading:false,
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

            assetFileUploading: false,
            success: false,
            fail: false,
        }
    }

    componentDidMount(){

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

    uploadAssetImageFile = async() => {
        try {
            
            this.setState({
                assetImageFileUploading: true
            })

            const file = await ipfs.add(this.state.buffer)
            
            let assetImagesHash = this.state.assetImagesHash;
            assetImagesHash.push(file.path);

            this.setState({
                assetImagesHash: assetImagesHash,
                assetImageFileUploading: false
            })

            var tempHash = this.state.assetShowcaseCarousel;

            var showcaseElement = {
                src: "https://ipfs.infura.io/ipfs/"+file.path,
                altText: "Slide "+assetImagesHash.length.toString(),
                key: assetImagesHash.length.toString(),
            }

            tempHash.push(showcaseElement);

            this.setState({
                assetShowcaseCarousel: tempHash
            })

        } catch (error) {
            console.error(error)

            this.setState({
                assetImageFileUploading: false,
                buffer: null
            })
            this.onFailDismiss();

        }

        //https://ipfs.infura.io/ipfs/<hash>
    }

    uploadAssetVideoFile = async() =>{
        try {
            
            this.setState({
                assetVideoFileUploading: true
            })

            const file = await ipfs.add(this.state.buffer)
            const assetVideoHash = this.state.assetVideoHash;
            assetVideoHash.push(file.path)
            this.setState({
                assetVideoHash: file.path,
                assetVideoFileUploading: false
            })

            console.log(file.path)

        } catch (error) {

            this.setState({
                assetVideoFileUploading: false,
                buffer: null
            })

            this.onFailDismiss();
            
        }

        //https://ipfs.infura.io/ipfs/<hash>
    }


    /*-----------------------------------------*/
    /*-----------------------------------------*/

    // Form Validation
    validateItem = (item) =>{
        // validate each item
        const {assetImagesHash, name, description, price, quantity} = item;
        let assetImageError = "", nameError = "", descriptionError = "", priceError = "", quantityError="", error = false;
        console.log(assetImagesHash)
        if(!assetImagesHash || assetImagesHash.length<1){
            assetImageError='Asset File is required';
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
                ...prevState.errors,
                assetFile: assetImageError,
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
        const {items, categories, address, organizer_contact, event_date_time} = this.state;
        let itemsError = "", categoriesError = "", organizerError = "", dateTimeError = "", error = false;
        if(!items||items.length<1){
            itemsError="At least one item is required";
            error = true;
        }
        if(!categories||categories.length<1){
            categoriesError="At least one tag is required";
            error = true;
        }
        if(!organizer_contact.trim()){
            // also add phone number check
            organizerError="Organizer contact is required";
            error = true;
        }
        if(!event_date_time){
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
                categories: categoriesError,
                address: addressStatus.address_error,
                organizer: organizerError,
                dateTime: dateTimeError,
            }
        })
        return !error;
    }
    dateValidate(current){
        var yesterday = moment().subtract(1, 'day');

        return current.isAfter( yesterday );
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
        const {name, description, price, assetImagesHash, quantity} = this.state;
        
        const item = { name, description, price, assetImagesHash, quantity };
        const isValid = this.validateItem(item);
        if(isValid){
            this.setState(prevState => ({
                items: [...prevState.items, item],
                name:'',
                description:'',
                price:0,
                assetFileUploading: false,
                assetImagesHash: [],
                buffer: '',
                quantity: '',
            }))
        }        
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {items, categories, address, organizer, organizer_contact, event_date_time} = this.state;
        const isValid = this.validateform();
        const data = {items, tags:categories, address, organizer, organizer_contact, event_date_time};
        console.log(data);
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
                        <Button className='mt-4' onClick={this.uploadAssetImageFile} style={{height:40, width: 40, borderRadius: 20}}>
                        {   
                            this.state.assetImageFileUploading ?
                            <span className='fa fa-spinner'/>:
                            <span className='fa fa-plus-circle'/>
                        }
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
                            disabled={this.state.items.length === 0}
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
                        <Datetime initialValue={this.state.event_date_time}
                            inputProps={{
                                className:"form_input_field form-control date_time_input",
                                placeholder: "Event Date and Time"
                            }} 
                        isValidDate={this.dateValidate}
                            onChange={(d) => {
                                this.setState({
                                    event_date_time: d
                                })
                            }}/>
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

                <div className='mt-4 new-item-card-button-div'>
                    <Button className='mt-2 new-item-card-button' onClick={this.handleFormChange}>
                            PREVIOUS
                    </Button> 

                    <Button className='mt-2 new-item-card-button'
                        disabled={this.state.items.length === 0}
                        onClick={this.handleSubmit}
                    >
                        SUBMIT
                    </Button>     
                    </div>

                
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

    renderSelectedItems = ()=>{
        const {items} = this.state;
        if(!items|| items.length<1){
            return(
                <>
                    <p className='form__text--para'>No item has been added. Please add items to continue</p>
                </>
            )
        }else{
            return items.map(item => {
                return(
                    <div className='row' key={item.id}>
                        <div className='col-6'>
                            <p className='form__text--para'>{item.name}</p>
                        </div>
                        <div className='col-6'>
                            <p className='form__text--para'>{item.price}</p>
                        </div>
                    </div>
                )
            })
        }
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
                <div className='row justify-content-center' id='row'>
                    <h3 className='col-12 rainbow-lr new-item-heading'>
                        CREATE NEW AUCTION
                    </h3>
                    
                    <div className='col-11 col-sm-8 col-md-7 col-lg-7'>
                        <Card className='form__card__container'>
                            {/* Input Image/ Video files */}
                            
                            
                            
                            <CardBody>
                                {this.state.display_first && this.renderItemForm()}
                                {!this.state.display_first && this.renderAuctionDetailsForm()}
                            
                                <Form>

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
                            <Card className='form__card__container'>
                                {this.state.display_first && <>
                                    <div><p className="sidebar__heading">Current Item Preview</p></div>
                                    {
                                        this.state.assetImagesHash.length ? 
                                        <UncontrolledCarousel items={this.state.assetShowcaseCarousel} /> :
                                        ""
                                    }
                                    </>
                                }
                
                                <CardBody>
                                {    this.state.display_first && <>
                                    <CardSubtitle tag="h5" className="mt-3 mb-3 new-item-card-subtitle" id="new-item-card-username">
                                        {this.state.name? this.state.name:""}
                                    </CardSubtitle>
                                    <CardText id="new-item-card-info" className="mb-4">
                                        {   
                                            this.state.description? this.state.description:""
                                        }
                                    </CardText>
                                
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
                                            {(this.state.quantity?this.state.quantity:0)+' no'}
                                        </span>
                                    </CardSubtitle>
                                </div>
                                </>
                                }

                                {
                                    ((this.state.categories.length>0) && (!this.state.display_first))?
                                    <div>
                                    <div><p className="sidebar__heading">Tags</p></div>
                                        <>{
                                            this.renderSelectedCategories()
                                        }
                                        </>
                                    </div>:<div/>
                                }

                                
                                <div className='selected_items_div'>
                                    <div><p className="sidebar__heading">Added Items</p></div>
                                    {this.renderSelectedItems()}


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
