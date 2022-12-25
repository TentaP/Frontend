import React, { Component } from 'react';
import axios from 'axios';
import './profile-style.css';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import ProfileCard from './profile-card';
import history from '../history';
import ProfileUniversities from './profileUniversities';
import ProfileCourses from './profileCourses';
import ProfileFiles from './profileFiles';
import ProfileUsers from './profileUsers';
import FileUpload from './fileUpload';



const cookies = new Cookies();
let cookie = cookies.get('jwt')

//TODO: img to base64, post to api in settings, get from api, display img, base
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      currentMenu: "",
      admin: false,
      loading: true,
      append: null,
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

        if (res.data.is_admin || res.data.is_superuser) {
          this.setState({
            admin: true,
          })
        }

      }).catch((error) => {
        this.setState({
          loading: true
        })
        //history.push(`/`);
        //window.location.reload();
      });

    } else {
      //history.push(`/`);
      //window.location.reload();
    }
  }

  handleButtonclick = (event) => {

    console.log(event.target.id)
    var divToShow = document.getElementById(`${event.target.id}-div`)
    divToShow.hidden = false
    if (event.target.id !== this.state.currentMenu) {
      this.setState({ currentMenu: event.target.id });
      var divTohide = document.getElementById(`${this.state.currentMenu}-div`)
      divTohide.hidden = true
    }
  }

  uploadFile() {
    document.getElementById("view-div").hidden = false
  }


  render() {
    if (this.state.loading) {
      <></>

    } else {
      if (this.state.admin) {
        return (
          <>
            <div id="container">
              <div id="child-left">

                <ProfileCard
                  image={this.state.avatar64}
                  email={this.state.email}
                  name={this.state.name} />
                <Button style={{ "background-color": "#6910CB" }} id='upload-btn' variant="light" size="lg" onClick={() => this.uploadFile()} >Upload file</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Settings">Settings</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Courses">Courses</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Universities">Universities</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Files">Files</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Users">Users</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Reviews">Reviews</Button>
              </div>

              <div id='view-div' hidden={true}>
                <Button id="view-btn" onClick={() => {
                  document.getElementById("view-div").hidden = true
                }}>X</Button>
                <FileUpload/>

              </div>


              <div className='child-right' id="Settings-div" hidden={true} >
                <h1>Settings</h1>
              </div>

              <div className='child-right' id="Courses-div" hidden={true} >
                <h1>Courses</h1>
                <ProfileCourses />
              </div>

              <div className='child-right' id="Universities-div" hidden={true}>
                <h1>Universities</h1>
                <ProfileUniversities />
              </div>

              <div className='child-right' id="Files-div" hidden={true}>
                <h1>Files</h1>
                <ProfileFiles />
              </div>

              <div className='child-right' id="Users-div" hidden={true}>
                <h1>Users</h1>
                <ProfileUsers />
              </div>

              <div className='child-right' id="Reviews-div" hidden={true}>
                <h1>Reviews</h1>
              </div>

            </div>
          </>
        );
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
}

export default Profile;