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


export class ProfileUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }


    componentDidMount() {
        if (!cookie) {
            history.push('/');
            window.location.reload();
        }
        if (this.props.admin) {
        axios.defaults.withCredentials = true;
        axios
            .get('/users')
            .then((response) => {
                console.log(response.data)
                this.setState({ users: response.data })
            })
            .catch((error) => {
                //history.push('/');
                //window.location.reload();
            })
        }
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
            .delete(`/user/${id}`)
            .then(() => {
                alert(`${id} has been deleted`)
                window.location.reload();

            })
            .catch((error) => {
                alert(`${error}`)
            })
    }

    BooleanHandlar(data) {
        if (data) {
            return 'Yes'
        } else
            return 'No'
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
                                <th>Username</th>
                                <th>Email</th>
                                <th>University</th>
                                <th>Is admin</th>
                                <th>Is superuser</th>
                                <th>Is active</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.username}</td>
                                            <td>{data.email}</td>
                                            <td>{data.university}</td>
                                            <td>{this.BooleanHandlar(data.is_admin)}</td>
                                            <td>{this.BooleanHandlar(data.is_superuser)}</td>
                                            <td>{this.BooleanHandlar(data.is_active)}</td>
                                            <td><Button onClick={() => this.deleteConfirmation(data.id)} type={"link"}>Delete</Button></td>

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

export default ProfileUsers;
