import { faComment, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

const RewardsItem = ({ id, details, image, title, points, handleDeleteClicked, handleEditClicked  }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };



        const menuRef = useRef(null);
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        useEffect(() => {
            if (showMenu) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [showMenu]);


    return (
        <div className="NewsItem">
            <div className="NewsSettings">
                <div className="SettingsBtn" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
                {showMenu && (
                    <div className="SettingsMenu" ref={menuRef}>
                        <div className="MenuItem" onClick={handleEditClicked}>Edit</div>
                        <div className="MenuItem" onClick={handleDeleteClicked}>Delete</div>
                    </div>
                )}
            </div>
            {image&&
            
                <div className="NewsImageContainer">
                    <img src={image} width="100%" alt="" />
                </div>
            }
            
            <div className="NewsCaptionContainer OfferDetailsCard mt-2">
                <div className="OfferDetailsTitle">
                    <span>{title}</span>
                </div>
                <div className="OfferPricing">
                    <span className=" text-white">{points+" Point"}</span>
                </div>
                <span>{details}</span>
            </div>
        </div>
    );
};

export default RewardsItem;
