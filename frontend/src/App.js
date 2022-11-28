import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/homePage';
import Login from './login';
import SignUp from './signup';




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

                           
          </Routes>
        </div>
    </>
		);
	}
}

export default App;