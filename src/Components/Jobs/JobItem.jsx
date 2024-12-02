import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const JobItem = ({
    experience,
    salary_range,
    job_details,
    job_type,
    Location,
    job_title,
    puplisher_image,
    puplish_date,
    puplisher_name,
    image,
    handleDeleteClicked,
    handleEditClicked,
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showMore, setShowMore] = useState(false); // State for showing more details

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="NewsItem">
            <div className="NewsSettings JobSettings">
                <div className="SettingsBtn" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faEllipsisV} className="text-dark" />
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
                    {puplisher_image&&
                        <div className="Avatar">
                            <img src={puplisher_image} width="100%" alt="" />
                        </div>
                    }
                    <div className="JobNameAndDate">
                        <h6>{puplisher_name}</h6>
                        <span>{puplish_date}</span>
                    </div>
                </div>
            </div>
            {image&&
                <div className="NewsImageContainer">
                    <img src={image} width="100%" alt="" />
                </div>
            }
            <div className="JobContentContainer">
                {job_title && (
                    <div className="JobDetailItem">
                        <h5 className="JobDetailTitle">{job_title}</h5>
                    </div>
                )}
                {Location && (
                    <div className="JobDetailItem">
                        <span className="JobDetailLabel">Location:</span>
                        <span className="JobDetailValue">{Location} ({job_type})</span>
                    </div>
                )}
                {experience && (
                    <div className="JobDetailItem">
                        <span className="JobDetailLabel">Experience:</span>
                        <span className="JobDetailValue">{experience}</span>
                    </div>
                )}
                {salary_range && (
                    <div className="JobDetailItem">
                        <span className="JobDetailLabel">Salary Range:</span>
                        <span className="JobDetailValue">{salary_range}</span>
                    </div>
                )}
                {job_details && (
                    <div className="JobDetailItem">
                        <span className="JobDetailLabel">Job Details:</span>
                        {showMore ? (
                            job_details.split('\n').map((line, index) => (
                                <p key={index} className="JobDetailText">{line}</p>
                            ))
                        ) : (
                            <>
                                {job_details.split('\n').slice(0, 2).map((line, index) => (
                                    <p className="JobDetailText mb-1" key={index}>{line}</p>
                                ))}
                                
                                {job_details.split('\n').length > 2 && (
                                    <span onClick={toggleShowMore} className="show-more-button text-nav-underline">
                                        Show More
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobItem;
