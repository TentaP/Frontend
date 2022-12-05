import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

export class ProfileList extends Component {
  // TODO: Fill list with items specified by ProfileItemsList
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination>


    </>

    )
  }
}

export default ProfileList;
