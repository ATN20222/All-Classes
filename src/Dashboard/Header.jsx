import React, { useEffect, useRef, useState } from "react";
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { NotificationService } from "../Services/Api";
import { onMessageListener, requestNotificationPermission } from "../Services/Firebase";
import { faBell as Bell } from "@fortawesome/free-solid-svg-icons";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const [count, setCount] = useState(0);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);
  const searchRef = useRef(null);
  const searchItems = [
    "news",
    "events",
    "buy-and-sell",
    "jobs",
    "forms",
    "admins",
    "members",
    "terms-and-conditions",
    "privacy-policy",
    "about",
    "rewards",
    'chat-rooms',
    'chats',
  ]
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    requestNotificationPermission();
    onMessageListener()
      .then((payload) => {
        console.log("Message received in foreground:", payload);
        setCount((prev) => prev + 1);
        GetData();
      })
      .catch((err) => console.error("Error receiving message:", err));
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

      // Close search bar if clicked outside
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = searchItems.filter((item) =>
      item.toLowerCase().includes(query)
    );

    setSearchResults(filteredResults);
  };

  const formatLink = (text) => {
    return text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };


  return (
    <div className="container">
      <div className="header">
        <div className="SideMenuBtn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="HeaderSearchBar" ref={searchRef}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            onClick={() => setIsSearchOpen(true)}
          />
          <div className="SearchIcon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className={`SearchContainer ${isSearchOpen ? 'SearchContainerActive' : ''}`}>
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <Link key={index} className="SearchItem" to={`/${result.replace(/-/g, "")}`}>
                  {formatLink(result)}
                </Link>
              ))
            )

              :
              <div className="text-center mt-5">
                No Matched Items
              </div>
            }
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
