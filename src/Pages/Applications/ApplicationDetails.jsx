import React, { useEffect, useState } from "react";
import './Applications.css'
import ProfileHeader from "../../Components/Application/ProfileHeader";
import { useNavigate, useParams } from "react-router-dom";
import { ApplicationsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
const ApplicationDetails = ()=>{
    const {id} = useParams();
    const [member , setMember] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await ApplicationsService.GetById(id);
            console.log("response",response);
            setMember(response.content.member);
        } catch (error) {
            console.error(error);
        }
    }

    const handleApplicationState = async (state)=>{
        setIsLoading(true);
        
        try {

                
            const response = await ApplicationsService.ApplicationStateChange(id , state);
            toast.success('Success');
            setTimeout(()=>{
                navigate('/applications')
            },2000)
            getData();
        } catch (error) {
            toast.error('Failed');
            
        }finally{
            setIsLoading(false);
        }
    }





    return(
        <div className="MainContent">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
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

                    <div className="col-lg-12">
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
                    {isLoading ? (
                        <div className="col-lg-12 Center mt-5 mb-5">
                            <div className="loader">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>
                    ) :
                    <div className="col-lg-12 ApplicationButtons">
                        <div className="AllClassesBtn AcceptBtn">
                            <button onClick={()=>handleApplicationState('approved')}>Accept</button>
                        </div>
                        <div className="AllClassesBtn RejectBtn">
                            <button onClick={() => navigate('/applications')}>Cancel</button>
                        </div>
                    </div>
                    }

                    

                </div>
                </div>
            </div>
        </div>
    );
}
export default ApplicationDetails;