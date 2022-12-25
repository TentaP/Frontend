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


class FileUpload extends Component {
    state = {
        file: null,
        filename: "",
        course: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('filename', this.state.filename);
        formData.append('course', this.state.course);

        console.log(this.state.file)
        axios.post('/file', formData).then((response) => {
            console.log(response.data);
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
                                    <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Course' type="text" onChange={(e) => this.setState({ course: e.target.value })} />
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


/**
 *             <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={(e) => this.setState({ filename: e.target.value })} />
                <input type="text" onChange={(e) => this.setState({ course: e.target.value })} />
                <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] })} />
                <button type="submit">Upload</button>
            </form>
 */