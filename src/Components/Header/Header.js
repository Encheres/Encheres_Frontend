import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/Encheres.png'
import './Header.css'

class Header extends Component {

    constructor(props){
        super(props);

        this.state={
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render(){
        return (
            <div className='container-fluid'>
                <div className='row align-items-center'>
                <Navbar style={{backgroundColor: '#222242'}} 
                        id='header-navbar' 
                        dark expand="md">
                    <NavbarBrand href="/">
                        <img src={Logo} height="70" width="70" alt='Encheres' />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className='navbar-link' navbar>
                            <NavItem>
                                <NavLink className="" href="/Home/">
                                    <span className='NavBarLink fa fa-home fa-lg'/> Home
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <span className='NavBarLink fa fa-plus-square fa-lg'/> Create
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href='/create/New-Item'>
                                        Live Auction
                                    </DropdownItem>
                                    <DropdownItem href='/create/New-Item'>
                                        Independent Item
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <span className='NavBarLink fa fa-shopping-cart fa-lg'/> View
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Live Auction
                                    </DropdownItem>
                                    <DropdownItem>
                                        On Sale Assets
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="">
                                    <span className='NavBarLink fa fa-truck fa-lg'/> Shipments
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="">
                                    <span className='NavBarLink fa fa-trophy fa-lg'/> Winnings
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="">
                                    <span className='NavBarLink fa fa-search fa-lg'/>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="">
                                    <span className='NavBarLink fa fa-user-circle fa-lg'/>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='' href="">
                                    <span className='NavBarLink fa fa-question-circle fa-lg'/>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                </div>
            </div>
          );
    }
}

export default Header;