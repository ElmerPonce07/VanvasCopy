import React, { useState, useEffect } from 'react';
import './Course.css';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Course = () => {
    const auth = useAuth();  
    
    const { courseName } = useParams();
    const [courseId, setCourseId] = useState("");
    const [assignments, setAssignments] = useState(null);

    const fetchAssignments = async () => {
        try{
            const response = await fetch(`http://localhost:8080/api/classrooms/findclassroom/${courseName}`, {
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
            setCourseId(data[0]["id"]);
            const assignments = data[0]["assignments"].map(assignment =>
                <li className='assignment-margin' key={assignment.id + Math.floor(Math.random() * 100)}>
                    <div className='assignment'>
                        <p className='assignment-name'>{assignment.name} - {assignment.description}</p>
                        <p className='assignment-grade'>-/100</p>
                        <p className='assignment-type'>Type: {assignment.type}</p>
                        <p className='assignment-due-date'>Due: {assignment.dueDate}</p>
                    </div>
                </li>
            )
            setAssignments(assignments)
        }
        catch(error){
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        fetchAssignments();
      }, [courseName]);

    return (
        <div className='course-page'>
            <div className='course-sub-page'>
                <div className='course-header'>
                    <h1>{courseName}</h1>
                    <div className="line-dashboard"></div>
                </div>
                
                <div className='course-container'>
                    <div className='course-options'>
                        <ul>
                            <li>
                                <div className='course-option'>
                                    Home
                                </div>
                            </li>
                            <li>
                                <div className='course-option'>
                                    Announcements
                                </div>
                            </li>
                            <li>
                                <div className='course-option'>
                                    Assignments
                                </div>
                            </li>
                            <li>
                                <div className='course-option'>
                                    Grades
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className='assignment-list'>
                        <h2>Upcoming Assignments</h2>
                        <ul>
                            {assignments}
                        </ul>
                    </div>

                </div>
                
                
            </div>

            { auth.user.role === "Teacher" &&            
                <div className='course-change-container'>
                    <div className='header'>
                        <h1 className='course-change-header'>Course Changes</h1>
                        <div className="course-change-line"></div>
                    </div>
                    <div>
                        <div>
                            <ul>
                                <li className='assignment-margin'>
                                    <Link to={`/course/${courseName}/${courseId}/addAssignment`}>
                                        <div className='course-change-option'>
                                            <div className='assignment'>
                                                <p>Add Assignment</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className='assignment-margin'>
                                    <Link to={`/course/${courseName}/${courseId}/addStudent`}>
                                        <div className='course-change-option'>
                                            <div className='assignment'>
                                                <p>Add Student</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className='assignment-margin'>
                                    <Link to={`/course/${courseName}/${courseId}/addAssignment`}>
                                        <div className='course-change-option'>
                                            <div className='assignment'>
                                                <p>Remove Student</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
        
    );
};

export default Course;