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

export class RequestResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    /**
     * check if the browser have a cookie to use it as header when requesting user information
     */
    if(cookie) {
      axios.defaults.withCredentials = true;
      axios.get('/user').then((res)=> {
        console.log(res.data)
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

    //
    if(this.handleValidation()){

    // post login with the data...
      axios.post('/request_password_reset_token', {
        "email": this.state.email,
      })
      .then(function (response) {
        document.getElementById("detail-msg").innerHTML = response.data.detail;
        $("#detail-msg").show();
        $("#detail-msg").css("color", "green");
        setTimeout(function() { $("#detail-msg").hide(); }, 5000);
        document.getElementById("redirect-msg").innerHTML = "You should be automatically redirected soon"; //TODO add sleep time
        history.push('/forget_password/reset_password'); 
        window.location.reload();

      })
      .catch(function (error) {
        console.log(error.response.data)
        document.getElementById("detail-msg").innerHTML = JSON.stringify(error.response.data.detail);
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
    let email = this.state.email;
    let formIsValid = true;

    if(!email){
      formIsValid = false;
    }
    return formIsValid;
    }

    render(){
      return (
        <>
        <NavBar/>
        <MDBContainer fluid>
        <form onSubmit={this.handleSubmit}>

          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
    
              <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
    
                  <h2 className="fw-bold mb-2 text-uppercase" id='h2-titel'>Request Reset Token</h2>
                  <p className="text-white-50 mb-5" id='h2-titel'>Please enter your email to requset a password reset token!</p>
    
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
    
                  <Button id='login-btn' variant="light" size="lg" type="submit" >Request a token</Button>
    
                  <div>
                    
                    <p id='detail-msg' style={{"textAlign": "center"}}></p>
                    <p id='redirect-msg' style={{"textAlign": "center"}}> </p>
    
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

export default RequestResetPassword;
