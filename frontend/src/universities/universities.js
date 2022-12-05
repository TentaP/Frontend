import Cookies from "universal-cookie";
import React, { Component } from 'react'
import history from '../history';
import NavBar from '../navbar/navbar';
import Button from 'react-bootstrap/Button';
import './universities-style.css';



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

export class Universities extends Component{


  render(){
    return(
        <>
            <NavBar/>
            <div id="container">
                <div id="child-left">
                <Button variant="light" size="lg" type="submit" >Login <span>&#10148;</span></Button>
                </div>
                <div id="vl" hidden={true}></div> 
                <div id="child-right">
                    <h1>The Name</h1>
                    <ul>
                        <item>
                            kjjj
                        </item>
                    </ul>
                </div>
            </div>
        </>
    )

  }

  
}

export default Universities;