import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import './Dashboard.css';
import { Outlet } from 'react-router-dom'; // Import Outlet
import { getDB } from "../Services/AxiosApi";
import SideBarMind from "./SideBarMind";

const DashboardLayout = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // Function to toggle sidebar active state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div className={`dashboard ${isSidebarActive ? 'ActiveSideMenu' : ''}`}>
      {getDB()==='mind' ?
      <SideBarMind isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      :
      <Sidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
      }
      <div className="dashboard-main">
        <Header toggleSidebar={toggleSidebar} />
        <div className="content-area">
          <Outlet />  
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
