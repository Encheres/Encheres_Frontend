import React, { Component } from 'react'
import {Row, Col} from "reactstrap";
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import { State, City }  from 'country-state-city';
import { countryList, customSelectStyles} from '../../variables';
import './styles.css'

export const addressValidation = (prop)=>{
    const {addressLine1, city, addressState, country, postalCode} = prop;
    let a1error="", cityerror="", stateerror="", countryerror="", postcodeerror="";
    let error = false;
    
    if(!addressLine1 ||addressLine1.trim().length === 0){
        a1error = "Address Line 1 is required";
        error = true;
    }
    
    if(!city ||city.trim().length === 0){
        cityerror = "City is required";
        error = true;
    }
    
    if(!addressState ||addressState.trim().length === 0){
        stateerror = "State is required";
        error = true;
    }
    
    if(!country || country.trim().length === 0){
        countryerror = "Country is required";
        error = true;
    }

    if(!postalCode || postalCode.trim().length === 0){
        postcodeerror = "Postal Code is required";
        error = true;
    }

    let address_error = {
        addressLine1:a1error,
        city:cityerror,
        addressState:stateerror,
        country:countryerror,
        postalCode:postcodeerror
    }
    return {error, address_error};
}

class AddressForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            stateList: [],
            cityList:[],
            selectedState:"",
            selectedCountry:"",
            selectedCity:"",
            address: {
                addressLine1:this.props.address.addressLine1,
                addressLine2:this.props.address.addressLine2,
                city:"",
                state: "",
                country:"",
                postalCode:this.props.address.postalCode,
            }
        }
    }
    componentDidMount(){
        this.props.handleAddressChange(this.state.address);
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState(prevState => ({
            address: {
                ...prevState.address,
                [name]: value
            },
        }), ()=>{
            this.props.handleAddressChange(this.state.address);
        });
    }

    handleCountryChange = value=>{
        let states = State.getStatesOfCountry(value.country_code);
        let newStateList = []
        for(var i=0;i<states.length;i++){
            var obj = {label:states[i].name, value:states[i].name, state_code:states[i].isoCode, country_code:states[i].countryCode}
            newStateList.push(obj);   
        }

        this.setState(prevState => ({
            selectedCountry:value,
            stateList: newStateList,
            selectedCity:"",
            selectedState:"",
            address:{
                ...prevState.address,
                addressState:"",
                city:"",
                country:value.value,
            }
        }), ()=>{
            this.props.handleAddressChange(this.state.address);
        })
    }

    handleAddressStateChange = value =>{
        let cities = City.getCitiesOfState(value.country_code, value.state_code);
        let newCityList = [];
        for(var i=0;i<cities.length;i++){
            var obj = {label:cities[i].name, value:cities[i].name, state_code:cities[i].stateCode, country_code:cities[i].countryCode}
            newCityList.push(obj);   
        }
        this.setState(prevState => ({
            selectedState:value,
            cityList: newCityList,
            selectedCity:"",
            address:{
                ...prevState.address,
                addressState:value.value,
                city:"",
                
            }
        }), ()=>{
            this.props.handleAddressChange(this.state.address);
        })
    }

    handleCityChange = value =>{
        this.setState(prevState => ({
            selectedCity:value,
            address:{
                ...prevState.address,
                city:value.value,
            }
        }), ()=>{
            this.props.handleAddressChange(this.state.address);
        })
    }


    render(){
        
        return(
            <React.Fragment>
                <Row className="form_input_row">
                    <Col md={6} className="form_grp">
                    <Form.Group controlId="formBasicAddress1">
                        {/* <Form.Label className="form_input_label">AddrerssLine1</Form.Label> */}
                        <input name="addressLine1" className="form_input_field form-control" type="text" value={this.state.address.addressLine1} placeholder="AddressLine 1" onChange={this.handleInputChange} />
                        <div className="invalid__feedback">{this.props.errors.addressLine1}</div>
                    </Form.Group>  
                    </Col>
                                            
                                            
                    <Col md={6} className="form_grp">
                    <Form.Group controlId="formBasicAddress2">
                        {/* <Form.Label className="form_input_label">AddrerssLine2</Form.Label> */}
                        <input name="addressLine2" className="form_input_field form-control" type="text" value={this.state.address.addressLine2} placeholder="AddressLine 2" onChange={this.handleInputChange} />
                        <div className="invalid__feedback">{this.props.errors.addressLine2}</div>
                    </Form.Group>
                    </Col>                  
                </Row>

                <Row className="form_input_row">
                    <Col md={6} className="form_grp">
                        <Form.Group controlId="user__country">
                            {/* <Form.Label className="form_input_label">Country</Form.Label> */}
                            <Select styles={customSelectStyles}  name="country" options={countryList} className="basic-multi-select form_input_field" value={this.state.selectedCountry} onChange={this.handleCountryChange} classNamePrefix="select" placeholder="Country"/>
                            <div className="invalid__feedback">{this.props.errors.country}</div>
                        </Form.Group>        
                    </Col>
                    
                    <Col md={6} className="form_grp">
                        <Form.Group controlId="user__state">
                            {/* <Form.Label className="form_input_label"> State</Form.Label> */}
                            <Select styles={customSelectStyles} name="addressState" options={this.state.stateList} className="basic-multi-select" value={this.state.selectedState} onChange={this.handleAddressStateChange} classNamePrefix="select" placeholder="State"/>
                            <div className="invalid__feedback">{this.props.errors.addressState}</div>
                        </Form.Group>        
                    </Col>
                </Row>

                <Row className="form_input_row">
                    <Col md={6} className="form_grp">
                        <Form.Group controlId="user__city">
                            {/* <Form.Label className="form_input_label"> City</Form.Label> */}
                            <Select isClearable styles={customSelectStyles} name="city" options={this.state.cityList} className="basic-multi-select" value={this.state.selectedCity} onChange={this.handleCityChange} classNamePrefix="select" placeholder="City"/>
                            <div className="invalid__feedback">{this.props.errors.city}</div>
                        </Form.Group>
                    </Col>

                    <Col md={6} className="form_grp">
                        <Form.Group controlId="user__zip">
                            {/* <Form.Label className="form_input_label"> Postal Code</Form.Label> */}
                            <input name="postalCode" className="form_input_field form-control" type="text" value={this.state.address.postalCode} placeholder="Postal Code" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.props.errors.postalCode}</div>
                        </Form.Group>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

}
export default AddressForm;