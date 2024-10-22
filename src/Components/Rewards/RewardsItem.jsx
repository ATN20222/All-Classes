import { faComment, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const 
RewardsItem = ({ id, details, image, title, points, handleDeleteClicked, handleEditClicked  }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    return (
        <div className="NewsItem">
            <div className="NewsSettings">
                <div className="SettingsBtn" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </div>
                {showMenu && (
                    <div className="SettingsMenu">
                        <div className="MenuItem" onClick={handleEditClicked}>Edit</div>
                        <div className="MenuItem" onClick={handleDeleteClicked}>Delete</div>
                    </div>
                )}
            </div>
            <div className="NewsImageContainer">
                <img src={image} width="100%" alt="" />
            </div>
            
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
