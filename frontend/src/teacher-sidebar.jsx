import React from "react";
import "./teacher-sidebar.css";
import { BsFillFilePersonFill, BsClipboard2, BsBook, BsArrowBarLeft } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import logowhite from "./assets/VanvasVanvasWhite.png";

const TeacherSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (location.pathname === path) {
      navigate("/reload");
      setTimeout(() => navigate(path), 0);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="teacher-sidebar">
      <div className="vanvas-logo">
        <img src={logowhite} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li onClick={() => handleNavigation("/profile")}>
            <BsFillFilePersonFill style={{ color: 'white' }} size={30} />
            <span>Profile</span>
          </li>
          <li onClick={() => handleNavigation("/teacher-homepage")}>
            <BsClipboard2 style={{ color: 'white' }} size={30} />
            <span>Dashboard</span>
          </li>
          <li onClick={() => handleNavigation("/classes")}>
            <BsBook style={{ color: 'white' }} size={30} />
            <span>My Classes</span>
          </li>
          <li className="exit" onClick={() => handleNavigation("/logout")}>
            <BsArrowBarLeft style={{ color: 'white' }} size={30} />
            <span>Exit</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TeacherSidebar;