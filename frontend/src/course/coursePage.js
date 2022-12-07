import React, { Component } from 'react';
import Cookies from "universal-cookie";
import NavBar from "../navbar/navbar";
import history from '../history';


const cookies = new Cookies();

export class CoursePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
          movie: [],
          isLoading: true,
        };
  }

  componentDidMount() {
    const { uniName,courseName } = this.props;
    console.log(uniName)
    console.log(courseName)
    if (!cookies.get('jwt')){
      history.push('/'); 
      window.location.reload();
    }
  }  
        render() {

          return (
            <>
            <NavBar/>
            <h1>
                Hi this is the {this.id}
            </h1>
            </>
          );
        }
      }

export default CoursePage;