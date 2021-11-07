import React, { Component } from "react";
import "./contactus.css";
//redux stuff
import { connect } from "react-redux";
import { contactusform } from "../../apis_redux/actions/contactus";
class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      name: "",
      type: "",
      errors: {
        email: "",
        message: "",
        name: "",
        type: "",
        submissionError: null,
      },
      validated: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth) {
      this.setState({
        email: this.props.auth.email,
      });
    }
  }


  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }

  handleTypeChange = val =>{
    this.setState({
      type: val
    })
  }

  formValidation = () => {
    const { email, message, name, type } = this.state;
    let emailError = "",
      messageError = "",
      nameError = "",
      typeError = "",
      error = false;
    if (!email) {
      emailError = "Email is required";
      error = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      emailError = "Email address is Invalid";
      error = true;
    }
    if (!message.trim()) {
      messageError = "Message is required";
      error = true;
    }

    if (!type||!type.value) {
      typeError = "Type is required";
      error = true;
    }

    if (!name) {
      nameError = "Name is required ";
      error = true;
    }

    this.setState((prevState) => ({
      errors: {
        email: emailError,
        message: messageError,
        type: typeError,
        name: nameError,
      },
      validated: !error,
    }));
    return !error;
  };  

  handleSubmit(e) {
    e.preventDefault();
    const resp = this.formValidation();
    if (resp) {
      try {
        console.log("trying");
        const { email, message, name, type } = this.state;
        this.props.contactusform({
          email: email,
          description: message,
          name: name,
          category: type,
        });
        this.notifyS("Your response has been recorded successfully.");
      } catch (e) {
        this.notifyF("Some error occured.");
      }
    }
  }
  componentDidMount() {
    if (this.props.auth) {
      this.setState({
        email: this.props.auth.email,
      });
    }
  }

  render = () => {
    return (
      <>
        <Container>
                <Row className="heading_section_row">
                    <h3 className='section_heading rainbow-lr '>
                        Contact Us
                    </h3>
                </Row>

                <Row className="section_content">
                    
                    <Col md={12}>
                        <Card id="singup_form_card">
                            <CardBody>
                                <CardText>
                                <Row>
                                    <Col lg={6}>
                                        <Image src={ContactUsImage} className="login_image" alt="lock image" style={{height:'20rem'}} fluid/>
                                    </Col>
                                    <Col lg={6}>
                                    
                                        <Row>
                                            <h4 className="main_heading__form light__blue"> Send Us Message </h4>
                                        </Row>
                                        <div>
                                          <Form className="login_form">
                                          <Row className="form_input_row form_grp">
                                            <Form.Group controlId="formBasicEmail">
                                                {/* <Form.Label className="form_input_label">Email</Form.Label> */}
                                                <input name="email" className="form_input_field form-control" type="text" value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
                                                <div id='new-item-form-error' className="invalid__feedback">{this.state.errors.email}</div>
                                            </Form.Group>  
                                          </Row>
                                            
                                          <Row className="form_input_row form_grp">
                                            <Form.Group controlId="formBasicName">
                                                <input name="name" className="form_input_field form-control" type="text" value={this.state.name} placeholder="Name" onChange={this.handleInputChange} />
                                                <div id='new-item-form-error' className="invalid__feedback">{this.state.errors.name}</div>
                                            </Form.Group>                  
                                        </Row>
                                        <Row className="form_input_row form_grp">
                                          <Form.Group controlId="formBasicName">
                                            <Select styles={customSelectStyles}  name="type" options={contactOptions} className="basic-multi-select form_input_field" value={this.state.type} onChange={this.handleTypeChange} classNamePrefix="select" placeholder="Select Type"/>
                                            <div id='new-item-form-error'>{this.state.errors.type}</div>
                                          </Form.Group>
                                        </Row>

                                        <Row className="form_input_row form_grp">
                                          <Form.Group controlId="formBasicName">
                                            <textarea name="message" className="form_input_field form-control" type="text" value={this.state.message} placeholder="Message" onChange={this.handleInputChange}  rows={3}/>
                                            <div id='new-item-form-error'>{this.state.errors.message}</div>
                                          </Form.Group>
                                        </Row>

                                        <Button className="form__button pink_blue_gradiend_btn" type="submit" onClick={this.handleSubmit}>
                                            Send
                                        </Button>
                                          </Form>
                                        </div>
                                        
                                    </Col>
                                </Row>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
      </>
    );
  };
}
const mapStateToProps = (state) => {
  return { auth: state.auth.user };
};

export default connect(mapStateToProps, {contactusform})(Contactus);
