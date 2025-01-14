import React from "react";
import "./teacher-homepage.css";
import "./teacher-addstudent.css";
import TeacherSidebar from "./teacher-sidebar";
import { useNavigate } from "react-router-dom";

const TeacherHomePage = () => {
  const navigate = useNavigate();

  const handleCreateClass = () => {
    navigate("/teacher-classcreation");
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  const handleAddAssignment = () => {
    navigate("/teacher-assignmentcreation");
  };

  return (
    <div className="teacher-homepage-container">
      <TeacherSidebar />
      <div className="teacher-main">
        <div className="teacher-header">
          <h1>Teacher's Dashboard</h1>
          <div className="line"></div>
        </div>
        <div className="action-buttons-container">
          <button className="action-button" onClick={handleCreateClass}>
            Create Class
          </button>
          <button className="action-button" onClick={handleAddStudent}>
            Add Student
          </button>
          <button className="action-button" onClick={handleAddAssignment}>
            Add Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomePage;