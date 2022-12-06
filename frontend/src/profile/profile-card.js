import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

function ProfileCard(props) {
  console.log(props);
  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" fluid="true" src={"data:image/png;base64,"+ props.image} />
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
