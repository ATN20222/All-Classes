import React, { useContext, useState } from "react";
import "./Sidebar.css";
import avatarImage from '../Assets/Images/Avatar.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faDoorOpen, faFileContract, faGifts, faHome, faInfo, faMoneyBillTransfer, faSearch, faShield, faShieldHalved, faTimes } from "@fortawesome/free-solid-svg-icons"; // Import faTimes for close icon
import { Link, useNavigate } from "react-router-dom";
import { faCalendarDays, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { ManagementContext } from "../Context/ManagementContext";
import { RollBackToken, setDB } from "../Services/AxiosApi";

const Sidebar = ({ isActive, toggleSidebar }) => {

  

  const [managements] = useState([
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
    "rewards"
  ]); 
  const [selectedManagements, setSelectedManagements] = useState([]);
  const handleManagementChange = (management) => {
    setSelectedManagements((prevSelected) => {
      if (prevSelected.includes(management)) {
        return prevSelected.filter((m) => m !== management);
      } else {
        return [...prevSelected, management];
      }
    });
  };
  const { management } = useContext(ManagementContext);
  const navigate = useNavigate();
  return (
    <div className={`sidebar ${isActive ? 'ActiveSideMenu' : ''}`}>
      {console.log(management)}
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
        {/* <li>
          <div className="SideBarServices">
            <div className="TextAndIcon">
              <FontAwesomeIcon icon={faCubesStacked} /> Services
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </li> */}
        {management.includes('news')&&
          <li>
            <Link to='news' className="nav-link">
              <FontAwesomeIcon icon={faNewspaper} /> News
            </Link>
          </li>
        }
        {management.includes('events')&&
          <li>
            <Link to='events' className="nav-link">
              <FontAwesomeIcon icon={faCalendarDays} /> Events
            </Link>
          </li>
        }
        {management.includes('buy-and-sell')&&
          <li>
            <Link to='buyandsell' className="nav-link">
              <FontAwesomeIcon icon={faMoneyBillTransfer} /> Buy and Sell
            </Link>
          </li>
        }
        {management.includes('jobs')&&
        
        <li>
          <Link to='jobs' className="nav-link">
            <FontAwesomeIcon icon={faBriefcase} /> Jobs
          </Link>
        </li>
        }
        {management.includes('rewards')&&
          <li>
            <Link to='rewards' className="nav-link">
              <FontAwesomeIcon icon={faGifts} /> Rewards
            </Link>
          </li>
        }
        {management.includes('terms-and-conditions')&&
          <li>
            <Link to='termsandconditions' className="nav-link">
              <FontAwesomeIcon icon={faFileContract} /> Terms and Conditions
            </Link>
          </li>
        }
        {management.includes('privacy-policy')&&
          <li>
            <Link to='privacypolicy' className="nav-link">
              <FontAwesomeIcon icon={faShieldHalved} /> Privacy Policy
            </Link>
          </li>
        }
        {management.includes('about')&&
          <li>
            <Link to='about' className="nav-link">
              <FontAwesomeIcon icon={faInfo} /> About
            </Link>
          </li>
        }

        {
          <li>
            <div className="nav-link" onClick={()=>{
              RollBackToken();
              setDB('mind');
              navigate('homemind')
            }}>
              <FontAwesomeIcon icon={faDoorOpen} /> Back to MIND
            </div>
          </li> 
        }

        


      </ul>
    </div>
  );
};

export default Sidebar;
