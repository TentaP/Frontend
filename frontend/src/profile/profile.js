import React, { Component } from 'react';
import axios from 'axios';
import './profile-style.css';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import ProfileCard from './profile-card';
import history from '../history';


const cookies = new Cookies();
let cookie = cookies.get('jwt')

//TODO: img to base64, post to api in settings, get from api, display img, base
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "test",
      email: "test@test.com",
      currentMenu: "Settings",
      loading: true,
    }
  }

  componentDidMount() {
    /**
     * check if the browser have a cookie to use it as header when requesting user information
     */
    if (cookie) {
      axios.defaults.withCredentials = true;
      axios.get('/user').then((res) => {

        this.setState({
          name: res.data.username,
          email: res.data.email,
          loading: false
        })

      }).catch((error) => {
        this.setState({
          loading: true
        })
        history.push(`/`);
        window.location.reload();
      });

      /**
      axios.get('/user/image', {
        responseType: 'blob',
      }).then((res)=> {

        var reader = new window.FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = () => {
          this.setState({
            avatar64: reader.result.split(',')[1]
          })
        }
      }).catch((error) =>{
        console.log(error)
      });
      **/
    } else {
      history.push(`/`);
      window.location.reload();
    }
  }

  handleButtonclick = (event) => {
    if (event.target.id !== this.state.currentMenu) {
      this.setState({ currentMenu: event.target.id });

    }
  }

  render() {
    if (this.state.loading) {
      <></>

    } else {
      return (

        <>
          <div id="container">
            <div id="child-left">

              <ProfileCard
                image={this.state.avatar64}
                email={this.state.email}
                name={this.state.name} />
              <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Settings">Settings</Button>
              <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Courses">Courses</Button>
              <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Files">Files</Button>
              <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Reviews">Reviews</Button>

            </div>
            <div id="child-right" >
              <h1> TEST </h1>

            </div>
          </div>
        </>

      );

    }
  }
}

export default Profile;