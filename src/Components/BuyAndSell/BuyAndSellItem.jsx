import { faComment, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const BuyAndSellItem = ({discount,total_price,price,rating,buy_details,Location,buy_title,image,puplisher_image,puplish_date,puplisher_name,id , handleEditClicked ,handleDeleteClicked }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    // Function to render stars based on the rating
    const renderStars = (rating) => {
        const totalStars = 5; // Assuming a 5-star rating system
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <FontAwesomeIcon 
                    key={i} 
                    icon={i <= rating ? solidStar : faStar} 
                    className="star-icon"
                />
            );
        }

        return stars;
    };

    return (
        <div className="NewsItem">
            <div className="NewsSettings JobSettings">
                <div className="SettingsBtn " onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faEllipsisV}  className="text-dark"/>
                </div>
                {showMenu && (
                    <div className="SettingsMenu">
                        <div className="MenuItem" onClick={handleEditClicked}>Edit</div>
                        <div className="MenuItem" onClick={handleDeleteClicked}>Delete</div>
                    </div>
                )}
            </div>
            <div className="EventTitle">
                <div className="CommenterImage JobPuplisherData">
                    <div className="Avatar">
                        <img src={puplisher_image} width="100%" alt="" />
                    </div>
                    <div className="JobNameAndDate">
                        <h6>{puplisher_name}</h6>
                        <span>{puplish_date}</span>
                    </div>
                </div>
            </div>
            <div className="NewsImageContainer">
                <img src={image} width="100%" alt="" />
            </div>
            <div className="BuyRating">
                <span>
                    {renderStars(rating)}
                </span>
            </div>
            <div className="NewsCaptionContainer">
                {buy_title &&
                    <div className="BuyTitle">
                        <h6>
                            {buy_title}
                        </h6>
                    </div>
                }
                {buy_details &&
                    <div className="BuyDetails">
                        <span>{buy_details}</span>
                    </div>
                }
            </div>
            <div className="BuyPrice">
                <div className="Price">
                    {price+'EGP'}
                    <div className="buyLine"></div>
                </div>
                <div className="TotalPrice">
                    {total_price+'EGP'}
                </div>
            </div>
        </div>
    );
};

export default BuyAndSellItem;
