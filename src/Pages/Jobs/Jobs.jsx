import React, { useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import JobImage from '../../Assets/Images/JobImage.png'
import JobPersonImage from '../../Assets/Images/JobsPersonImage.png'
import './Jobs.css'
import { Link } from "react-router-dom";
import EventsItem from "../../Components/Events/EventsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import JobItem from "../../Components/Jobs/JobItem";
const Jobs = ()=>{
    const events = [
        {
            id :1 , 
            puplisher_name:'Nada ahmed',
            puplish_date:'5 hours ago',
            image:JobImage,
            puplisher_image:JobPersonImage,
            job_title:'advertising manger ',
            Location:' Egypt, Anywhere',
            job_type:'Remote',
            job_details:'• Develop, implement, and manage Amazon advertising campaigns for multiple brands.• Monitor and analyze campaign performance, making data-driven decisions to optimize results.• Conduct thorough keyword research and competitive analysis to enhance ad performance.• Create and maintain detailed reports on campaign performance metrics. How to Apply:Send a  your resume and a cover letter  to Jobs@pinnacle-eg.com.',
            salary_range:'30k-35k',
            experience:'3-5 years',
        },
        {
            id :2 , 
            puplisher_name:'Nada ahmed',
            puplish_date:'5 hours ago',
            image:JobImage,
            puplisher_image:JobPersonImage,
            job_title:'advertising manger ',
            Location:' Egypt, Anywhere',
            job_type:'Remote',
            job_details:'• Develop, implement, and manage Amazon advertising campaigns for multiple brands.• Monitor and analyze campaign performance, making data-driven decisions to optimize results.• Conduct thorough keyword research and competitive analysis to enhance ad performance.• Create and maintain detailed reports on campaign performance metrics. How to Apply:Send a  your resume and a cover letter  to Jobs@pinnacle-eg.com.',
            salary_range:'30k-35k',
            experience:'3-5 years',
        },
    ];


    return(
        <div className="MainContent News">
            <div className="container">
            <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                            to="/addjob"
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Jobs
                    </div>
                    <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        {/* <div className="FilterAdmins">
                            <img src={CategoryIcon} alt="" />
                        </div> */}
                    </div>
                </div>

                    <div className="NewsRow">
                        {events.map((row)=>(
                                <JobItem
                                    key={row.id}
                                    id={row.id}
                                    Location={row.Location}
                                    experience={row.experience}
                                    image={row.image}
                                    job_details={row.job_details}
                                    job_title={row.job_title}
                                    job_type={row.job_type}
                                    puplisher_image={row.puplisher_image}
                                    puplisher_name={row.puplisher_name}
                                    puplish_date={row.puplish_date}
                                    salary_range={row.salary_range}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default Jobs;