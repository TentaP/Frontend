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
                console.log(response.data)
                this.setState({ unis: response.data })
            })
            .catch((error) => {
                //history.push('/');
                //window.location.reload();
            })
        
    }

/**
    deleteConfirmation(id) {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure to delete ${id}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteFunction(id)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };

    deleteFunction(id) {
        axios.defaults.withCredentials = true;
        axios
            .delete(`/course/${id}`)
            .then(() => {
                alert(`${id} has been deleted`)
                window.location.reload();

            })
            .catch((error) => {
                alert(`${error}`)
            })
    }
 **/



    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return (
            <>
                <div>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                  <Form.Label column sm="2">Email address</Form.Label>
                  <Col sm="8">
                  <Form.Control type="email" placeholder="Enter email" />
                  </Col>
                  <Col sm="2">
                  <Button variant="primary" type="submitEmail">
                    Submit
                  </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                  <Form.Label column sm="2">Password</Form.Label>
                  <Col sm="4">
                  <Form.Control type="curPassword" placeholder="Current Password" />
                  </Col>
                  <Col sm="4">
                  <Form.Control type="newPassword" placeholder="new Password" />
                  </Col>
                  <Col sm="2">
                  <Button variant="primary" type="submitPassword">
                    Submit
                  </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formUniSelect">
                  <Form.Label column sm="2">University</Form.Label>
                  <Col sm="8">
                  <Form.Select value={this.state.unis}/>
                  </Col>
                  <Col sm="2">
                  <Button variant="primary" type="submitAvatar">
                    Submit
                  </Button>
                  </Col>
                </Form.Group>

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
