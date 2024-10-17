import React, { useEffect, useState } from "react";
import ProfileHeader from "../../Components/Application/ProfileHeader";
import { useParams } from "react-router-dom";
import { MembersService } from "../../Services/Api";
const MemberDetails = ()=>{
    const {id} = useParams();
    const [member , setMember] = useState({});
    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await MembersService.GetById(id);
            console.log("response",response);
            setMember(response.content.member);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className="MainContent">
            <div className="container">
                <ProfileHeader Name={member.first_name+" "+member.last_name} />
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                                Location
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                            {member.location}
                        </div>
                    </div>

                    {/* <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                                Job
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                            Doctor
                        </div>
                    </div> */}

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Date of Birth
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                            {member.date_of_birth}                
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Mobile No
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        {member.mobile_number}                
                        </div>
                    </div>

                    <div className="col-lg-12 mb-5">
                        <div className="ApplicationDetailsItem">
                            <span>
                            ID
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        {member.id}
                        </div>
                    </div>


                    {/* <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Subscriptions
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        Premium
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Bio
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. 
                        </div>
                    </div> */}


                    {/* <div className="col-lg-12 ApplicationButtons">
                        <div className="AllClassesBtn AcceptBtn">
                            <button>Accept</button>
                        </div>
                        <div className="AllClassesBtn RejectBtn">
                            <button>Reject</button>
                        </div>
                    </div> */}

                </div>
                </div>
            </div>
        </div>
    );
}
export default MemberDetails;