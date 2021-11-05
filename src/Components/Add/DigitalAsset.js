import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {renderAssetCategories} from '../FrequentComponents/Asset'
import * as ipfsClient  from 'ipfs-http-client';
import {Badge, Image} from 'react-bootstrap';
import {Card, CardText, CardBody, 
    CardSubtitle, Button } from "reactstrap";
import Form from 'react-bootstrap/Form';
import {FaPalette, FaMusic, FaFootballBall, 
    FaWallet} from 'react-icons/fa';
import {GrDomain } from 'react-icons/gr';
import {GiCardRandom, GiBearFace} from 'react-icons/gi';
import { BiWorld } from "react-icons/bi";
import swal from 'sweetalert';
import preview from "../../assets/images/nft.jpg";
import "./Add.css";
import { ipfs_base_url } from '../../apis_redux/apis/encheres';
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import NftAsset from '../../abis/NftAsset.json';

//Declare IPFS
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class DigitalAsset extends Component {

    constructor(props){
        super(props);
        this.state={

            assetFileHash: "",
            assetFileSize: 0,
            name: "",
            description: "",
            price: 0.0000,
            royality: 0,
            categories: [],
            categoriesId: [],

            errors: {
                assetFile: "",
                name: "",
                description: "",
                price: "",
                royality: "",
                categories: "",
            },

            assetFileUploading: false,
            success: false,
            fail: false,

            account_integrated: false,
            account_address: '',
            nftasset_contract: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async loadWeb3() {
        if (window.web3) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          console.log(window.web3)
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            swal({
                title: "OOPS!!",
                text: 'Non-Ethereum browser detected. You should consider trying MetaMask!',
                icon: "error"
            })
        }
    }

    async loadNftAssetSmartContract() {
       
        const web3 = window.web3

        // Network ID
        const networkId = await web3.eth.net.getId()

        const networkData = NftAsset.networks[networkId]
        if(networkData) {
            const nftasset_contract = new web3.eth.Contract(NftAsset.abi, networkData.address)
            this.setState({ nftasset_contract })
            console.log(this.state.nftasset_contract);
        } else {
            swal({
                title: "OOPS!!",
                text: 'contract not deployed to detected network.',
                icon: "error"
            })
        }
    }

    integrateMetamaskAccount = async()=>{
        try{
            const provider = await detectEthereumProvider();
            if(!provider){
                swal({
                    title: "OOPS!!",
                    text: "Please use a browser with MetaMask installed in it",
                    icon: "error"
                })
                return;
            }
              
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            this.setState({
                account_address: accounts[0],
                account_integrated:true
            })

        }catch(err){
            swal({
                title: "OOPS!!",
                text: "Metamask Account Integration failed",
                icon: "error"
            })
        }  
    }

    async componentDidMount(){
        await this.loadWeb3();
        await this.integrateMetamaskAccount();
        await this.loadNftAssetSmartContract();
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

    formValidattion() {

        const {assetFileHash, name, description, price, royality, categories} = this.state;
        let assetFileError = "", nameError = "", descriptionError = "", priceError = "", royalityError = "",
        categoriesError = "", error;

        if(!assetFileHash.trim()){
            assetFileError='Asset File is required';
            error = true;
        }

        if(!name.trim()){
            nameError='A Unique Asset Name is required';
            error = true;
        }

        if(!description.trim() || !description.trim().length){
            descriptionError="Description is required";
            error = true;
        }

        if(this.state.onSale && !price || isNaN(price) || price<0){
            priceError="Price must be positive number";
            error = true;
        }

        if(royality && isNaN(royality) || royality < 0){
            royalityError = "Royality must be a positive Number";
            error = true
        }

        if(!categories.length){
            categoriesError='Your item must have one of the categories';
            error = true;
        }

        this.setState(prevState => ({
            errors:{
                assetFile: assetFileError,
                name:nameError,
                description: descriptionError,
                categories:categoriesError,
                price: priceError,
                royality: royalityError
            }
        }))
        
        return !error;
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
      }

    addCategory(name, categoryId){
        var cat = this.state.categories;
        var catId = this.state.categoriesId;
        var ind = cat.indexOf(name);

        if(ind >= 0)
        {
            cat.splice(ind, 1);
            catId.splice(ind, 1);
        }  
        else 
        {
            cat.push(name);
            catId.push(categoryId);
        }    

        this.setState({
            categories: cat,
            categoriesId: catId
        })

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
                assetFileUploading: false
            })

            console.log(file.path)

        } catch (error) {

            this.setState({
                assetFileUploading: false,
                buffer: null
            })

            swal({
                title: "OOPS!!",
                text: 'Something Went Wrong. Try again!!',
                icon: "error"
            })

        }
    }

    async createItem() {
        
        if(this.formValidattion()){

            const {name, assetFileHash, description, categoriesId, royality} = this.state;

            await this.state.nftasset_contract.methods.mintNftAsset(
                
                name,
                assetFileHash, 
                description, 
                categoriesId,
                royality

            ).send({from: this.state.account_address})
            .once('receipt', (receipt) => {
                swal({
                    title: "Success",
                    text: "Your Digital Asset (NFT) is created sucessfully!!",
                    icon: "success"
                })
            })
        }
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
                            className='new-item-card-button selected_button_navigation'>
                            DIGITAL (NFT) 
                        </Button>
                        {" "}
                        <Button 
                            className='new-item-card-button'>
                            <Link style={{color: 'white', textDecoration: 'none'}} to='/create/independent-physical-assets'>
                                PHYSICAL
                            </Link>
                        </Button>
                    </div>
                    <div className='col-11 col-sm-8 col-md-7 col-lg-7'>
                        <Card id='new-item-card'>
                            <CardBody>
                            <CardSubtitle tag="h6" className="new-item-card-subtitle">
                                UPLOAD ASSET FILE
                            </CardSubtitle>
                            <div className='new-item-dropbox'>
                                <CardText className='new-item-card-text'>
                                    PNG, JPEG, GIF, WEBP, PDF, DOCX, MP4 or MP3. Max 100mb
                                </CardText>
                                <div className='new-item-card-button-div'>
                                    <input 
                                        type="file"
                                        onChange={this.onFileChange}
                                        className='new-item-card-button'
                                    />
                                </div>
                                <div className='row justify-content-center'>
                                    <Button 
                                        disabled={!this.state.buffer || this.state.assetFileUploading}
                                        onClick={() => this.uploadAssetFile()}
                                        className='mt-4' style={{height:40, width: 40, borderRadius: 20}}>
                                    {   
                                        this.state.assetFileUploading ?
                                        <span className='fa fa-spinner'/>:
                                        <span className='fa fa-plus-circle'/>
                                    }
                                    </Button>
                                </div>
                            </div> 
                                <div className='mb-4' id='new-item-form-error'>{this.state.errors.assetFile}</div>
                            </CardBody>
                            <CardBody> 
                                <CardText className='new-item-card-text'>
                                    Select Asset Categories
                                </CardText>
                                <div>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Art", 0)}
                                        bg={this.state.categories.indexOf("Art")>=0 ? "light":"secondary"}
                                    >
                                        <span><FaPalette/></span> Art
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Music", 1)}
                                        bg={this.state.categories.indexOf("Music")>=0 ? "light":"secondary"}
                                    >
                                        <span><FaMusic/></span> Music
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Domain Names", 2)}
                                        bg={this.state.categories.indexOf("Domain Names")>=0 ? "light":"secondary"}
                                    >
                                        <span><GrDomain/></span> Domain Names
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Virtual Worlds", 3)} 
                                        bg={this.state.categories.indexOf("Virtual Worlds")>=0 ? "light":"secondary"}                             
                                    >
                                        <span><BiWorld/></span> Virtual Worlds
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Trading Cards", 4)}  
                                        bg={this.state.categories.indexOf("Trading Cards")>=0 ? "light":"secondary"}                                                      
                                    >
                                        <span><GiCardRandom/></span> Trading Cards
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Collectibles", 5)} 
                                        bg={this.state.categories.indexOf("Collectibles")>=0 ? "light":"secondary"}                                                       
                                    >
                                        <span><GiBearFace/></span> Collectibles
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Sports", 6)} 
                                        bg={this.state.categories.indexOf("Sports")>=0 ? "light":"secondary"}                                                       
                                    >
                                        <span><FaFootballBall/></span> Sports
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Documents", 7)}  
                                        bg={this.state.categories.indexOf("Documents")>=0 ? "light":"secondary"}                                                      
                                    >
                                        <span className='fa fa-file'/> Documents
                                    </Badge>
                                    <Badge className='new-item-badge' pill text="dark"
                                        onClick={() => this.addCategory("Utility", 8)}    
                                        bg={this.state.categories.indexOf("Utility")>=0 ? "light":"secondary"}                                                    
                                    >
                                        <span><FaWallet/></span> Utility
                                    </Badge>
                                    <div className='mb-4' id='new-item-form-error'>{this.state.errors.categories}</div>
                                </div>
                                <Form className='mt-3'>
                                    <Form.Group className="mb-3" controlId="itemName">
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
                                    <div className='col-6'>
                                    <Form.Group className="mb-3" controlId="itemRoyality">
                                        <Form.Control
                                            type='number'
                                            name='royality'
                                            onChange={this.handleInputChange}
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                color: 'white'
                                                }}
                                            placeholder="Royality (%)" />
                                        <div className='mb-4' id='new-item-form-error'>{this.state.errors.royality}</div>
                                    </Form.Group>
                                    </div>
                                    <div className='col-6'>
                                        {
                                            this.state.onSale ? 
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
                                                    placeholder="Base/Fix Price in ETH"
                                                    />
                                                <div className='mb-4' id='new-item-form-error'>{this.state.errors.price}</div>
                                            </Form.Group> :
                                            <div></div>
                                        }
                                    </div>
                                    </div>
                                    <div className='mt-4 new-item-card-button-div'> 
                                        <Button className='mt-2 new-item-card-button'
                                            disabled={!this.state.account_integrated}
                                            onClick={() => this.createItem()}
                                        >
                                            CREATE ASSET
                                        </Button>   
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-11 col-sm-8 col-md-4 col-lg-3">
                            <Card id="new-item-card">
                                <Image className="new-item-image" rounded
                                    src={this.state.assetFileHash===""?preview:ipfs_base_url+this.state.assetFileHash}
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
                                            renderAssetCategories(this.state.categories)
                                        }
                                    </div>
                                }
                                <div>
                                <CardSubtitle tag="h6" className="new-item-preview-price">
                                    Royality{"  "}
                                    <span style={{ marginLeft: 10, color: "cyan" }}>
                                        {(!this.state.royality || this.state.royality === 0) ? '0%' : this.state.royality+'%'}
                                    </span>
                                </CardSubtitle>
                                </div>
                            </CardBody>
                            </Card>
                        </div>
                  </div>
                </div>
        );
        }
}

export default DigitalAsset;
