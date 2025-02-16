import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import avatarImage from '../Assets/Images/AllClassesIco-01.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faDoorOpen, faGift, faHandHoldingHeart, faHome, faInfo, faReceipt, faSignOutAlt, faTags, faTimes, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ManagementContext } from "../Context/ManagementContext";
import { AuthService } from "../Services/Api";
import { RollBackToken, setDB } from "../Services/AxiosApi";

const SideBarMind = ({ isActive, toggleSidebar }) => {
    const { management } = useContext(ManagementContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await AuthService.Me();
            console.log(response);
            setUserData(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    async function logOut() {
        try {
            const response = await AuthService.Logout();
            navigate('/login')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`sidebar ${isActive ? 'ActiveSideMenu' : ''}`}>
            <div className="CloseSidebarBtn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="UserSideBarData">
                <div className="Avatar">
                    <img src={avatarImage} width='50px' height='50px' alt="" />
                </div>
                <div className="UserSideBarName">
                    <span>
                        {userData.name}
                    </span>
                </div>
            </div>
            <ul className="mt-3">
                {!management.includes('cashier') &&
                    <li>
                        <Link to='cashier' className="nav-link">
                            <FontAwesomeIcon icon={faCashRegister} /> Cashier
                        </Link>
                    </li>
                }
                {!management.includes('brands') &&
                    <li>
                        <Link to='brands' className="nav-link">
                            <FontAwesomeIcon icon={faTags} /> Brands
                        </Link>
                    </li>
                }
                {!management.includes('charity') &&
                    <li>
                        <Link to='charity' className="nav-link">
                        <FontAwesomeIcon icon={faHandHoldingHeart} /> Charity
                    </Link>
                    </li>
                }
            {!management.includes('community') &&
                <li>
                    <Link to='community' className="nav-link">
                        <FontAwesomeIcon icon={faUsers} /> Community
                    </Link>
                </li>
            }
            {!management.includes('offers') &&
                <li>
                    <Link to='offers' className="nav-link">
                        <FontAwesomeIcon icon={faGift} /> Offers
                    </Link>
                </li>
            }
            {!management.includes('subscription') &&
                <li>
                    <Link to='subscription' className="nav-link">
                        <FontAwesomeIcon icon={faReceipt} /> Subscription
                    </Link>
                </li>
            }
            <li>
                <div className="nav-link" onClick={() => {
                    RollBackToken();
                    setDB('mind');
                    navigate('homemind');
                }}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </div>
            </li>
        </ul>
        </div >
    );
};

export default SideBarMind;
