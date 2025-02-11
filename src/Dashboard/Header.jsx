import React, { useEffect, useRef, useState } from "react";
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { NotificationService } from "../Services/Api";
import { onMessageListener, requestNotificationPermission } from "../Services/Firebase";
import { faBell as Bell } from "@fortawesome/free-solid-svg-icons";
import Notifications from "./Notifications";

const Header = ({ toggleSidebar }) => {

  const [count, setCount] = useState(0);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);
  useEffect(() => {
    // Request permission for notifications
    requestNotificationPermission();
    // Listen for foreground messages
    onMessageListener().then((payload) => {
      console.log("Message received in foreground:", payload);
      // alert(payload.notification.title + ": " + payload.notification.body);
      setCount(count + 1);
      GetData();
    }).catch((err) => console.error("Error receiving message:", err));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setOpenNotification(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleNotification = () => {
    setOpenNotification((prev) => !prev);
    setCount(0);
  };

  useEffect(() => {
    GetData();
  }, []);



  async function GetData() {
    try {
      const response = await NotificationService.List();
      setNotifications(response.content);
      // setCount(response.content.length);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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
          {/* <div className="Notifications">
            <FontAwesomeIcon icon={faBell} />
          </div> */}

          <div
            className=" Notify"
            onClick={toggleNotification}
            ref={bellRef}
          >
            {count > 0 && <span className="NotificationCount">{count}</span>}
            {!openNotification ? <FontAwesomeIcon icon={faBell} /> : <FontAwesomeIcon icon={Bell} />}
          </div>

          {/* <div className="Profile">
            <FontAwesomeIcon icon={faUser} />
          </div> */}
        </div>
      </div>
      {openNotification && ( 
                <div
                    className="NotificationsDropdown"
                    ref={dropdownRef} 
                >
                    <Notifications 
                    notificationsData={notifications}
                    />
                </div>
            )}
    </div>
  );
};

export default Header;
