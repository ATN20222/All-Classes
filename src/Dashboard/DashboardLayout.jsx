import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import './Dashboard.css';
import { Outlet } from 'react-router-dom'; // Import Outlet

const DashboardLayout = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  // Function to toggle sidebar active state
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div className={`dashboard ${isSidebarActive ? 'ActiveSideMenu' : ''}`}>
      <Sidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
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
