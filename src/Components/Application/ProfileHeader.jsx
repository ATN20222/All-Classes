import React from "react";
import avatarImage from '../../Assets/Images/Avatar.svg';

const ProfileHeader = ({Image , Name})=>{
    return(
        <div className="ProfileHeader">
            <div className="ProfileHeaderImageContainer Center">
            <div className="ProfileHeaderBackground"></div>
                <div className="Avatar">
                    <img src={Image?Image:avatarImage} alt="" />
                </div>
            </div>
            <div className="ProfileHeaderNameContainer">
                <span>{Name}</span>
            </div>
        </div>
    );  
}
export default ProfileHeader;