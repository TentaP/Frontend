import React, { Component } from 'react';
import Cookies from "universal-cookie";
import NavBar from "../navbar/navbar";
import history from '../history';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './course-style.css';
import { BiShowAlt } from "react-icons/bi";
import { FiDownload } from "react-icons/fi";





const cookies = new Cookies();




export class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      isLoading: true,
      courseName: null,
      uniName: null,
      fileExt: null,
      fileLink: null,
    };
  }

  componentDidMount() {
    const { uniName, courseName } = this.props;
    this.setState({
      courseName: courseName,
      uniName: uniName,
    })
    if (cookies.get('jwt')) {
      axios.defaults.withCredentials = true;
      axios.get(`/course/${courseName}/files`)
        .then((response) => {
          this.setState({ files: response.data })

        })
        .catch((error) => {
          this.setState({ loading: true })
          //history.push('/');
          //window.location.reload();
        })
    }
    else {
      history.push('/');
      window.location.reload();

    }
  }

  has_solutions(has) {
    if (has) {
      return 'Yes'
    } else
      return 'No'
  }

  view(id) {
    axios.defaults.withCredentials = true;
    axios.get(`/file/${id}`)
      .then((response) => {
        document.getElementById('view-h1').textContent = response.data.filename
        document.getElementById('view-iframe').src = response.data.file
        document.getElementById("view-div").hidden = false

      })
      .catch((error) => {
        console.log(error)
      })
  }

  download(id) {
    axios.defaults.withCredentials = true;
    axios.get(`/file/${id}`)
      .then((response) => {
        console.log(response.data.file)
        this.downloadFile(response.data.file, response.data.filename)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  downloadFile(url, fileName) {
    fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
  };





  render() {

    return (
      <>
        <NavBar />
        <div className='files-div'>
          <h1 className='files-h1'>{this.state.courseName}</h1>

          <Table variant="dark">
            <thead>
              <tr>
                <th>File name</th>
                <th>File type</th>
                <th>Date of uploading</th>
                <th>Has solutions</th>
                <th>Uploaded by</th>
                <th>View</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.files.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.filename}</td>
                      <td>{data.file_ext}</td>
                      <td>{(data.date_of_uploading).slice(0, 10)}</td>
                      <td>{this.has_solutions(data.has_solutions)}</td>
                      <td>{data.uploaded_by}</td>
                      <td> <Button onClick={() => this.view(data.id)} type={"link"}><span><BiShowAlt /></span></Button></td>
                      <td> <Button id="test" onClick={() => this.download(data.id)} type={"link"}><span><FiDownload /></span></Button></td>
                    </tr>
                  )
                })
              }

            </tbody>

          </Table>


          <div id='view-div' hidden={true}>
            <h1 id='view-h1'> </h1>
            <Button id="view-btn" onClick={() => {
              document.getElementById("view-div").hidden = true
            }}>X</Button>
            <iframe id='view-iframe' width="100%" height="800px" />
          </div>

          
        </div>

      </>
    );
  }
}

export default CoursePage;