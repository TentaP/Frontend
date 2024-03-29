import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "universal-cookie";
import React, { Component } from 'react';
import history from '../history';
import logo from '../../src/logo.jpg' // relative path to image 
import './navbar-style.css';
import axios from 'axios';







const cookies = new Cookies();

export class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernamme: null,
      usertype: null,
    };

  }

  componentDidMount() {
    /**
     * check if the browser have a cookie to use it as header when requesting user information
     */
    if (cookies.get('jwt')) {
      axios.defaults.withCredentials = true;
      axios.get('/user').then((res) => {
        if(res.data.is_superuser || res.data.is_admin){
          this.setState({
            usernamme: res.data.username,
            usertype: 'admin',
          })
        }else{
          this.setState({
            usernamme: res.data.username,
            usertype: 'user',
          })
        }
      }).catch((error) => {
      });
    }
  }



  backHome() {
    return true;
  }

  logout() {
    cookies.remove('jwt', { path: '/' })
    cookies.remove('jwt', { path: '/profile/user/:id' })
    cookies.remove('jwt', { path: '/profile/admin/:id' })
    cookies.remove('jwt', { path: '/universities/:uniName/:courseName' })
    history.push("/");
    window.location.reload()
  }

  render() {
    if (cookies.get('jwt')) {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">TentaP</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3 py-5">
              </Nav>
              <Nav>
                <Nav.Link href="/universities">Universities</Nav.Link>
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                <span id='profile-img-span'>
                  <Nav.Link href={`/profile/${this.state.usertype}/${this.state.usernamme}`}><img id="profile-img" src={logo} alt="..." className="rounded-circle" /></Nav.Link>
                </span>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );

    } else {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">TentaP</Navbar.Brand>
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
