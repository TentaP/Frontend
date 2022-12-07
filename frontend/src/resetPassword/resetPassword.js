import React, { Component } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import './requestResetPassword-style.css'
import Button from 'react-bootstrap/Button';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import history from '../history';
import $ from 'jquery';
import Cookies from "universal-cookie";


const cookies = new Cookies();
let cookie = cookies.get('jwt')

//https://mdbootstrap.com/docs/react/extended/login-form/

export class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(cookie) {
      axios.get('/user').then((res)=> {
        if (res.data.is_superuser){
          console.log("is_superuser") //TODO
        }else if (res.data.is_admin){
          console.log('is_admin') //TODO
        }else{
          console.log('normal user') //TODO
        }
      }).catch((error) =>{
        console.log(error)
      });

    }
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.handleValidation()){
      let data =JSON.stringify({
        "token": this.state.token,
        "email": this.state.email,
        "password": this.state.password
      });

      axios.put('/reset_password_via_token', data)
      .then(function (response) {
        console.log(response.data)
        console.log(response.status)
        document.getElementById("detail-msg").innerHTML = response.data.detail;
        $("#detail-msg").show();
        $("#detail-msg").css("color", "green");
        setTimeout(function() { $("#detail-msg").hide(); }, 5000);
        history.push('/login'); 
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response.data)
        document.getElementById("detail-msg").innerHTML = JSON.stringify(error.response.data);
        $("#detail-msg").show();
        $("#detail-msg").css("color", "red");
        setTimeout(function() { $("#detail-msg").hide(); }, 5000);
      });
    }else{
      document.getElementById("detail-msg").innerHTML = "All fields are mandatory";
      $("#detail-msg").show();
      $("#detail-msg").css("color", "red");
      setTimeout(function() { $("#detail-msg").hide(); }, 5000);
    }
  }

  handleValidation(){
    let token = this.state.token;
    let email = this.state.email;
    let password = this.state.password;
    let formIsValid = true;

    if(!token){
      formIsValid = false;
    }
    if(!password){
      formIsValid = false;
    }

    if(!email){
      formIsValid = false;
    }

    return formIsValid;
    }



  render() { 
      return (
        <>
        <NavBar/> 
        <MDBContainer fluid>
        <form onSubmit={this.handleSubmit}>
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
              <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                  <h2 className="fw-bold mb-2 text-uppercase">Reset Password</h2>
                  <p className="text-white-50 mb-5">Please enter your information</p>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Token' id='formControlLg' type='text' name="token" value={this.state.token} onChange={this.handleInputChange}/>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='New password' id='formControlLg' type='password' name="password" value={this.state.password} onChange={this.handleInputChange}/>    
                  <Button id='login-btn' variant="light" size="lg" type="submit" >Reset Password</Button>
                  <div>
                    <p id='detail-msg' style={{"textAlign": "center"}}></p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          </form>
        </MDBContainer>
        </>
      );  
    }
  }

export default ResetPassword;
