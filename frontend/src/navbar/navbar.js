import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "universal-cookie";
import React, { Component } from 'react'
import history from '../history';



/*** 
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
 */

const cookies = new Cookies();
let cookie = cookies.get('jwt')

export class NavBar extends Component{

  logout (){
    cookies.remove('jwt');
    history.push('/');
    window.location.reload();
  }

  render(){
    if (cookie){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">M7011E</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3 py-5">
              </Nav>
              <Nav>
                <Nav.Link href="/universities">Universities</Nav.Link>
                <Nav.Link  onClick={this.logout}>Logout</Nav.Link>
                <span className="border border-warning">
                <img src="..." alt="..." className="rounded-circle"/>
                </span>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
  
    }else{
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">M7011E</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3 py-5">
              </Nav>
              <Nav>
                <Nav.Link href="/universities">Universities</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }

  }

  
}

export default NavBar;