import React, { Component } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import './login-style.css'
import Button from 'react-bootstrap/Button';
import NavBar from '../navbar/navbar';
import axios from 'axios';
import history from '../history';
import $ from 'jquery';
import Cookies from "universal-cookie";


const cookies = new Cookies();
let cookie = cookies.get('jwt')

//https://mdbootstrap.com/docs/react/extended/login-form/

export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    const cookies = new Cookies();

    //
    if(this.handleValidation()){

    // post login with the data...
      axios.post('/login', {
        "email": this.state.email,
        "password": this.state.password
      })
      .then(function (response) {
        cookies.set('jwt', response.data.access, {path: '/', expires: new Date(Date.now()+2592000)});
        document.getElementById("detail-msg").innerHTML = response.data.detail;
        $("#detail-msg").show();
        $("#detail-msg").css("color", "green");
        setTimeout(function() { $("#detail-msg").hide(); }, 5000);
        //history.push('/'); 
        //window.location.reload();
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
    let email = this.state.email;
    let password = this.state.password;
    let formIsValid = true;
    
    if(!password){
      formIsValid = false;
    }

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
    
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
    
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' name="password" value={this.state.password} onChange={this.handleInputChange}/>    
    
                  <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                  <Button id='login-btn' variant="light" size="lg" type="submit" >Login</Button>
    
                  <div>
                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
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

export default Login;
