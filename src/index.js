import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import history from './history';
import Cookies from "universal-cookie";
import env from './utils/env.js'

const cookies = new Cookies();
let cookie = cookies.get('jwt');
axios.defaults.baseURL = env.API_URL;
axios.defaults.headers.common = {'Authorization': `${cookie}`}




ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
 document.getElementById('root')
 );
