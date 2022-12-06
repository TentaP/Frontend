import React, { Component } from 'react';
import axios from 'axios';
import '../home/home-style.css'
import Cookies from 'universal-cookie';
import Container from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import ProfileCard from './profile-card';
import ProfileInfoList from './profile-InfoList';
import ProfileItemsList from './profile-ItemsList';

const cookies = new Cookies();
let cookie = cookies.get('jwt')

//TODO: img to base64, post to api in settings, get from api, display img, base
export class Profile extends Component{
  constructor(props) {
    super(props);
      this.state = {
        name: "test",
        email: "test@test.com",
        currentMenu: "Settings",
        //avatar64: "",
      }
  }

  componentDidMount(){
    /**
     * check if the browser have a cookie to use it as header when requesting user information
     */
    if(cookie) {
      axios.defaults.withCredentials = true;
      axios.get('/user').then((res)=> {
        this.setState({
          name: res.data.username,
          email: res.data.email,
        })
      }).catch((error) =>{
        console.log(error)
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
    }
  }

  handleButtonclick = (event) => {
    if (event.target.id !== this.state.currentMenu) {
      this.setState({currentMenu: event.target.id});
    }
  }

  render() {
    console.log(this.state.avatar64);
    return (
     <>
      <Container className="main-div"> 
        <Container className='center-div'>
          <Stack direction="horizontal" gap={6} >
            <Stack gap={1}>

              <p>Profile Info</p>
              <ProfileCard 
                email={this.state.email}
                image={this.state.avatar64}
                name={this.state.name}/>
              <Stack gap={1}>
                <Button onClick={this.handleButtonclick} id="Settings">Settings</Button>
                <Button onClick={this.handleButtonclick} id="Courses">Courses</Button>
                <Button onClick={this.handleButtonclick} id="Files">Files</Button>
                <Button onClick={this.handleButtonclick} id="Reviews">Reviews</Button>
              </Stack>
            </Stack>

            <ProfileItemsList/>
          </Stack>
        </Container>
      </Container>
    </>
    );
  }
}

export default Profile;

      
