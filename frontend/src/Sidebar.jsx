import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './Sidebar.css';
import { BsFillFilePersonFill, BsClipboard2, BsBook, BsArrowBarLeft } from 'react-icons/bs';
import logowhite from './assets/VanvasVanvasWhite.png';
import { useAuth } from './context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



//comment for a change
const Sidebar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavbar] = useState([]);
  const [courses, setCourses] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchNavbar = () => {
    if(auth.user.role === "Student"){
      const items = ['Profile', 'Dashboard'];
      const navs = items.map((item, index) => {
          function fetchIcon(item){
            if(item == "profile"){
              return (<BsFillFilePersonFill size={30} />);
            }
            if(item == "dashboard"){
              return (<BsClipboard2 size={30} />);
            }
          }
          return(
            <li className='nav' key={index}>
              <button onClick={() => navigate(`/${item.toLowerCase()}`)}>
                <div className='nav-elements'>
                  {fetchIcon(item.toLowerCase())}
                  {item}
                </div>
              </button>
            </li>
          );
        }
      )
      setNavbar(navs)
    }
    else if(auth.user.role === "Teacher"){
      const items = ['Profile', 'Dashboard'];
      const navs = items.map((item, index) => {
          function fetchIcon(item){
            if(item == "profile"){
              return (<BsFillFilePersonFill size={30} />);
            }
            if(item == "dashboard"){
              return (<BsClipboard2 size={30} />);
            }
          }
          return(
            <li className='nav' key={index}>
              <button onClick={() => navigate(`/${item.toLowerCase()}`)}>
                <div className='nav-elements'>
                  {fetchIcon(item.toLowerCase())}
                  {item}
                </div>
              </button>
            </li>
          );
        }
      )
      setNavbar(navs)
    }
  };

  const fetchCourses = async () => {
    if(auth.user.role === "Student"){
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
        var i = 1;
        const coursesList = data.map(course =>
          <Dropdown.Item as={Link} to={`/course/${course.name}`} key={i} eventKey={i++}>{course.name}</Dropdown.Item>
        )
        setCourses(coursesList)
      }
      catch(error){
        console.error('Error: ', error);
      }
    }
    else if(auth.user.role === "Teacher"){
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
        var i = 1;
        const coursesList = data.map(course =>
          <Dropdown.Item as={Link} to={`/course/${course.name}`} key={i} eventKey={i++}>{course.name}</Dropdown.Item>
        )
        setCourses(coursesList)
      }
      catch(error){
        console.error('Error: ', error);
      }
    }

    
  }

  useEffect(() => {
    fetchNavbar();
    fetchCourses();
  }, [isOpen]);

  return (
    <div className="sidebar">
      <div className="logowhite">
        <img src={logowhite} alt="Logo" />
      </div>
      <div className='routes'>
        <ul>
          {navbar}
          <li className='nav-dropdown'>
            <div className='dropdown-container'>
              <Dropdown id="dropdown" drop='end'
                show={isOpen}
                onToggle={toggleDropdown}>
                <Dropdown.Toggle as={ButtonGroup}
                id={`dropdown-button-drop-end`}
                variant='link'>
                  <div className='nav-courses'>
                    <BsBook size={30} />
                    Courses
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="secondary">
                  {courses}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className="nav-exit">
            <button onClick={() => auth.logOut()}>
              <div className='nav-elements'>
                <BsArrowBarLeft size={30} />
                Exit
              </div>            
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;