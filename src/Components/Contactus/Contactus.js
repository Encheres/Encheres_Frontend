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
                <p data-aos="fade-up" data-aos-delay={400} className="aos-init">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.
                </p>
              </div>
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{ backgroundColor: "black" }}
          >
            <div className="col-12 col-md-10 col-lg-8">
              <div className="contact_form">
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-12">
                      <div id="success_fail_info" />
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="group aos-init">
                        <input type="text" name="name" id="name" required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Name</label>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="group aos-init">
                        <input type="text" name="email" id="name" required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="group aos-init">
                        <input type="text" name="subject" id="name" required />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="group aos-init">
                        <textarea
                          name="message"
                          id="message"
                          required
                          defaultValue={""}
                        />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Message</label>
                      </div>
                    </div>
                    <div
                      className="col-12 text-center aos-init"
                      data-aos-delay={700}
                      data-aos="fade-in"
                    >
                      <button class="btn-hover color-7">end Messagege</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
}
export default Contactus;
