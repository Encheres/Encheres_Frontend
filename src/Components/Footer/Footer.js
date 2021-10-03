import React from 'react'
import { Link } from 'react-router-dom'

function Footer(props) {
  return (
    <footer
      className="main-footer text-center"
      style={{
        color: '#ffffffad',
        backgroundColor: 'rgb(34, 34, 66)',
      }}
    >
      <div
        className="widgets-section padding-top-small padding-bottom-small"
        style={{ display: 'flex', alignContent: 'space-between' }}
      >
        <div className="container">
          <div className="row clearfix">
            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
              <div className="footer-widget about-widget">
                <h3 className="has-line-center">About Us</h3>
                <div className="widget-content">
                  <div className="text">
                    At the end of the day, going forward, a new normal that has
                    evolved generation X is on the runway heading towards a
                    streamlined cloud solution.{' '}
                  </div>
                  <ul
                    className="social-links"
                    style={{ listStyle: 'none', display: 'flex' }}
                  >
                    <li style={{ marginRight: '12px' }}>
                      <a href="#">
                        <span className="fa fa-facebook-f" />
                      </a>
                    </li>
                    <li style={{ marginRight: '12px' }}>
                      <a href="#">
                        <span className="fa fa-twitter" />
                      </a>
                    </li>
                    <li style={{ marginRight: '12px' }}>
                      <a href="#">
                        <span className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li style={{ marginRight: '12px' }}>
                      <a href="#">
                        <span className="fa fa-linkedin" />
                      </a>
                    </li>
                    <li style={{ marginRight: '12px' }}>
                      <a href="#">
                        <span className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
              <div className="footer-widget contact-widget">
                <h3 className="has-line-center">Contact Us</h3>
                <div className="widget-content">
                  <ul className="contact-info" style={{ listStyle: 'none' }}>
                    <li>
                      <div className="icon">
                        <span className="flaticon-support" />
                      </div>
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
                  <div className="text">
                    Stay Updated with our latest news. We promise not to spam
                  </div>
                  <div className="newsletter-form">
                    <form method="post">
                      <div className="form-group">
                        <input
                          type="email"
                          name="field-name"
                          placeholder="Your Email"
                        />
                        <button type="submit" className="send-btn">
                          <span className="fa fa-paper-plane-o" />
                        </button>
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
  )
}

export default Footer
