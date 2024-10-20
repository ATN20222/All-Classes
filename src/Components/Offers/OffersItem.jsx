import { faComment, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const 
OffersItem = ({ id, details, image, title, price_after, price_before,brand_image,brand_rating,brand_info,brand_name, code,  handleDeleteClicked, handleEditClicked  }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

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
            <div className="AfterNewsImage">
                <div className="NewsLikesComments BrandDataOffer">
                    <div className="BrandOfferAvatr">
                        <img src={brand_image} width="100%" alt="" />
                    </div>
                    <span>{brand_name}</span>
                </div>
                <div className="NewsDate BrandOfferRating">
                    <span>
                        {/* {renderStars(brand_rating)} */}
                        Code : {code}
                    </span>
                </div>

            </div>
            <div className="OfferBrandInfo">
                <span>{brand_info}</span>
            </div>
            
            <div className="NewsCaptionContainer OfferDetailsCard">
                <div className="OfferDetailsTitle">
                    <span>{title}</span>
                </div>
                <div className="OfferPricing">
                    <span><s>{price_before+" EGP"}</s></span> 
                    <span>{price_after+" EGP"}</span>
                </div>
                <span>{details}</span>
            </div>
        </div>
    );
};

export default OffersItem;
