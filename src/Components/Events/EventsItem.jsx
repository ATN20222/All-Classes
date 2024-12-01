import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import imageevent from '../../Assets/Images/EventImage.png'
const EventsItem = ({ id,title , place, image, caption, date ,time, handleDeleteClicked, handleEditClicked}) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="NewsItem">
            <div className="NewsSettings EventSettings">
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
            <div className="EventTitle">
                <span>{title}</span>
            </div>
            {image&&
                <div className="NewsImageContainer">
                    <img src={image} width="100%" alt="" />
                </div>
            }
            <div className="NewsCaptionContainer">
                <span>{caption}</span>
            </div>
            <div className="AfterNewsImage container EventsPlaceDateContainer">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-12 EventPlace">
                            <span>Place : {place}</span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-12 EventDate">
                            <span>Date : {date} , Time : {time}</span>
                    </div>
                </div>
                

                

            </div>
        </div>
    );
};

export default EventsItem;
