import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const AboutItem = ({ id, image, caption, title, handleDeleteClicked, handleEditClicked, handlelikeClick }) => {
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
            {image&&
                <div className="NewsImageContainer">
                    <img src={image} width="100%" alt="" />
                </div>
            }
            <div className="NewsCaptionContainer">
                <h5>{title}</h5>
            </div>
            <div className="NewsCaptionContainer">
                <span>{caption}</span>
            </div>
        </div>
    );
};

export default AboutItem;
