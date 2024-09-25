import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const JobItem = ({ experience,salary_range, job_details,job_type,Location,job_title,puplisher_image,puplish_date,puplisher_name, image,  handleDeleteClicked, handleEditClicked}) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
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
                {/* <span>{title}</span> */}
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
            <div className="NewsCaptionContainer">
                {job_title&&
                    <div className="JobDescriptionItem">
                        <span className="JobDescriptionTitle">Job title: </span>
                        <span>{job_title}</span>
                    </div>
                }
                {Location&&
                    <div className="JobDescriptionItem">
                        <span className="JobDescriptionTitle">Location: </span>
                        <span>{Location} ({job_type})</span>
                    </div>
                }
                {experience&&
                    <div className="JobDescriptionItem">
                        <span className="JobDescriptionTitle">Experience: </span>
                        <span>{experience}</span>
                    </div>
                }
                {salary_range&&
                    <div className="JobDescriptionItem">
                        <span className="JobDescriptionTitle">Salary: </span>
                        <span>{salary_range}</span>
                    </div>
                }
                {job_details&&
                    <div className="JobDescriptionItem">
                        <span className="JobDescriptionTitle">Job details: </span>
                        <span>{job_details}</span>
                    </div>
                }
            </div>
           
        
        </div>
    );
};

export default JobItem;
