import React from 'react'
import { useParams } from 'react-router-dom';
import CoursePage from './coursePage';


function Course (){
        const {uniName,courseName} = useParams();
        return (
          <div>
            <CoursePage uniName={uniName} courseName={courseName} />
          </div>
        )
}

export default Course;