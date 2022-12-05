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

export class Profile extends Component{
  constructor(props) {
    super(props);
    // TODO: dynaimcally get the user info from the shared state
      this.state = {
        name: "test",
        email: "test@test.com",
        image: "https://www.w3schools.com/howto/img_avatar.png",
        currentMenu: "Settings",
      }
  }

  componentDidMount(){
    /**
     * check if the browser have a cookie to use it as header when requesting user information
     */
    if(cookie) {
      axios.defaults.withCredentials = true;
      axios.get('/user').then((res)=> {
        console.log(res.data)
        this.setState({
          name: res.data.username,
          email: res.data.email,
          image: res.data.image,
        })
      }).catch((error) =>{
        console.log(error)
      });
    }
  }

  handleButtonclick = (event) => {
    event.currentTarget.style.backgroundColor = "blue"
    this.setState({currentMenu: event.target.id});
  }

  render() {
    return (
     <>
      <Container className="main-div"> 
        <Container className='center-div'>
          <Stack direction="horizontal" gap={6} >
            <Stack gap={1}>

              <p>Profile Info</p>
              <ProfileCard 
                email={this.state.email}
                image={this.state.image}
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

      
