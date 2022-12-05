import Card from 'react-bootstrap/Card';

function ProfileCard(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" fluid="true" src={props.image} />
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.email}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
