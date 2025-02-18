import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisV, faHeart as heart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

const NewsItem = ({ id, image, caption, likes, isLiked, comments, date, handleDeleteClicked, handleEditClicked, handlelikeClick , OpenComments }) => {
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
            <div className="NewsImageContainer">
                <img src={image} width="100%" alt="" />
            </div>
            <div className="NewsCaptionContainer">
                <span>{caption}</span>
            </div>
            <div className="AfterNewsImage">
                <div className="NewsLikesComments">
                    <div className={`LikesIconContainer ${isLiked ? 'isLiked' : ''}`} onClick={() => handlelikeClick(id)}>
                        <FontAwesomeIcon icon={isLiked ? heart : faHeart} />
                        <span>{likes}</span>
                    </div>
                    <div className="CommentsIconContainer" onClick={() => OpenComments(id)}>
                        <FontAwesomeIcon icon={faComment} />
                        <span>{comments.length}</span>
                    </div>
                </div>
                <div className="NewsDate">
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
