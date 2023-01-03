import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
    from 'mdb-react-ui-kit';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from "universal-cookie";


const cookies = new Cookies();
let cookie = cookies.get('jwt')





class FileUpload extends Component {
    state = {
        file: null,
        filename: "",
        course: "",
        courses: [],
    };

    componentDidMount() {
        /**
         * check if the browser have a cookie to use it as header when requesting user information
         */
        if (cookie) {
            axios.defaults.withCredentials = true;
            axios.get('/user').then((res) => {
                if (res.data.super_user || res.data.admin) {
                    axios
                        .get('/courses')
                        .then((response) => {
                            this.setState({ courses: response.data })

                        })
                        .catch((error) => {
                        })
                } else {
                    axios
                        .get('user/courses')
                        .then((response) => {
                            console.log(response.data)
                            this.setState({ courses: response.data })
                        })
                        .catch((error) => {
                            //history.push('/');
                            //window.location.reload();
                        })

                }
            }).catch((error) => {
                console.log(error)
            });
        }
    }




    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('filename', this.state.filename);
        formData.append('course', this.state.course);
        console.log(this.state.course)

        axios.post('/file', formData).then((response) => {
            console.log(response.data);
            alert(`${this.state.filename} has been uploaded`)
            window.location.reload();


        }).catch((error) => {
            alert(`${error}`)

        });
    }

    render() {
        return (


            <MDBContainer fluid>
                <form onSubmit={this.handleSubmit}>

                    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                        <MDBCol col='12'>

                            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                    <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='File name' type="text" onChange={(e) => this.setState({ filename: e.target.value })} />

                                    <Form.Select id="profile-select" aria-label="Default select example" onChange={(e) => this.setState({ course: e.target.value })}>
                                        <option>Select course</option>
                                        {
                                            this.state.courses.map((data, index) => {
                                                return (
                                                    <option key={index} value={data['course_name']}>{data['course_name']}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>

                                    <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='' type="file" onChange={(e) => this.setState({ file: e.target.files[0] })} />
                                    <Button id='login-btn' variant="light" size="lg" type="submit">Upload</Button>



                                    <div>

                                        <p id='detail-msg' style={{ "textAlign": "center" }}></p>

                                    </div>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </form>
            </MDBContainer>

        );
    }
}

export default FileUpload;
