import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/homePage';
import Login from './login/login';
import SignUp from './signup/signup';
import RequestResetPassword from './resetPassword/requestResetPassword';
import ResetPassword from './resetPassword/resetPassword';




class App extends Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

 

	render() {
		return (
      <>

        <div className='App'>
            <Routes>
                <Route path='/' element={<HomePage/>} exact />   
                <Route path='login' element={<Login/>} exact />  
                <Route path='signup' element={<SignUp/>} exact /> 
                <Route path='forget_password' element={<RequestResetPassword/>} exact />  
                <Route path='forget_password/reset_password' element={<ResetPassword/>} exact />  

 

                           
          </Routes>
        </div>
    </>
		);
	}
}

export default App;