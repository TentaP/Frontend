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



class AddUni extends Component {
    state = {
        university_name: "",
    };


    handleSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        let data = { university_name: this.state.university_name };


        axios.post('/uni', data).then((response) => {
            alert(`${this.state.university_name} has been added`)
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

                                    <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='university' type="text" onChange={(e) => this.setState({ university_name: e.target.value })} />

                                    <Button id='login-btn' variant="light" size="lg" type="submit">add university</Button>

                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>
                </form>
            </MDBContainer>

        );
    }
}

export default AddUni;
