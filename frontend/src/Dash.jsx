import React, { useState, useEffect, useContext } from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Dash.css';
import profilePicture from './assets/pfp.png';
import { useAuth } from './context/AuthContext';

//should expand amount of colors for more classes, maybe make them random?
const colors = ['#EF6C6E', '#6C7DEF', '#6CEF88','#EFCC6C', '#D0EF6C', '#6CD7EF'];

const Dash = () => {
  const auth = useAuth();
  console.log(auth.user.userData);
  console.log(auth.user.role);
  
  const [courses, setCourses] = useState(null);
  const [todo, setTodo] = useState([]);

  const fetchCourses = async () => {
    if(auth.user.role === "Student") {
      try{
        const response = await fetch(`http://localhost:8080/api/classrooms/getStudentClassrooms/${auth.user.userData.id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        });
        if(!response.ok){
          throw new Error('fetch did not work !');
        }
  
        const data = await response.json();
        var i = 0;
        const coursesList = data.map(course =>
          <li className='course-margin' key={course.id + Math.floor(Math.random() * 100)}>
            <Link to={`/course/${course.name}`}>
              <div className='course'>
                <div className='course-logo' style={{background: colors[i++]}}></div>
                <p>{course.name}</p>
              </div>
            </Link>            
          </li>
        )
        setCourses(coursesList)
      }
      catch(error){
        console.error('Error: ', error);
      }
    }
    else if(auth.user.role === "Teacher") {
      try{
        const response = await fetch(`http://localhost:8080/api/classrooms/getTeacherClassrooms/${auth.user.userData.id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
        });
        if(!response.ok){
          throw new Error('fetch did not work !');
        }
  
        const data = await response.json();
        var i = 0;
        const coursesList = data.map(course =>
          <li className='course-margin' key={course.id + Math.floor(Math.random() * 100)}>
            <Link to={`/course/${course.name}`}>
              <div className='course'>
                <div className='course-logo' style={{background: colors[i++]}}></div>
                <p>{course.name}</p>
              </div>
            </Link>    
          </li>
        )
        setCourses(coursesList)
      }
      catch(error){
        console.error('Error: ', error);
      }
    }
    
  }

  const fetchAssignments = async () => {
    if(auth.user.role === "Teacher"){
      return;
    }
    try{
      const response = await fetch(`http://localhost:8080/api/assignment/todoList/${auth.user.userData.id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(!response.ok){
        throw new Error('fetch did not work !');
      }

      const data = await response.json();
      var i = 0;
      const todoList = data.map(assignment =>
        <li className='assignment-margin' key={assignment.id + Math.floor(Math.random() * 100)}>
          <div className='assignment'>
            <p className='assignment-name'>{assignment.name} - {assignment.description}</p>
            <p className='assignment-grade'>-/100</p>
            <p className='assignment-type'>Type: {assignment.type}</p>
            <p className='assignment-due-date'>Due: {assignment.dueDate}</p>
          </div>
        </li>
      )
      setTodo(todoList)
    }
    catch(error){
      console.error('Error: ', error);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchAssignments();
  }, []);
  
  
  
  return (
    <div>
      <div className="dashboard">

        <div className="dashboard-container">
          <div className='header'>
            <h1>Dashboard</h1>
            <div className="line-dashboard"></div>
          </div>

          <div className='courses-container'>
            <ul className='courses'>{courses}</ul>
          </div>
        </div>

        {auth.user.role === "Student" &&
        <div className='to-do-container'>
          <div className='header'>
            <h1>To-Do</h1>
            <div className="line-to-do"></div>
          </div>
          <div className='to-do-list'>
            <ul>{todo}</ul>
          </div>
        </div>}

        {auth.user.role === "Teacher" &&
          <div className='to-do-container'>
            <div className='header'>
              <h1 style={{textAlign: 'center', marginRight: '36px'}}>Course Management</h1>
              <div className="line-to-do"></div>
            </div>
            <div className='to-do-list'>
              <ul>
                <li className='assignment-margin'>
                  <Link to={`/dashboard/createClass`}>
                    <div className='course-change-option'>
                      <div className='assignment'>
                        <p>Create Class</p>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        }

      </div>
    
    </div>
  );
};

export default Dash;