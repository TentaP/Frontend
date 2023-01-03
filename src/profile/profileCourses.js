import Cookies from "universal-cookie";
import React, { Component } from 'react'
import history from '../history';
import NavBar from '../navbar/navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";



const cookies = new Cookies();
let cookie = cookies.get('jwt')


export class ProfileCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            unis : [],
        };
    }


    componentDidMount() {
        if (!cookie) {
            history.push('/');
            window.location.reload();
        }
        axios.defaults.withCredentials = true;
        if (this.props.admin) {
          axios
              .get('/courses')
              .then((response) => {
                  this.setState({ courses: response.data })
              })
              .catch((error) => {
                  //history.push('/');
                  //window.location.reload();
              })
        } else { // change to get courses for user through courses by uni
          axios
              .get('user/courses')
              .then((response) => {
                  this.setState({ courses: response.data })
              })
              .catch((error) => {
                  //history.push('/');
                  //window.location.reload();
              })
        }
        axios
            .get('/uni')
            .then((response) => {
              this.setState({ unis: response.data })
            })
            .catch((error) => {
                //history.push('/');
                //window.location.reload();
            })
    }



    deleteConfirmation(id) {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure to delete ${id}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteFunction(id)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };

    deleteFunction(id) {
        axios.defaults.withCredentials = true;
        axios
            .delete(`/course/${id}`)
            .then(() => {
                alert(`${id} has been deleted`)
                window.location.reload();

            })
            .catch((error) => {
                alert(`${error}`)
            })
    }

    toUniName(id) {
      return (
        this.state.unis.map((uni) => (
            uni['id'] === id ?
              (uni.university_name)
            :
              null
          ))
        )
    }



    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return (
            <>
                <div>
                    <h1></h1>

                    <Table variant="dark" responsive="xl">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Course Name</th>
                                <th>Course description</th>
                                <th>Course university</th>
                                {this.props.admin ? <th>Delete</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.course_name}</td>
                                            <td>{data.description}</td>
                                            <td>{this.toUniName(data.university)}</td>
                                            {this.props.admin ? <td><Button variant="danger" onClick={() => this.deleteConfirmation(data.id)}>Delete</Button></td> : null}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}

export default ProfileCourses;
