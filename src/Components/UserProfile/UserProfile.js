import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { fetchProfile, updateProfile, updateAddress } from '../../apis_redux/actions/userProfile';
import { Button, Container, Row, Col, Card, 
    CardBody, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter, CardImg} from "reactstrap";
import AddressForm from '../FrequentComponents/AddressForm';
import { Image, Form } from 'react-bootstrap';
import {FaEthereum,FaHome, FaPencilAlt} from 'react-icons/fa'
import RenderError from '../FrequentComponents/RenderError';
import Loading from '../loading';
import "./UserProfile.css";
import swal from 'sweetalert';

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
            editAddressModalOpen: false,
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

    async getUser(){
        await this.props.fetchProfile(this.props.user);

        if(this.props.userProfile.profile.accounts[0]){
            const imageBuffer = identicon.generateSync({ id: this.props.userProfile.profile.accounts[0], size: 500 })
            
            this.setState({
                userImage: imageBuffer,   
            });
        }   
    }

    async componentDidMount(){
        await this.getUser();
         
    }

    async componentDidUpdate(prevProps){

        if(prevProps.user !== this.props.user){
            await this.getUser();
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
        const {password} = this.state;
        let passworderror="";
        let error = false;

        if(password && password.trim().length < 6){
            error = true;
            passworderror = "* Password should be 6 or more characters long";
        }
        
        this.setState({
            errors:{
                password:passworderror,
            }
        })
        
        return error;
    }

    async submitEditForm(){
        if(!this.formValidation()){

            var updateData = {};
            if(this.state.name!='')
                updateData.name = this.state.name;
            if(this.state.anonymous_name!='')
                updateData.anonymous_name = this.state.anonymous_name;
            if(this.state.password!='')
                updateData.password = this.state.password;

            await this.props.updateProfile(updateData);

            if(this.props.userProfile.error){
                swal({
                    title: "OOPS!!",
                    text: this.props.userProfile.error,
                    icon: "error"
                })
                await this.getUser();
            }
            else{
                swal({
                    title: "Success!!",
                    text: this.props.userProfile.message,
                    icon: "success"
                })

                await this.getUser();
            }

            this.setState({
                editModalOpen: false
            })
        }
    }

    async submitAddressEditForm(){
        var updateData = {};
            if(this.state.address.addressLine1!='')
                updateData.addressLine1 = this.state.address.addressLine1;
            if(this.state.address.addressLine2!='')
                updateData.addressLine2 = this.state.address.addressLine2;
            if(this.state.address.city!='')
                updateData.city = this.state.address.city;
            if(this.state.address.addressState!='')
                updateData.addressState = this.state.address.addressState;
            if(this.state.address.country!='')
                updateData.country = this.state.address.country;
            if(this.state.address.postalCode!='')
                updateData.postalCode = this.state.address.postalCode;

            await this.props.updateAddress(updateData);

            if(this.props.userProfile.error){
                swal({
                    title: "OOPS!!",
                    text: this.props.userProfile.error,
                    icon: "error"
                })
                await this.getUser();
            }
            else{
                swal({
                    title: "Success!!",
                    text: this.props.userProfile.message,
                    icon: "success"
                })
                await this.getUser()
            }

            this.setState({
                editAddressModalOpen: false
            })
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
                            {this.props.userProfile.profile.name.toUpperCase()}
                        </h2>
                    </div>
                    <div className='row justify-content-center' style={{marginTop: 50, marginBottom: 50}}>
                        <div className='col-12 col-lg-4 mb-4'>
                            <Card id="user-detail-card">
                                <CardBody>
                                    <div className='row' style={{textAlign:'center', justifyContent: 'center'}}>
                                        <CardImg className='mb-4' src={this.state.userImage} />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className='col-12 col-lg-6 mb-4'>
                            <Card id="user-detail-card">
                                <CardBody>
                                    <div className='row mt-4'>
                                        <div className='user-detail-container'>
                                        <CardSubtitle id='user-detail-field' tag="h6" className="mb-4 new-item-preview-price">
                                            <span className='fa fa-user-secret' /> Anonymous Name
                                            <span style={{marginLeft: 20, color: 'cyan'}}>
                                                {this.props.userProfile.profile.anonymous_name}
                                            </span>
                                        </CardSubtitle>
                                        </div>
                                        <div className='user-detail-container'>
                                        <CardSubtitle id='user-detail-field' tag="h6" className="mb-4 new-item-preview-price">
                                            <span className='fa fa-at' /> Email
                                            <span style={{marginLeft:20, color: 'cyan'}}>
                                                {this.props.userProfile.profile.email}
                                            </span>
                                        </CardSubtitle>
                                        </div>
                                        <div className='user-detail-container'>
                                        <CardSubtitle id='user-detail-field' tag="h6" className="mb-4 new-item-preview-price">
                                            <FaEthereum/> Account Address
                                            <span style={{marginLeft:20, color: 'cyan'}}>
                                                {accountAddress}
                                                <CopyToClipboard text={this.props.userProfile.profile.accounts[0]}>
                                                    <span className='fa fa-copy' />
                                                </CopyToClipboard>
                                            </span>
                                        </CardSubtitle>
                                        </div>
                                        <div className='user-detail-container'>
                                        <CardSubtitle id='user-detail-field' tag="h6" className="mb-4 new-item-preview-price">
                                            <FaHome/> Resedential Address
                                            <span style={{marginLeft:20, color: 'cyan'}}>
                                            {
                                                baseAddress.addressLine1+', '+baseAddress.city+', '+
                                                baseAddress.addressState+', '+baseAddress.country
                                            }
                                            </span>
                                        </CardSubtitle>
                                        </div>
                                        {
                                            this.props.userId==this.props.user ?
                                            <div className='mt-4' id='single-asset-purchase-button-container'>
                                            <Button 
                                                onClick={() => this.setState({editModalOpen: !this.state.editModalOpen})}
                                                style={{width: 200}}
                                                id='single-asset-purchase-button'>
                                                <span><FaPencilAlt /> Edit General Profile </span>
                                            </Button>
                                            {"  "}
                                            <Button 
                                                onClick={() => this.setState({editAddressModalOpen: !this.state.editAddressModalOpen})}
                                                style={{width: 200}}
                                                id='single-asset-purchase-button'>
                                                <span><FaPencilAlt /> Edit Address </span>
                                            </Button>
                                            </div> :
                                            <div></div>
                                        }
                                    </div>
                                </CardBody>
                            </Card>
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
                        <Modal isOpen={this.state.editAddressModalOpen} >
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
                                <AddressForm 
                                    address={this.state.address} 
                                    handleAddressChange = {this.handleAddressChange} 
                                    errors = {this.state.errors.address}
                                /> 
                            </ModalBody>
                            <ModalFooter 
                                    style={{backgroundColor: '#0B1126', borderWidth: 0}}
                            >
                                <Button 
                                    onClick={() => this.submitAddressEditForm()}
                                    className='fa fa-lg fa-telegram' />
                                <Button 
                                    onClick={() => this.setState({
                                        editAddressModalOpen: !this.state.editAddressModalOpen
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
      fetchProfile: (userId) => dispatch(fetchProfile(userId)),
      updateProfile: (data) => dispatch(updateProfile(data)),
      updateAddress: (data) => dispatch(updateAddress(data))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);