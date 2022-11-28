import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './style.css'


function SearchBox() {
  return (
    <>
      <InputGroup size="lg" className="mb-5">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon"
        />
        <Button variant="outline-dark" id="button-addon">
          search
        </Button>
      </InputGroup>
    </>
  );
}

export default SearchBox;