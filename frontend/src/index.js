import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import history from './history';
import Cookies from "universal-cookie";

const cookies = new Cookies();
let cookie = cookies.get('jwt');
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.common = {'Authorization': `${cookie}`}




ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
 document.getElementById('root')
 );
