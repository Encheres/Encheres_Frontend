import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Encheres.png";
import { LinkContainer } from "react-router-bootstrap";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row align-items-center">
          <Navbar
            style={{ backgroundColor: "#222242" }}
            id="header-navbar"
            dark
            expand="md"
          >
            <LinkContainer to="/">
              <NavbarBrand>
                <img src={Logo} height="70" width="70" alt="Encheres" />
              </NavbarBrand>
            </LinkContainer>
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav className="navbar-link" navbar>
                <NavItem>
                  <Link to="/home" className="nav-link" >
                    <span className="NavBarLink fa fa-home fa-lg" /> Home
                  </Link>
                </NavItem>
                {this.props.signedIn ? 
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <span className="NavBarLink fa fa-plus-square fa-lg" /> Add
                    </DropdownToggle>
                    <DropdownMenu right>
                      <LinkContainer to='/create/live_auction'>
                        <DropdownItem> Live Auction </DropdownItem>
                      </LinkContainer>

                      <LinkContainer to='/create/independent-digital-assets'>
                        <DropdownItem> Independent Asset </DropdownItem>
                      </LinkContainer>
                    </DropdownMenu>
                  </UncontrolledDropdown> :
                  <></>}
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span className="NavBarLink fa fa-shopping-cart fa-lg" />{" "}
                    View
                  </DropdownToggle>
                  <DropdownMenu right>
                    <LinkContainer to='/view/auctions'>
                      <DropdownItem>Auctions</DropdownItem>
                    </LinkContainer>
                    <LinkContainer to='/view/independent-digital-assets'>
                      <DropdownItem> Independent Assets </DropdownItem>
                    </LinkContainer>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  {this.props.signedIn ? 
                    <Link to="/pending-shipment" className='nav-link'>
                      <span className="NavBarLink fa fa-truck fa-lg" /> Shipments
                    </Link> : 
                    <></>}   
                </NavItem>
                <NavItem>
                  {this.props.signedIn ? 
                    <Link to="/my-winnings" className='nav-link'>
                      <span className="NavBarLink fa fa-trophy fa-lg" /> Winnings
                    </Link> :
                    <></>}
                </NavItem>
                <NavItem>
                  {this.props.signedIn ? (
                    <Link to="/logout" className='nav-link'>
                      <span className="NavBarLink fa fa-sign-out fa-lg" />
                    </Link>
                  ) : <></>}
                  
                </NavItem>
                <NavItem>
                  {this.props.signedIn ? (
                    <Link to={`/profile/${this.props.userId}`} className='nav-link'>
                      <span className="NavBarLink fa fa-user-circle fa-lg" />
                    </Link>
                  ) : (
                    <Link to="/login" className='nav-link'>
                      <span className="NavBarLink fa fa-sign-in fa-lg" />
                    </Link>
                  )}
                </NavItem>
                <NavItem>
                  <Link to="/contact-us" className='nav-link'>
                    <span className="NavBarLink fa fa-question-circle fa-lg" />
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownprops) => {
  return {
    signedIn: state.auth.isSignedIn,
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps, {})(Header);
