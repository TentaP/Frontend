import React, { Component } from 'react';
import axios from 'axios';
import './profile-style.css';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import ProfileCard from './profile-card';
import ProfileUniversities from './profileUniversities';
import ProfileCourses from './profileCourses';
import ProfileFiles from './profileFiles';
import ProfileUsers from './profileUsers';
import ProfileSettings from './profileSettings'
import FileUpload from './fileUpload';
import { IoAddCircleOutline } from "react-icons/io5";
import history from '../history';
import AddUni from './addUni';
import AddCourse from './addCourse';




const cookies = new Cookies();
let cookie = cookies.get('jwt')

//TODO: img to base64, post to api in settings, get from api, display img, base
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      user: null,
      avatar64: null,
      currentMenu: "",
      admin: false,
      superUser: false,
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

        if (res.data.is_superuser) {
          this.setState({
            admin: true,
            superUser: true,
          })
        } else if (res.data.is_admin) {
          this.setState({
            admin: true,
          })
        }

        this.setState({
          name: res.data.username,
          email: res.data.email,
          user: res.data,
          loading: false
        })


      }).catch((error) => {
        this.setState({
          loading: true
        })
        //history.push(`/`);
        //window.location.reload();
      });

      /**
    axios.get('/user/avatar').then((res) => {

      this.setState({
        avatar64: res.data,
      })

      }).catch((error) => {
        this.setState({
          avatar64: null,
          loading: true
        })
        //history.push(`/`);
        //window.location.reload();
      });
      */

    } else {
      history.push(`/`);
      window.location.reload();
    }
  }

  handleButtonclick = (event) => {

    var divToShow = document.getElementById(`${event.target.id}-div`)
    divToShow.hidden = false
    if (event.target.id !== this.state.currentMenu) {
      this.setState({ currentMenu: event.target.id });
      var divTohide = document.getElementById(`${this.state.currentMenu}-div`)
      divTohide.hidden = true
    }
  }

  uploadFile() {
    document.getElementById("view-div-profile").hidden = false
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
                <Button id='upload-btn' variant="light" size="lg" onClick={() => this.uploadFile()} >Upload file</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Settings">Settings</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Courses">Courses</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Files">Files</Button>
                <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Reviews">Reviews</Button>
                {this.state.admin ?
                      <>
                      <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Universities">Universities</Button>
                      <Button variant="light" size="lg" onClick={this.handleButtonclick} id="Users">Users</Button>
                      </> : <></>
                }
              </div>

              {/** 
               * Upload file
               */}

              <div id='view-div-profile' hidden={true}>
                <Button className="view-btn" onClick={() => {
                  document.getElementById("view-div-profile").hidden = true
                }}>X</Button>
                <FileUpload />

              </div>

              {/** 
               * settings
               */}


              <div className='child-right' id="Settings-div" hidden={true} >
                <h1>Settings</h1>
                <ProfileSettings user={this.state.user}/>
              </div>

              {/** 
               * courses
               */}

              <div className='child-right' id="Courses-div" hidden={true} >
                <h1 className='h1-inline'>Courses</h1>
                <div id='new-course-div' hidden={true}>
                  <Button className="view-btn" onClick={() => {
                    document.getElementById("new-course-div").hidden = true
                  }}>X</Button>
                  <AddCourse />
                </div>
                {this.state.admin ?
                      <>
                <Button id="Courses-span" onClick={() => document.getElementById("new-course-div").hidden = false
                }>Add course <IoAddCircleOutline /></Button>
                      </> : <></>
                }

                <ProfileCourses user={this.state.user}/>
              </div>

              {/** 
               * universities
               */}

              <div className='child-right' id="Universities-div" hidden={true}>
                <h1 className='h1-inline'>Universities</h1>
                <div id='new-uni-div' hidden={true}>
                  <Button className="view-btn" onClick={() => {
                    document.getElementById("new-uni-div").hidden = true
                  }}>X</Button>
                  <AddUni />
                </div>
                <Button id="Universities-span" onClick={() => document.getElementById("new-uni-div").hidden = false
                }>Add university <IoAddCircleOutline /></Button>
                <ProfileUniversities />
              </div>

              {/** 
               * files
               */}

              <div className='child-right' id="Files-div" hidden={true}>
                <h1>Files</h1>
                <ProfileFiles admin={this.state.admin}/>
              </div>

              {/** 
               * users
               */}

              {this.state.admin ? <>
              <div className='child-right' id="Users-div" hidden={true}>
                <h1>Users</h1>
                <ProfileUsers user={this.state.user}/>
              </div>
              </> : <></>
              }

              {/** 
               * reviews
               */}

              <div className='child-right' id="Reviews-div" hidden={true}>
                <h1>Reviews</h1>
              </div>

            </div>
          </>
        );


    }
  }
}

export default Profile;
