import React, { Component } from 'react'
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import './profile-style.css';


export class ProfileInfoList extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Stack gap={1}>
          <Button variant="primary">Settings</Button>
          <Button variant="secondary">Courses</Button>
          <Button variant="secondary">Files</Button>
          <Button variant="secondary">Reviews</Button>
        </Stack>
      </>

    )
  }
}

export default ProfileInfoList;
