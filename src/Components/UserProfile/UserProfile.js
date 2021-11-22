import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { fetchProfile } from '../../apis_redux/actions/userProfile';
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle} from "reactstrap";
import { Image } from 'react-bootstrap';
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
            name: '',
            anonymous_name: '',
            email: '',
            accountAddress: '',
            resedentailAddres: {}
        }
    }

    async componentDidMount(){

        /*if(this.props.user != this.props.userId){
            await this.props.fetchProfile(this.props.user);
        }
        else{
            await this.props.fetchProfile(this.props.user);
        }*/

        //alert(this.props.user)

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
                                <Image src={Greetings} style={{borderRadius: 20, marginBottom:20, height: 300, width:'95%'}} alt = "image" fluid />
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