import React from 'react'
import { Link } from 'react-router-dom'
import {FaCode} from 'react-icons/fa'


function Footer(props) {
  return (
    <footer
      className="main-footer text-center"
      style={{
        color: '#ffffffad',
        backgroundColor: 'rgb(34, 34, 66)',
        paddingTop: 50,
        paddingBottom: 50
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
                    Made with love by students of Punjab Engineering College.{' '}
                  </div>
                  <ul
                    className="social-links"
                    style={{ listStyle: 'none', display: 'flex',alignContent:'center' , justifyContent:'center'}}
                  >
                    <li style={{ marginRight: '12px' }}>s
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
                <h3 className="has-line-center">Meet the Creators <FaCode /> </h3>
                <div className="widget-content">
                  <ul className="contact-info" style={{ listStyle: 'none' }}>
                    <li>
                      <div className="icon">
                        <span className="flaticon-support" />
                      </div>
                    </li>
                    <li><a href='https://www.linkedin.com/in/deepanshujindal' style={{textDecoration:'none', color:'#ffffffad',}}>Deepanshu Jindal</a></li>
                    <li><a href='https://www.linkedin.com/in/bhavesh-kumar-9ab7061b1/' style={{textDecoration:'none', color:'#ffffffad'}}>Bhavesh Kumar</a></li>
                    <li><a href='https://www.linkedin.com/in/tejus-kaw-051a5218b' style={{textDecoration:'none', color:'#ffffffad'}}>Tejas Kaw</a></li>
                    <li className='has-line-center'><a href='https://www.linkedin.com/in/piyush-narwal-6a1956182/' style={{textDecoration:'none', color:'#ffffffad'}}>Piyush</a></li>
                    
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-column col-md-4 col-sm-12 col-xs-12">
              <div className="footer-widget newsletter-widget">
                <h3><Link to='/terms_and_conditions' style={{textDecoration:'none', color:'#ffffffad', }}>Terms And Conditions</Link>
                </h3>
                <div className="text">
                    Some terms you need to to agree to use our services.{' '}
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
