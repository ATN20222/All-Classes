import React from "react";
import './Applications.css'
import ProfileHeader from "../../Components/Application/ProfileHeader";
import { useParams } from "react-router-dom";
const ApplicationDetails = ()=>{
    const {id} = useParams();
    return(
        <div className="MainContent">
            <div className="container">
                <ProfileHeader/>
                <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                                Location
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                            5st mohamed - new cairo -egypt
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                                Job
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                            Doctor
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Date of Birth
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                            23/05/1995                        
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Mobile No
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        (+02) 0107674873
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            ID
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        FA3C633
                        </div>
                    </div>


                    <div className="col-lg-12">
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
                    </div>
                    <div className="col-lg-12 ApplicationButtons">
                        <div className="AllClassesBtn AcceptBtn">
                            <button>Accept</button>
                        </div>
                        <div className="AllClassesBtn RejectBtn">
                            <button>Reject</button>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
    );
}
export default ApplicationDetails;