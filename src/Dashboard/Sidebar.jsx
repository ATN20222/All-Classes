import React from "react";
import "./Sidebar.css";
import avatarImage from '../Assets/Images/Avatar.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCubesStacked, faHome, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import faTimes for close icon
import { Link } from "react-router-dom";

const Sidebar = ({ isActive, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isActive ? 'ActiveSideMenu' : ''}`}>
      
      <div className="CloseSidebarBtn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className="UserSideBarData">
        <div className="Avatar">
          <img src={avatarImage} alt="" />
        </div>
        <div className="UserSideBarName">
          <span>
            Andrew Smith
          </span>
        </div>
      </div>
      <div className="SideBarSearch">
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <ul>
        <li>
          <Link to='Home' className="nav-link">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li>
        <li>
          <div className="SideBarServices">
            <div className="TextAndIcon">
              <FontAwesomeIcon icon={faCubesStacked} /> Services
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
