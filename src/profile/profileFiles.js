import Cookies from "universal-cookie";
import React, { Component } from 'react'
import history from '../history';
import Profile from './profile';
import NavBar from '../navbar/navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";



const cookies = new Cookies();
let cookie = cookies.get('jwt')


export class ProfileFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            files: [],
            users: [],
        };
    }


    componentDidMount() {
        if (!cookie) {
            history.push('/');
            window.location.reload();
        }
        axios.defaults.withCredentials = true;
        if (this.state.admin) {
          axios
              .get('/files')
              .then((response) => {
                  this.setState({ files: response.data })
              })
              .catch((error) => {
                  //history.push('/');
                  //window.location.reload();
              })
        } else {
          axios
              .get('/user/files')
              .then((response) => {
                  this.setState({ files: response.data })
              })
              .catch((error) => {
                  //history.push('/');
                  //window.location.reload();
              })

        }
          axios
              .get('/users')
              .then((response) => {
                  this.setState({ users: response.data })
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
            .delete(`/file/${id}`)
            .then(() => {
                alert(`${id} has been deleted`)
                window.location.reload();

            })
            .catch((error) => {
                alert(`${error}`)
            })
    }


    has_solutions(has) {
        if (has) {
            return 'Yes'
        } else
            return 'No'
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    toUserName(id) {
      return (
        this.state.users.map((user) => (
            user['id'] === id ?
              (user.username)
            :
              null
          ))
        )
    }

    render() {
        return (
            <>
                <Table variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>File name</th>
                            <th>File type</th>
                            <th>Date of uploading</th>
                            <th>Has solutions</th>
                            <th>Uploaded by</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.files.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.id}</td>
                                        <td>{data.filename}</td>
                                        <td>{data.file_ext}</td>
                                        <td>{(data.date_of_uploading).slice(0, 10)}</td>
                                        <td>{this.has_solutions(data.has_solutions)}</td>
                                        <td>{this.toUserName(data.uploaded_by_id)}</td>
                                        <td><Button onClick={() => this.deleteConfirmation(data.id)} type={"link"}>Delete</Button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </Table>

            </>
        )
    }
}

export default ProfileFiles;
