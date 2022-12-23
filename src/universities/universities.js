import Cookies from "universal-cookie";
import React, { Component } from 'react'
import history from '../history';
import NavBar from '../navbar/navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './universities-style.css';
import Table from 'react-bootstrap/Table';


const cookies = new Cookies();
let cookie = cookies.get('jwt')


export class Universities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uni: [],
      uniName: "",
      courses: [],
      loading: true,
    };
    this.getUniName = this.getUniName.bind(this)
    this.passArgs = this.passArgs.bind(this)
  }


  componentDidMount() {
    if (!cookie) {
      history.push('/');
      window.location.reload();
    }
    axios.defaults.withCredentials = true;
    axios
      .get('/uni')
      .then((response) => {
        this.setState({ uni: response.data })
        this.setState({ loading: false })

      })
      .catch((error) => {
        history.push('/');
        window.location.reload();
      })
  }

  getUniName(uniName) {
    const childRight = document.getElementById('child-right');
    childRight.hidden = false;

    this.setState({
      uniName: uniName,
    });

    axios.defaults.withCredentials = true;
    axios
      .get(`/courses/uni/${uniName}`)
      .then((response) => {
        this.setState({ courses: response.data })
      })
      .catch((error) => {
        //history.push('/');
        //window.location.reload();
      })
  }

  passArgs(uniName, courseName) {
    history.push({
      pathname: `/universities/${uniName}/${courseName}`,
    });
    window.location.reload();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.loading) {
      return (<></>)
    } else {
      return (
        <>
          <NavBar />
          <div id="container">
            <div id="child-left">
              {
                this.state.uni.map((data, index) => {
                  return (
                    <Button key={index} onClick={() => this.getUniName(data.university_name)} variant="light" size="lg" type="submit">{data.university_name} <span>&#10148;</span>
                    </Button>
                  )
                })
              }
            </div>
            <div id="child-right" hidden={true}>
              <h1>{this.state.uniName}</h1>

              <Table variant="dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.courses.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td><Button onClick={() => this.passArgs(this.state.uniName, data.course_name)} type={"link"}>{data.course_name}</Button></td>
                          <td>{data.description}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
          </div>
        </>
      )
    }

  }
}

export default Universities;