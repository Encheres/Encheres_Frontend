import React, { Component } from "react";
import "./contactus.css";
//redux stuff
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
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
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value,
    });
  }
  notifyS = (message) => toast.success(message);
  notifyF = (message) => toast.error(message);

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

    if (!type) {
      typeError = "A type is required";
      error = true;
    }

    if (!name) {
      nameError = "A Name is required ";
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
      <section className="section-padding-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading text-center">
                <div className="dream-dots justify-content-center aos-init">
                  <span>Get in Touch</span>
                </div>
                <h2
                  data-aos="fade-up"
                  data-aos-delay={300}
                  className="aos-init"
                >
                  Contact With Us
                </h2>
              </div>
            </div>
            <div className="contactus_main">
              <div className="left">
                <h2> We are here to help you</h2>
                <div className="contact_left_small">
                  <i
                    className="fa fa-home fa-3x"
                    style={{ padding: "5px" }}
                  ></i>
                  <div style={{ marginLeft: "8px" }}>
                    <h5>Company Address</h5>
                    <p>10, Mc Donald Avenue, Sunset Park, Newyork</p>
                  </div>
                </div>
                <div className="contact_left_small">
                  <i
                    className="fa fa-envelope fa-3x"
                    style={{ padding: "5px" }}
                  ></i>
                  <div style={{ marginLeft: "5px" }}>
                    <h5>Email Address</h5>
                    <p>info@yourdomain.com</p>
                  </div>
                </div>
                <div className="contact_left_small">
                  <i
                    className="fa fa-phone fa-3x"
                    style={{ padding: "5px" }}
                  ></i>
                  <div style={{ marginLeft: "13px" }}>
                    <h5>Contact</h5>
                    <p>+99 999 9999</p>
                  </div>
                </div>
                <div className="sociallinks">
                  <ul
                    className="social-links"
                    style={{ listStyle: "none", display: "flex" }}
                  >
                    <li style={{ marginRight: "12px" }}>
                      <a href="#">
                        <span className="fa fa-facebook-f" />
                      </a>
                    </li>
                    <li style={{ marginRight: "12px" }}>
                      <a href="#">
                        <span className="fa fa-twitter" />
                      </a>
                    </li>
                    <li style={{ marginRight: "12px" }}>
                      <a href="#">
                        <span className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li style={{ marginRight: "12px" }}>
                      <a href="#">
                        <span className="fa fa-linkedin" />
                      </a>
                    </li>
                    <li style={{ marginRight: "12px" }}>
                      <a href="#">
                        <span className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right">
                <h1>Send Us Message</h1>
                <div className="input-flex">
                  <div
                    className="group aos-init"
                    style={{ marginRight: "10px" }}
                  >
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={this.state.email}
                      placeholder="Email"
                      onChange={this.handleInputChange}
                    />
                    <span className="highlight" />
                    <span className="bar" />

                    <div className="invalid__feedback">
                      {this.state.errors.email}
                    </div>
                  </div>
                  <div
                    className="group aos-init"
                    style={{ marginRight: "10px" }}
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={this.state.name}
                      placeholder="Name"
                      onChange={this.handleInputChange}
                    />
                    <span className="highlight" />
                    <span className="bar" />

                    <div className="invalid__feedback">
                      {this.state.errors.name}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="group aos-init"
                    style={{ marginRight: "10px" }}
                  >
                    <select
                      name="type"
                      id="type"
                      required
                      style={{
                        backgroundColor: "rgb(34, 34, 66)",
                        color: "white",
                      }}
                      onChange={async (e) => {
                        console.log(e.target[e.target.selectedIndex].text);
                        this.setState({
                          type: e.target[e.target.selectedIndex].text,
                        });
                      }}
                    >
                      <option value="">--Please choose an option--</option>
                      <option value="complaint">Complaint</option>
                      <option value="feedback">Feedback</option>
                      <option value="help">Help</option>
                    </select>

                    <div className="invalid__feedback">
                      {this.state.errors.type}
                    </div>
                    <span className="highlight" />
                    <span className="bar" />
                    <br />
                  </div>
                </div>

                <div>
                  <div className="group aos-init">
                    <textarea
                      name="message"
                      id="message"
                      required
                      placeholder="Feedback"
                      onChange={this.handleInputChange}
                    />
                    <span className="highlight" />
                    <span className="bar" />

                    <div className="invalid__feedback">
                      {this.state.errors.message}
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 text-center aos-init"
                  data-aos-delay={700}
                  data-aos="fade-in"
                >
                  <button class="btn-hover color-7" onClick={this.handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
}
const mapStateToProps = (state) => {
  return { auth: state.auth.user };
};

export default connect(mapStateToProps, {contactusform})(Contactus);
