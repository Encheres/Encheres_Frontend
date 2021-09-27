import './contactus.css';

const Contactus = () => {
    return (
        <div className="App">
            <section className="section-padding-100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading text-center">
                                <div className="dream-dots justify-content-center aos-init"><span>Get in Touch</span></div>
                                <h2 data-aos="fade-up" data-aos-delay={300} className="aos-init">Contact With Us</h2>
                                <p data-aos="fade-up" data-aos-delay={400} className="aos-init">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{backgroundColor:"black"}}>
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="contact_form">
                                <form action="#" method="post">
                                    <div className="row">
                                        <div className="col-12">
                                            <div id="success_fail_info" />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="group aos-init"><input type="text" name="name" id="name" required /><span className="highlight" /><span className="bar" /><label>Name</label></div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="group aos-init"><input type="text" name="email" id="name" required /><span className="highlight" /><span className="bar" /><label>Email</label></div>
                                        </div>
                                        <div className="col-12">
                                            <div className="group aos-init"><input type="text" name="subject" id="name" required /><span className="highlight" /><span className="bar" /><label>Subject</label></div>
                                        </div>
                                        <div className="col-12">
                                            <div className="group aos-init"><textarea name="message" id="message" required defaultValue={""} /><span className="highlight" /><span className="bar" /><label>Message</label></div>
                                        </div>
                                        <div className="col-12 text-center aos-init" data-aos-delay={700} data-aos="fade-in">
                                        <button class="btn-hover color-7">end Messagege</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="main-footer text-center">
                <div className="widgets-section padding-top-small padding-bottom-small">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
                                <div className="footer-widget about-widget">
                                    <h3 className="has-line-center">About Us</h3>
                                    <div className="widget-content">
                                        <div className="text">At the end of the day, going forward, a new normal that has evolved generation X is on the runway heading towards a streamlined cloud solution. </div>
                                        <ul className="social-links">
                                            <li><a href="#"><span className="fa fa-facebook-f" /></a></li>
                                            <li><a href="#"><span className="fa fa-twitter" /></a></li>
                                            <li><a href="#"><span className="fa fa-google-plus" /></a></li>
                                            <li><a href="#"><span className="fa fa-linkedin" /></a></li>
                                            <li><a href="#"><span className="fa fa-instagram" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
                                <div className="footer-widget contact-widget">
                                    <h3 className="has-line-center">Contact Us</h3>
                                    <div className="widget-content">
                                        <ul className="contact-info">
                                            <li>
                                                <div className="icon"><span className="flaticon-support" /></div>
                                            </li>
                                            <li>10, Mc Donald Avenue, Sunset Park, Newyork</li>
                                            <li>+99 999 9999</li>
                                            <li>info@yourdomain.com</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-column col-md-4 col-sm-12 col-xs-12">
                                <div className="footer-widget newsletter-widget">
                                    <h3 className="has-line-center">Newsletter</h3>
                                    <div className="widget-content">
                                        <div className="text">Stay Updated with our latest news. We promise not to spam</div>
                                        <div className="newsletter-form">
                                            <form method="post">
                                                <div className="form-group"><input type="email" name="field-name" placeholder="Your Email" />
                                                <button type="submit" className="send-btn"><span className="fa fa-paper-plane-o" /></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="auto-container">
                        <div className="copyright-text">Copyright ©. All Rights Reserved</div>
                    </div>
                </div>
            </footer>
        </div>

    );
}
export default Contactus;