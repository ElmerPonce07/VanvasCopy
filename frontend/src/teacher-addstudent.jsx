import React, { useState } from "react";
import "./teacher-addstudent.css";
import { Link, useParams } from 'react-router-dom';
import VanvasLogo from "./assets/Vanvas.png";

const TeacherAddStudent = () => {
  const { courseName, courseId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);  
  
  const handleAddStudentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    
    const newStudent = {
      firstName: firstName,
      lastName: lastName,
      studentEmail: studentEmail,
    };
    console.log(JSON.stringify(newStudent));
    try {
      const response = await fetch(`http://localhost:8080/api/classrooms/${courseId}/addStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
      console.log(response.ok);
      if (response.ok) {
        setStatusMessage(`Student "${firstName + " " + lastName}" added to classroom "${courseId}".`);
      } else {
        const error = await response.json();
        setStatusMessage(`Failed to add student: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      setStatusMessage("An error occurred while adding the student.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="teacher-addstudent-layout">
      <div className="teacher-addstudent-main">
        <header className="teacher-addstudent-header">
          <h1>Teacher Add Student</h1>
          <img src={VanvasLogo} alt="Vanvas Logo" className="vanvas-logo" />
        </header>

        <div className="teacher-addstudent-container">
          <section className="teacher-addstudent-form">
            <h2>Add a New Student</h2>
            <form onSubmit={handleAddStudentSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentEmail">Student Email:</label>
                <input
                  type="text"
                  id="studentEmail"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="teacher-addstudent-button" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Student"}
              </button>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddStudent;