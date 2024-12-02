import { faComment, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const 
CharityItem = ({ id, services, image, title,brand_image,brand_info,name,address ,email, website,number ,  handleDeleteClicked, handleEditClicked  }) => {
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
            <div className="AfterNewsImage">
                <div className="NewsLikesComments BrandDataOffer">
                    {/* <div className="BrandOfferAvatr">
                        <img src={brand_image} width="100%" alt="" />
                    </div> */}
                    <span>{name}</span>
                </div>
                

            </div>
            <div className="OfferBrandInfo">
                <span>{brand_info}</span>
            </div>

                <div className="ContactCharity">
                    <span className="text-start ContactTitle">Contact :</span>
                    <div className="container">
                        <div className="row">
                            
                            <div className="col-lg-6 text-start">Address : {address}</div>
                            <div className="col-lg-6 text-start">Number : {number}</div>
                            <div className="col-lg-6 text-start">Website : {website}</div>
                            <div className="col-lg-6 text-start">Email : {email}</div>
                        </div>
                    </div>
                </div>


            
            <div className="NewsCaptionContainer OfferDetailsCard">
                <div className="OfferDetailsTitle">
                    <span>{title}</span>
                </div>
                {/* <div className="OfferPricing">
                    <span className=" text-white">{points+" Point"}</span>
                </div> */}
                <ul>
                {services.map((serv)=>(
                    <li>{serv.name} <br />{serv.description}</li>
                ))}
                </ul>
                <span></span>
            </div>
        </div>
    );
};

export default CharityItem;
