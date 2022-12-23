import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './profile-style.css';
import logo from '../../src/logo.jpg' // relative path to image 



function ProfileCard(props) {
  console.log(props);
  return (
    <Card bg="dark" text="white" id="profileCard">
      <Card.Body>
        <Card.Img variant="top" fluid="true" src={logo} />
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
