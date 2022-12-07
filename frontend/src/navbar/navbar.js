import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "universal-cookie";
import React, { Component } from 'react';
import history from '../history';





const cookies = new Cookies();

export class NavBar extends Component{
  
  backHome(){
    console.log('backHome');
    return true;
  }

  logout (){
    cookies.remove('jwt')
    history.push("/");
    window.location.reload()
  }

  render(){
    if (cookies.get('jwt')){
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