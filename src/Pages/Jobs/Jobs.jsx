import React, { useCallback, useEffect, useState, useRef } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg';
import { Link, useNavigate } from "react-router-dom";
import JobItem from "../../Components/Jobs/JobItem";
import { JobsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import './Jobs.css';

const Jobs = () => {
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [JobIdToDelete, setJobIdToDelete] = useState('');
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const mainContentRef = useRef(null);

    const getData = async (page = 1) => {
        if (loading || (page > 1 && !pagination?.next_page_url)) return;

        setLoading(true);
        try {
            const response = await JobsService.List(page);
            if (response?.content) {
                setJobs(prevJobs => page === 1 ? response.content : [...prevJobs, ...response.content]);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setJobs([]);
        getData(1);
    }, []);

    useEffect(() => {
        if (currentPage > 1) {
            getData(currentPage);
        }
    }, [currentPage]);

    const handleScroll = useCallback(() => {
        if (!mainContentRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = mainContentRef.current;

        // console.log("Scroll Position:", { scrollTop, scrollHeight, clientHeight });

        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && pagination?.next_page_url) {
            console.log("Fetching new data...");
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, [loading, pagination?.next_page_url]);

    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (mainContentRef.current) {
                mainContentRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);

    const handleDelete = async (id) => {
        try {
            await JobsService.Delete(id);
            toast.success('Job deleted successfully');
            getData(1);
        } catch (error) {
            toast.error('Failed to delete job');
        } finally {
            setJobIdToDelete('');
        }
    };

    return (
        <div className="MainContent News" ref={mainContentRef}>
            <DeleteModalComponent
                id={JobIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to="/addjob">
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Jobs
                    </div>
                </div>
                <div className="NewsRow">
                    {jobs.map((row) => (
                        <JobItem
                            key={row.id}
                            id={row.id}
                            Uid={row.user?.id}
                            Location={row.location}
                            experience={row.user_experience}
                            image={row.media ? row.media[0]?.original_url : null}
                            job_details={row.description}
                            job_title={row.title}
                            job_type={row.type}
                            puplisher_image={row.user?.member?.media.length > 0 ? row.user?.member?.media[0].original_url : null}
                            puplisher_name={row.user?.name}
                            puplish_date={row.created_at}
                            salary_range={row.salary_range}
                            handleEditClicked={() => navigate(`/editjob/${row.id}`)}
                            handleDeleteClicked={() => {
                                setJobIdToDelete(row.id);
                                setIsDeleteOverlayOpen(true);
                            }}
                        />
                    ))}
                </div>
                {loading &&

                    <div className="col-lg-12 Center mt-5 mb-5">
                        <div className="loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Jobs;