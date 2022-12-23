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
        };
    }


    componentDidMount() {
        if (!cookie) {
            history.push('/');
            window.location.reload();
        }
        axios.defaults.withCredentials = true;
        axios
            .get('/courses')
            .then((response) => {
                console.log(response.data)
                this.setState({ courses: response.data })
            })
            .catch((error) => {
                //history.push('/');
                //window.location.reload();
            })
    }



    del(id) {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure to delete ${id}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.delUni(id)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };

    delUni(id) {
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
                                <th>Delete</th>
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
                                            <td>{data.university}</td>
                                            <td><Button onClick={() => this.del(data.id)} type={"link"}>Delete</Button></td>

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