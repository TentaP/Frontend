import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/homePage';
import Login from './login/login';
import SignUp from './signup/signup';
import ProfilePage from './pages/profilePage';


//https://stackoverflow.com/questions/38901106/how-to-make-a-shared-state-between-two-react-components
// to Share state between components

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
                <Route path='profile' element={<ProfilePage/>} exact />  
                           
          </Routes>
        </div>
    </>
		);
	}
}

export default App;
