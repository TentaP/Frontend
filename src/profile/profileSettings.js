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
      imageToUpload: null,
      password: "",
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
        this.setState({ unis: response.data });
      })
      .catch((error) => {
        //history.push('/');
        //window.location.reload();
      })

  }

  onChangeUniversity = (e) => {
    e.preventDefault();
    this.setState({ uni: e.target.value });

  }

  onSubmitUniversity = (e) => {
    e.preventDefault();
    if (this.state.uni == this.state.user.university) {
      alert("No change");
      return;
    } else {
      axios.defaults.withCredentials = true;
      axios
        .put(`/user/uni/${this.state.uni}`)
        .then(() => {
          alert(`success`)
          this.setState({ user: { university: this.state.uni } });
          window.location.reload();

        })
        .catch((error) => {
          alert(`${error}`)
        })
    }
  }

  onChangeAvatar = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    this.setState({ imageToUpload: e.target.files[0] });
  }

  onDeleteAvatar = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .delete('/user/avatar')
      .then((response) => {
        /**
        history.push('/profile/User/' + this.state.user.username);
         **/
        window.location.reload();
      })
      .catch((error) => {
        alert(`${error}`)
      })

  }

  onSubmitAvatar = (e) => {
    e.preventDefault();

    if (this.state.imageToUpload.type == "image/png" || this.state.imageToUpload == null) {
      const formData = new FormData();
      formData.append('avatar', this.state.imageToUpload);
      axios.defaults.withCredentials = true;
      axios
        .post('/user/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          /**
          history.push('/profile/User/' + this.state.user.username);
           **/
          window.location.reload();
        })
        .catch((error) => {
          alert(`${error}`)
        })

    } else {
      alert("File type not supported");
    }

  }

  onChangePassword = (e) => {
    e.preventDefault();
    this.setState({ password: e.target.value });

  }

  onSubmitPassword = (e) => {
    e.preventDefault();
    let data = { "password": this.state.password }
    axios.defaults.withCredentials = true;
    axios
      .put(`/reset_password`, data)
      .then(() => {
        alert(`Your password has been changed, plases login agin with the new password`)
        cookies.remove('jwt', { path: '/' })
        cookies.remove('jwt', { path: '/profile/user/:id' })
        cookies.remove('jwt', { path: '/profile/admin/:id' })
        cookies.remove('jwt', { path: '/universities/:uniName/:courseName' })
        history.push("/login");
        window.location.reload()
      })
      .catch((error) => {
        alert(`${error}`)
      })

  }



  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    return (
      <>
        <div>
          <Form onSubmit={this.onSubmitUniversity}>
            <Form.Group as={Row} className="mb-3" controlId="formUniSelect">
              <Form.Label column sm="2">University</Form.Label>
              <Col sm="8">
                <Form.Select
                  value={this.state.uni}
                  onChange={this.onChangeUniversity}
                >
                  <option value={null}>select a university</option>

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
          <Form onSubmit={this.onSubmitAvatar}>
            <Form.Group as={Row} className="mb-3" controlId="formAvatar">
              <Form.Label column sm="2">Avatar</Form.Label>
              <Col sm="6">
                <Form.Control type="file" onChange={this.onChangeAvatar} />
              </Col>
              <Col sm="2">
                <Button onClick={this.onDeleteAvatar} variant="danger" type="submitAvatar">
                  Delete
                </Button>
              </Col>
              <Col sm="2">
                <Button variant="primary" type="submitAvatar">
                  Submit
                </Button>
              </Col>
              <Form.Text className="text-muted">
                Png files only
              </Form.Text>
            </Form.Group>
          </Form>

          {/**
                  change password
          **/}
          <Form onSubmit={this.onSubmitPassword}>
            <Form.Group as={Row} className="mb-3" controlId="formAvatar">
              <Form.Label column sm="2">new password</Form.Label>
              <Col sm="6">
                <Form.Control type="password" onChange={this.onChangePassword} />
              </Col>
              <Col sm="2">
              </Col>
              <Col sm="2">
                <Button variant="primary" type="submitpassword">
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
