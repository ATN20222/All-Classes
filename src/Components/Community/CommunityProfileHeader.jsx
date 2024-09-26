import React from "react";
import avatarImage from '../../Assets/Images/CommunityLogo.svg';

const CommunityProfileHeader = ()=>{
    return(
        <div className="ProfileHeader">
            <div className="ProfileHeaderImageContainer Center CommunityProfileHeaderContainer">
            <div className="ProfileHeaderBackground "></div>
                <div className="Avatar CommunityProfileHeaderAvatar">
                    <img src={avatarImage} alt="" />
                </div>
                <div className="CimmunityNameProfile">

                <span>Community name</span>
                </div>

            </div>
            <div className="ProfileHeaderNameContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="MembersNumber">
                            2542
                        </div>
                        <div className="MembersTitle">
                            Members
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className="AdminsNumber">
                                100
                            </div>
                            <div className="AdminsTitle">
                                Admins
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}
export default CommunityProfileHeader;