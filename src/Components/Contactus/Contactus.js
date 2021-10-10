import React, { Component } from "react";
import "./contactus.css";

class Contactus extends Component {
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
                      placeholder="Email"
                    />
                    <span className="highlight" />
                    <span className="bar" />
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
                      placeholder="Name"
                    />
                    <span className="highlight" />
                    <span className="bar" />
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
                      name="plan"
                      id="plan"
                      required
                      style={{
                        backgroundColor: "rgb(34, 34, 66)",
                        color: "white",
                      }}
                    >
                      <option value="complaint">Complaint</option>
                      <option value="feedback">Feedback</option>
                      <option value="help">Help</option>
                    </select>
                    <span className="highlight" />
                    <span className="bar" />
                  </div>
                </div>
                <div>
                  <div className="group aos-init">
                    <textarea
                      name="message"
                      id="message"
                      required
                      placeholder="Feedback"
                      defaultValue={""}
                    />
                    <span className="highlight" />
                    <span className="bar" />
                  </div>
                </div>
                <div
                  className="col-12 text-center aos-init"
                  data-aos-delay={700}
                  data-aos="fade-in"
                >
                  <button class="btn-hover color-7">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
}
export default Contactus;
