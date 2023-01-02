import Cookies from "universal-cookie";
import React, { Component } from 'react'
import history from '../history';
import NavBar from '../navbar/navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import DropDown from 'react-bootstrap/Dropdown';
import DropDownButton from 'react-bootstrap/DropdownButton';
import FormData from 'form-data';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";



const cookies = new Cookies();
let cookie = cookies.get('jwt')


export class ProfileCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          unis: [],
          uni: this.props.user.university, //this is the current uni pk
          newEmail: "",
        };
    }


    componentDidMount() {
        if (!cookie) {
            history.push('/');
            window.location.reload();
        }
        axios.defaults.withCredentials = true;
        axios
            .get('/uni')
            .then((response) => {
                console.log(this.state.uni);
              this.setState({ unis: response.data});
            })
            .catch((error) => {
                //history.push('/');
                //window.location.reload();
            })
        
    }

  onChangeUniversity = (e) => {
    e.preventDefault();
    this.setState({uni: e.target.value});

  }

  onSubmitUniversity = (e) => {
    e.preventDefault();
    if (this.state.uni == this.state.user.university) {
      alert("No change");
      return;
    } else {
      axios.defaults.withCredentials = true; //TODO: noreload and update state
      axios
          .put(`/user/uni/${this.state.uni}`)
          .then(() => {
              alert(`success`)
              this.setState({user: {university: this.state.uni}});

          })
          .catch((error) => {
              alert(`${error}`)
          })
    }
  }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return (
            <>
                <div>
                  {/**
              <Form onSubmit={this.onSubmitEmail}>
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                  <Form.Label column sm="2">Email address</Form.Label>
                  <Col sm="8">
                  <Form.Control name="emailInput" type="text" placeholder="Enter email" 
                    onChange={this.onInput} value={this.state.newEmail}/>
                  </Col>
                  <Col sm="2">
                  <Button variant="primary" type="submitEmail">
                    Submit
                  </Button>
                  </Col>
                </Form.Group>
                </Form>

                  <Form>
                <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                  <Form.Label column sm="2">Password</Form.Label>
                  <Col sm="4">
                  <Form.Control type="Password" placeholder="Current Password" />
                  </Col>
                  <Col sm="4">
                  <Form.Control type="Password" placeholder="new Password" />
                  </Col>
                  <Col sm="2">
                  <Button variant="primary" type="submitPassword">
                    Submit
                  </Button>
                  </Col>
                </Form.Group>
                    **/}

                <Form onSubmit={this.onSubmitUniversity}>
                  <Form.Group as={Row} className="mb-3" controlId="formUniSelect">
                    <Form.Label column sm="2">University</Form.Label>
                    <Col sm="8">
                    <Form.Select 
                      value={this.state.uni}
                      onChange={this.onChangeUniversity}
                      >
                      {this.state.unis.map((uni) => (
                        <option key={uni.university_name} value={uni.id}>{uni.university_name}</option>
                      ))}
                      </Form.Select>
                    </Col>
                    <Col sm="2">
                    <Button variant="primary" type="submitUni">
                      Submit
                    </Button>
                    </Col>
                  </Form.Group>
                </Form>

                {/**
                  avatar submit low priority
                  **/}
                <Form>
                <Form.Group as={Row} className="mb-3" controlId="formAvatar">
                  <Form.Label column sm="2">Avatar</Form.Label>
                  <Col sm="8">
                  <Form.Control type="file"/>
                  </Col>
                  <Col sm="2">
                  <Button variant="primary" type="submitAvatar">
                    Submit
                  </Button>
                  </Col>
                </Form.Group>
              </Form>
                </div>
            </>
        )
    }
}

export default ProfileCourses;
