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
            unis: [],
        };
    }


    componentDidMount() {
        if (!cookie) {
            history.push('/');
            window.location.reload();
        }
        if (this.props.user.is_superuser || this.props.user.is_admin) {
        axios.defaults.withCredentials = true;
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




    deleteConfirmation(user) {
        confirmAlert({
            title: 'Confirm to submit',
            message: `Are you sure to delete ${user.username}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteFunction(user.id)
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


    deleteUser(data) {
      if (data.id === this.props.user.id) {
        return (
          <Button variant="danger" onClick={() => this.deleteConfirmation(data)}>Delete</Button>
        )
      } else if (this.props.user.is_superuser && !data.is_superuser) {
        return (
          <Button variant="danger" onClick={() => this.deleteConfirmation(data)}>Delete</Button>
        )
      } else if (!data.is_superuser && !data.is_admin) {
        return (
          <Button variant="danger" onClick={() => this.deleteConfirmation(data)}>Delete</Button>
        )
      }
    }

    makeAdmin(username) {
      axios.defaults.withCredentials = true;
      axios
        .put(`/set_admin`, { "username": username })
        .then(() => {
          alert(`${username} is now admin`)
          window.location.reload();
        }).catch((error) => {
          alert(`${error}`)
        });
    }

    removeAdmin(username) {
      axios.defaults.withCredentials = true;
      axios
        .put(`/remove_admin`, { "username": username })
        .then(() => {
          alert(`${username} is no longer admin`)
          window.location.reload();
        }).catch((error) => {
          alert(`${error}`)
        });
    }

    AdminTd(data) {
      if (this.props.user.is_superuser && !this.props.user.is_admin && this.props.user.id === data.id) {
        return (
          <td><Button variant="info" onClick={() => this.makeAdmin(data.username)}>Make admin</Button></td>
        )
      } else if (this.props.user.is_superuser && this.props.user.is_admin && this.props.user.id === data.id) {
        return (
          <td><Button variant="danger" onClick={() => this.removeAdmin(data.username)}>Remove admin</Button></td>
        )
      } else if (!data.is_superuser && !data.is_admin) {
        return (
          <td><Button variant="info" onClick={() => this.makeAdmin(data.username)}>Make admin</Button></td>
        )
      } else if (!data.is_superuser && data.is_admin) {
        return (
          <td><Button variant="danger" onClick={() => this.removeAdmin(data.username)}>Remove admin</Button></td>
        )
      } else {
        return (
          <td></td>
        )
      }
    }

    SuperUserTd(data) {
      if (this.props.user.is_superuser && !data.is_superuser ) {
        return (
          <td><Button variant="info" onClick={() => this.confirmMakeSuperUser(data)}>Confirm</Button></td>
        )
      } else {
        return (
          <td></td>
        )
      }
    }

    confirmMakeSuperUser(data) {
        confirmAlert({
            title: 'Irreversible action',
            message: `Are you SURE you want to make ${data.username} a superuser?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.makeSuperUser(data)
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };

    makeSuperUser(data) {
      axios.defaults.withCredentials = true;
      axios
        .put(`/set_superuser`, { "username": data.username })
        .then(() => {
          alert(`${data.username} is now superuser`)
          window.location.reload();
        }).catch((error) => {
          alert(`${error}`)
        });
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
                                <th>Username</th>
                                <th>Email</th>
                                <th>University</th>
                                <th>Is admin</th>
                                <th>Is superuser</th>
                                <th>Is active</th>
                                {this.props.user.is_superuser && <th>M/R Admin</th>} {/* only superuser */} 
                                {this.props.user.is_superuser && <th>Make superUser</th>} {/* only superuser */} 
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
                                            <td>{this.toUniName(data.university)}</td>
                                            <td>{this.BooleanHandlar(data.is_admin)}</td>
                                            <td>{this.BooleanHandlar(data.is_superuser)}</td>
                                            <td>{this.BooleanHandlar(data.is_active)}</td>
                                            {this.props.user.is_superuser && this.AdminTd(data)} {/* only superuser */}
                                            {this.props.user.is_superuser && this.SuperUserTd(data)} {/* only superuser */}
                                            <td>{this.deleteUser(data)}</td>

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
