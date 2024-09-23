import React from "react";
import avatarImage from '../../Assets/Images/Avatar.svg';

const ProfileHeader = ()=>{
    return(
        <div className="ProfileHeader">
            <div className="ProfileHeaderImageContainer Center">
            <div className="ProfileHeaderBackground"></div>
                <div className="Avatar">
                    <img src={avatarImage} alt="" />
                </div>
            </div>
            <div className="ProfileHeaderNameContainer">
                <span>Melissa peters</span>
            </div>
        </div>
    );  
}
export default ProfileHeader;