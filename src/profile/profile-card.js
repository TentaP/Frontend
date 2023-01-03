import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './profile-style.css';
//import logo from '../../src/logo.jpg' // relative path to image 



export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      image: this.props.image,
    };
  }

  render() {
    return (
      <Card bg="dark" text="white" id="profileCard">
        <Card.Body>
          <Card.Img variant="top" fluid="true"
          //src={`data:image/png;base64,${this.image}`} 
          //onError={(e) => { e.target.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" }}
          />
          <Card.Title>{this.name}</Card.Title>
          <Card.Text>{this.email}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileCard;