import React, { useEffect, useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import JobImage from '../../Assets/Images/JobImage.png'
import JobPersonImage from '../../Assets/Images/JobsPersonImage.png'
import './Jobs.css'
import { Link, useNavigate } from "react-router-dom";
import EventsItem from "../../Components/Events/EventsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import JobItem from "../../Components/Jobs/JobItem";
import { JobsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
const Jobs = ()=>{

    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [JobIdToDelete, setJobIdToDelete] = useState('');
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([
        {
            id:'',
            type:'',
            description:'',
            user_experience:'',
            location:'',
            salary_range:'',
        }
    ]);

    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await JobsService.List();
            console.log(response);
            // setAllNews(response.content.data);
            setJobs(response.content)
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id)=>{
        try {
                
            const response = await JobsService.Delete(id);
            toast.success('Job deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete job');
            
        }finally{
            setJobIdToDelete('');
        }
    }

    return(
        <div className="MainContent News">
            <DeleteModalComponent
                id={JobIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
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
                        {/* <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div> */}
                        {/* <div className="FilterAdmins">
                            <img src={CategoryIcon} alt="" />
                        </div> */}
                    </div>
                </div>

                    <div className="NewsRow">
                        {jobs.map((row)=>(
                                <JobItem
                                    key={row.id}
                                    id={row.id}
                                    Location={row.location}
                                    experience={row.user_experience}
                                    image={row.media? row.media[0]?.original_url:null}
                                    job_details={row.description}
                                    job_title={row.title}
                                    job_type={row.type}
                                    puplisher_image={row.user?.member?.media[0].original_url}
                                    puplisher_name={row.user?.name}
                                    puplish_date={row.created_at}
                                    salary_range={row.salary_range}
                                    handleEditClicked={()=>navigate(`/editjob/${row.id}`)}
                                    handleDeleteClicked={()=>{
                                        setJobIdToDelete(row.id);
                                        setIsDeleteOverlayOpen(true);
                                    }}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default Jobs;