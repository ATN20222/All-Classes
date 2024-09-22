import React from "react";
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="SideMenuBtn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="HeaderSearchBar">
          <input type="text" placeholder="Search" />
          <div className="SearchIcon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className="header-actions">
          <div className="Notifications">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="Profile">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
