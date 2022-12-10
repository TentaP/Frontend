import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from './home/homePage';
import Login from './login/login';
import SignUp from './signup/signup';
import RequestResetPassword from './resetPassword/requestResetPassword';
import ResetPassword from './resetPassword/resetPassword';
import Universities from './universities/universities';
import Course from './course/course';
import ProfilePage from './profile/profilePage';


//https://stackoverflow.com/questions/38901106/how-to-make-a-shared-state-between-two-react-components
// to Share state between components

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <>
        <div className='App'>
          <Routes>
            <Route path='/' element={<HomePage />} exact />
            <Route path='login' element={<Login />} exact />
            <Route path='signup' element={<SignUp />} exact />
            <Route path='universities' element={<Universities />} exact />
            <Route path='forget_password' element={<RequestResetPassword />} exact />
            <Route path='forget_password/reset_password' element={<ResetPassword />} exact />
            <Route path="universities/:uniName/:courseName" element={<Course />} exact />
            <Route path='profile/user/:id' element={<ProfilePage />} exact />
            <Route path='profile/admin/:id' element={<ProfilePage />} exact />

            <Route path="*" element={<Navigate to="/" />} exact />

          </Routes>
        </div>
      </>
    );
  }
}

export default App;
