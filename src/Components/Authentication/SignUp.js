import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Card, CardText, CardBody, Button, Container, Row, Col} from "reactstrap";
import swal from 'sweetalert';
import Form from 'react-bootstrap/Form';
import AddressForm from '../FrequentComponents/AddressForm'
import './styles.css'
import { Link } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider'
import { valid_email } from '../../variables';
import {addressValidation} from '../FrequentComponents/AddressForm';
import {handleSignUp} from '../../apis_redux/actions/auth.js';
import Web3 from 'web3';
import Account from '../../abis/Account.json';
import {Kaliedo_api} from '../../apis_redux/apis/encheres';


let web3  = new Web3(window.ethereum);

class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name:"",
            anonymous_name:"",
            email:"",
            password:"",
            address:{
                addressLine1:"",
                addressLine2:"",
                city:"",
                addressState:"",
                country:"",
                postalCode:"",
            },
            accounts:[],
            stateList:[],
            cityList:[],
            accept_conditions:false,
            account_integrated:false,
            display_first: true,
            errors:{
                name:"",
                anonymous_name:"",
                email:"",
                password:"",
                address:{
                    addressLine1:"",
                    addressLine2:"",
                    city:"",
                    addressState:"",
                    country:"",
                    postalCode:"",
                }
            },

            account_smart_contract: null,
            account_balance: '',
            account_address: ''
        }
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

    // testFxn = async () => {
    //     try{
    //     // Load account
    //     const accounts = await web3.eth.getAccounts()
    //     // const accounts = await ethereum.request({ method: 'eth_accounts' });
    //     console.log(accounts);
    //     this.setState({account_address: accounts[0]});

    //     // Load balance
    //     var balwei = await web3.eth.getBalance(accounts.toString());
    //     var baleth = await web3.utils.fromWei(balwei);
    //     this.setState({account_balance: baleth});
    //     console.log({balwei, baleth});
        
    //     // const res = await Kaliedo_api.post('/u0p31yfyo8/', {message:"hello"}); // constructor fxn
    //     //     console.log(res);
    //     //     res.send({from: this.state.account_address})
    //     }catch(e){
    //         console.log(e);
    //     }
    // }


    async loadAccountSmartContract() {
       
        const web3 = window.web3

        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({account_address: accounts[0]});

        // Load balance
        var balwei = await web3.eth.getBalance(accounts.toString());

        var baleth = await web3.utils.fromWei(balwei);
        this.setState({account_balance: baleth});

        // Network ID
        const networkId = await web3.eth.net.getId()

        const networkData = Account.networks[networkId]
        if(networkData) {
            const account_contract = new web3.eth.Contract(Account.abi, networkData.address)
            this.setState({ account_smart_contract: account_contract })
            
            await account_contract.methods.createAccount(this.props.auth.userId).send({from: this.state.account_address})
            .once('receipt', (receipt) => {

                swal({
                    title: "Woah! You are completly done",
                    text: "Blockchain Integration Successful and Signup Complete",
                    icon: "success"
                })
            });

            this.props.history.push('/');

        } else {
            swal({
                title: "OOPS!!",
                text: 'contract not deployed to detected network.',
                icon: "error"
            })
        }
    }

    async connectWithBlockchain() {
        await this.loadWeb3()
        // await this.loadAccountSmartContract();
        // await this.testFxn();

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
        const {name, anonymous_name, email, password, address} = this.state;
        let nameerror="", anonynameerror="" ,emailerror="", passworderror="";
        let error = false;

        if(name.trim().length === 0){
            error = true;
            nameerror = "* Name is required";
        }

        if(anonymous_name.trim().length === 0){
            error = true;
            anonynameerror = "* Anonymous Name is required";
        }
        
        if(email.trim().length === 0 || email.match(valid_email) === null){
            error = true;
            emailerror = "* Enter a valid email";
        }

        if(password.trim().length < 6){
            error = true;
            passworderror = "* Password should be 6 or more characters long";
        }

        const addressStatus = addressValidation(address);
        if(!error){
            error = addressStatus.error;
        }
        
        this.setState({
            errors:{
                name:nameerror,
                anonymous_name:anonynameerror,
                email:emailerror,
                password:passworderror,
                address:addressStatus.address_error
            }
        })
        
        return error;
    }

    integrateMetamaskAccount = async(e)=>{
        e.preventDefault();
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
                accounts: accounts,
                account_integrated:true
            })

            console.log(accounts)
        }catch(err){
            swal({
                title: "OOPS!!",
                text: "Metamask Account Integration failed",
                icon: "error"
            })
        }  
    }

    handleCheckboxChange = e=>{
        this.setState({
            accept_conditions: !this.state.accept_conditions
        })
    }

    handleFormSubmit = e =>{
        e.preventDefault();
        const error = this.formValidation();
        if(!error){
            this.handleFormChange();
        }
    }

    handleSubmit = async(e) =>{
        e.preventDefault();
        if(this.state.account_integrated && this.state.accept_conditions){
            const {name, anonymous_name, email, password, address, accounts} = this.state;
            const data = {
                name:name,
                anonymous_name:anonymous_name,
                email:email,
                password:password,
                address:address,
                accounts:accounts
            }
            await this.props.handleSignUp(data);
            if(this.props.auth.isSignedIn){
                swal({
                    title: "You are almost there..",
                    text: "Partial Signup done just click on Connect Ethereum Blockchain Button next.",
                    icon: "success"
                })
                console.log("SignUp Successful");
            }else{
                console.log(this.props.auth.error);
            }


        }else{
            swal({
                text: "Please integrate your account and accept the terms and conditions"
            })
        }
    }

    handleFormChange = e=>{
        // this.testFxn();
        this.setState({
            display_first: !this.state.display_first
        })
    }

    renderForm= ()=>{
        return(
            <>
                <Row className="form_heading_row blue_violet_gradient">
                    Personal Details
                </Row>

                <Form>
                    <Row className="form_input_row">
                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicName">
                            {/* <Form.Label className="form_input_label">Name</Form.Label> */}
                            <input name="name" className="form_input_field form-control" type="text" value={this.state.name} placeholder="Name" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.name}</div>
                        </Form.Group>  
                        </Col>
                        
                        
                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicAnonymousName">
                            {/* <Form.Label className="form_input_label">Anonymous Name</Form.Label> */}
                            <input name="anonymous_name" className="form_input_field form-control" type="text" value={this.state.anonymous_name} placeholder="Anonymous Name" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.anonymous_name}</div>
                            <Form.Text className="text-muted">
                               Your this  name will be displayed to other users, while participating in auction.
                            </Form.Text>
                        </Form.Group>
                        </Col>
                        
                    </Row>
                    
                    <Row className="form_input_row">
                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicEmail">
                            {/* <Form.Label className="form_input_label">Email address</Form.Label> */}
                            <input name="email" className="form_input_field form-control" type="email" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.email}</div>
                        </Form.Group>
                        </Col>

                        <Col md={6} className="form_grp">
                        <Form.Group controlId="formBasicPassword">
                            {/* <Form.Label className="form_input_label">Password</Form.Label> */}
                            <input name="password" className="form_input_field form-control" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.password}</div>
                            <Form.Text className="text-muted ">
                                Password must be at least 6 characters long.
                            </Form.Text>
                        </Form.Group>  
                        </Col>
                    </Row>

                    <AddressForm address={this.state.address} handleAddressChange = {this.handleAddressChange} errors = {this.state.errors.address}/>

                                        
                    <Button className="form__button pink_blue_gradiend_btn" onClick={this.handleFormSubmit}>
                        Next
                    </Button>

                    <br/>
                    <div class="form_direct_link">
                        <p className="text-muted ">Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                                        
                </Form>
            </>
        )
    }

    renderAccountIntegrator = () =>{
        return(
        <>
            <Row className="form_heading_row blue_violet_gradient">
                Integrate Crypto Wallet
            </Row>
            <p className="form__text--para">
                As we deal with crypto currency, we need to integrate your crypto-wallet. You will need to install <b>metamask</b> on your device, and sign in to your crypto account.
                <br/>
                You can install metamask from here: <a href='https://metamask.io/download.html' target='blank'> Download Metamask</a>
                <br/>
            </p>

            <p className='form__text--para'>
                As Encheres is being developed as a prototype application, you can create a <b>dummy crypto account using Ganache</b>. You can use this dummy account to signup to metamask and test Encheres application.
                <br/>
                You can install Ganache from here: <a href='https://www.trufflesuite.com/ganache' target='blank'> Download Ganache</a>
                <br/>

            </p>
            <Row>
                <p className='form__text--para'>
                <input type="checkbox" className="input_checkbox" id="terms_conditions" name="terms_conditions" value="" checked={this.state.accept_conditions} onChange={this.handleCheckboxChange}/> 
                        By using encheres application, you must agree to our <Link to='/terms_and_conditions' target='blank'>Terms and Conditions</Link></p>
            </Row>

            <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.integrateMetamaskAccount}>
                Enable Metamask
            </Button>

            {
                this.state.account_integrated ? <p className='form__text--para success_text'>Your account has been integrated successfully</p>:<p className='form__text--para muted_text'>Metamask account not integrated</p>
            }

            <br/><br/>
            <div>
                <Button className="form__button pink_blue_gradiend_btn" onClick={this.handleFormChange}>
                    Go Back
                </Button>
                
                {
                    this.props.auth.isSignedIn ? 
                    <Button className="form__button pink_blue_gradiend_btn" onClick={() => this.connectWithBlockchain()}>
                        Connect Blockchain and Complete Signup
                    </Button> :
                    <Button className="form__button pink_blue_gradiend_btn" onClick={this.handleSubmit}>
                        Partial SignUp
                    </Button>
                }
            </div>
        
        </>
        )
    }

    
    render() {
        return(
            <Container>
                
                <Row className="heading_section_row">
                    {/* <h3 className='rainbow-lr section_heading'>
                        SIGNUP
                    </h3> */}
                    <h3 className='section_heading rainbow-lr '>
                        Create a new account
                    </h3>
                </Row>


                <Row className="section_content">
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                    {this.state.display_first? this.renderForm():this.renderAccountIntegrator()}
                                    
                                </CardText>
                            </CardBody>
                        </Card>
                        
                    </Col>
                </Row>
                
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth:state.auth
    })

}


export default connect(mapStateToProps, {handleSignUp})(SignUp);
