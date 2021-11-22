import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Switch from 'react-switch';
import { fetchProfile } from '../../apis_redux/actions/userProfile';
import { Button, Container, Row, Col, Card, 
    CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import AddressForm from '../FrequentComponents/AddressForm';
import { addressValidation } from '../FrequentComponents/AddressForm';
import { Image, Form } from 'react-bootstrap';
import {FaEthereum,FaHome, FaPencilAlt} from 'react-icons/fa'
import RenderError from '../FrequentComponents/RenderError';
import Loading from '../loading';
import Greetings from '../../assets/images/Hello.jpg'
import "./UserProfile.css";

const identicon = require('identicon');


class UserProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            userImage: null,
            editModalOpen: false,
            name:'',
            anonymous_name: '',
            password: '',
            editAddress: false,
            address:{
                addressLine1:"",
                addressLine2:"",
                city:"",
                addressState:"",
                country:"",
                postalCode:"",
            },

            errors:{
                name: '',
                anonymous_name: '',
                password: '',
                address:{
                    addressLine1:"",
                    addressLine2:"",
                    city:"",
                    addressState:"",
                    country:"",
                    postalCode:"",
                }
            }
        }
    }

    async componentDidMount(){

        await this.props.fetchProfile(this.props.user);

        if(this.props.userProfile.profile.accounts[0]){
            const imageBuffer = identicon.generateSync({ id: this.props.userProfile.profile.accounts[0], size: 500 })
            
            this.setState({
                userImage: imageBuffer,   
            });
        }    
    }

    async componentDidUpdate(prevProps){

        if(prevProps.user !== this.props.user){
            await this.props.fetchProfile(this.props.user);
            
            if(this.props.userProfile.profile.accounts[0]){
                const imageBuffer = identicon.generateSync({ id: this.props.userProfile.profile.accounts[0], size: 500 })
                
                this.setState({
                    userImage: imageBuffer,   
                });
            }   
        }
    }

    handleInputChange=(event)=>{
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

    formValidation = ()=>{
        const {password, address} = this.state;
        let passworderror="";
        let error = false;

        if(password && password.trim().length < 6){
            error = true;
            passworderror = "* Password should be 6 or more characters long";
        }

        if(this.state.editAddress){
            const addressStatus = addressValidation(address);
            if(!error){
                error = addressStatus.error;
            }

            this.setState({
                errors:{
                    address:addressStatus.address_error
                }
            })
        }
        
        this.setState({
            errors:{
                password:passworderror,
            }
        })
        
        return error;
    }

    submitEditForm(){
        if(!this.formValidation()){
            alert('Form Submitted!!');
            this.setState({
                editModalOpen: false
            })
        }
    }

    handleCheckChange() {
        this.setState({
            editAddress : !this.state.editAddress
        });
    }

    render(){

        if(this.props.userProfile.profile){
            const accountAddress = this.props.userProfile.profile.accounts[0].toString().slice(0, 8)+'...  ';
            const baseAddress = this.props.userProfile.profile.address[0];
            return(
                <div className='container'>
                    <div className='row justify-content-center mb-4' id='new-item-card-row'>
                        <h2 className='col-12 rainbow-lr new-item-heading'>
                            USER PROFILE
                        </h2>
                    </div>
                    <div className='row justify-content-center' style={{marginTop: 50, marginBottom: 50}}>
                        <div className='col-12 col-lg-5 mb-4'>
                            <Card id="user-detail-card">
                                <CardBody>
                                    <div className='row' style={{textAlign:'center', justifyContent: 'center'}}>
                                        <Image className='mb-4 col-5' src={this.state.userImage} roundedCircle />
                                        <CardTitle className='col-9' tag='h3' style={{color: 'cyan'}}>
                                            {this.props.userProfile.profile.name}
                                        </CardTitle>
                                    </div>
                                    <div className='row mt-4'>
                                        <CardSubtitle tag="h6" className="mb-4 new-item-preview-price">
                                            <span className='fa fa-user-secret' /> Anonymous Name
                                            <span style={{marginLeft: 20, color: 'cyan'}}>
                                                {this.props.userProfile.profile.anonymous_name}
                                            </span>
                                        </CardSubtitle>
                                        <CardSubtitle tag="h6" className="mb-4 new-item-preview-price">
                                            <span className='fa fa-at' /> Email
                                            <span style={{marginLeft:20, color: 'cyan'}}>
                                                {this.props.userProfile.profile.email}
                                            </span>
                                        </CardSubtitle>
                                        <CardSubtitle tag="h6" className="mb-4 new-item-preview-price">
                                            <FaEthereum/> Account Address
                                            <span style={{marginLeft:20, color: 'cyan'}}>
                                                {accountAddress}
                                                <CopyToClipboard text={this.props.userProfile.profile.accounts[0]}>
                                                    <span className='fa fa-copy' />
                                                </CopyToClipboard>
                                            </span>
                                        </CardSubtitle>
                                        <CardSubtitle tag="h6" className="mb-4 new-item-preview-price">
                                            <FaHome/> Resedential Address
                                            <span style={{marginLeft:20, color: 'cyan'}}>
                                            {
                                                baseAddress.addressLine1+', '+baseAddress.city+', '+
                                                baseAddress.addressState+', '+baseAddress.country
                                            }
                                            </span>
                                        </CardSubtitle>
                                        {
                                            this.props.userId==this.props.user ?
                                            <div className='mt-4' id='single-asset-purchase-button-container'>
                                            <Button 
                                                onClick={() => this.setState({editModalOpen: !this.state.editModalOpen})}
                                                id='single-asset-purchase-button'>
                                                <span><FaPencilAlt /> Edit Profile </span>
                                            </Button>
                                            </div> :
                                            <div></div>
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className='col-12 col-lg-5 mt-4'> 
                           {
                               this.props.userId==this.props.user ?
                                <div className = 'btn-group-vertical'>
                                <Image src={Greetings} style={{borderRadius: 25, marginBottom:20, height: 300, width:'95%'}} alt = "image" fluid />
                                <button type = 'button' className = 'btn btn-dark btn-lg' id='selected-button'>User details</button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/my-digital-assets`}>
                                        My Digital Assets
                                    </Link>
                                    </button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/my-winnings`}>
                                        My Winnings
                                    </Link>
                                    </button>
                                    <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/pending-shipment`}>
                                        Pending Shipments
                                    </Link>
                                    </button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                    <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/terms_and_conditions`}>
                                        Encheres Terms and Conditions
                                    </Link>
                                    </button>
                                <button type = 'button' className = 'btn btn-dark btn-lg'>
                                <Link style={{color: 'white', textDecoration: 'none'}}
                                        to={`/logout`}>
                                        Log-out
                                    </Link>
                                </button>
                                </div>
                                 :
                                <Image src={Greetings} style={{borderRadius: 20}} width='90%' alt = "image" fluid />
                           }
                        </div>
                        <Modal isOpen={this.state.editModalOpen} >
                            <ModalHeader
                                style={{backgroundColor: '#0B1126', borderWidth: 0}}
                            >
                                <div style={{color: 'grey'}}>
                                    Edit Profile
                                </div>
                            </ModalHeader>
                            <ModalBody
                                style={{backgroundColor: '#0B1126', borderWidth: 0}}
                            >
                                <div className='mb-4' 
                                    id='new-item-form-error'>
                                    {"* Only Fill those fields which you need to update."}
                                </div>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Control
                                        name='name'
                                        onChange={this.handleInputChange}
                                        className='new-item-form-field' 
                                        placeholder="Full Name"
                                        style={{backgroundColor: '#03091F', 
                                            borderWidth: 0,
                                            color: 'white'
                                        }}
                                />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="anonymous_name">
                                    <Form.Control
                                        name='anonymous_name'
                                        onChange={this.handleInputChange}
                                        className='new-item-form-field' 
                                        placeholder="Anonymous Name"
                                        style={{backgroundColor: '#03091F', 
                                            borderWidth: 0,
                                            color: 'white'
                                        }}
                                />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Control
                                        name='password'
                                        type='password'
                                        onChange={this.handleInputChange}
                                        className='new-item-form-field' 
                                        placeholder="New Password"
                                        style={{backgroundColor: '#03091F', 
                                            borderWidth: 0,
                                            color: 'white'
                                        }}
                                />
                                </Form.Group>
                                <div className='mb-4' 
                                    id='new-item-form-error'>
                                    {this.state.errors.password}
                                </div>
                                <div className='mb-4'>
                                    <span className='new-item-switch-label'>
                                        Edit Resedential Address
                                    </span>
                                    <Switch 
                                        onChange={() => this.handleCheckChange()} 
                                        checked={this.state.editAddress}
                                        height={24}
                                        width={50}
                                        offColor='#03091F'
                                        onColor='#00CAFF'
                                        />
                                </div>
                                {
                                    this.state.editAddress ?
                                    <AddressForm 
                                        address={this.state.address} 
                                        handleAddressChange = {() => this.handleAddressChange()} 
                                        errors = {this.state.errors.address}
                                    /> :
                                    <></>
                                }
                            </ModalBody>
                            <ModalFooter 
                                    style={{backgroundColor: '#0B1126', borderWidth: 0}}
                            >
                                <Button 
                                    onClick={() => this.submitEditForm()}
                                    className='fa fa-lg fa-telegram' />
                                <Button 
                                    onClick={() => this.setState({
                                        editModalOpen: !this.state.editModalOpen
                                    })}
                                    className='fa fa-lg fa-times-circle' />
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            );
        }
        else if(this.props.userProfile.error){
            return(
                <RenderError error={'Unable to Fetch Profile'} />
            );
        }
        else{
            return(
                <Loading type='spokes' color='white' />
            );
        }
    }
}

const mapStateToProps = (state, ownprops) => {
    return {
      userId: state.auth.userId,
      userProfile: state.userProfile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchProfile: (userId) => dispatch(fetchProfile(userId))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);