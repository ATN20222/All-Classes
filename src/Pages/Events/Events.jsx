import React, { useEffect, useState, useCallback, useRef } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg';
import EventImage from '../../Assets/Images/EventImage.png';
import './Events.css';
import { Link, useNavigate } from "react-router-dom";
import EventsItem from "../../Components/Events/EventsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { EventService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import toast, { Toaster } from "react-hot-toast";

const Events = () => {
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [EventIdToDelete, setEventIdToDelete] = useState('');
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    
    const navigate = useNavigate();
    const mainContentRef = useRef(null);

    const getData = async (page = 1) => {
        if (loading || (page > 1 && !pagination?.next_page_url)) return;

        setLoading(true);
        try {
            const response = await EventService.List(page);
            if (response?.content) {
                setEvents(prevEvents => page === 1 ? response.content : [...prevEvents, ...response.content]);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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

        console.log("Scroll Position:", { scrollTop, scrollHeight, clientHeight });

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
            await EventService.Delete(id);
            toast.success('Event deleted successfully');
            getData(1);
        } catch (error) {
            toast.error('Failed to delete event');
        } finally {
            setEventIdToDelete('');
        }
    };

    return (
        <div className="MainContent News" ref={mainContentRef}>
            <DeleteModalComponent
                id={EventIdToDelete}
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
                        <Link className="AddIconContainer nav-link" to="/addevent">
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Events
                    </div>
                </div>
                <div className="NewsRow">
                    {events.map((row) => (
                        <EventsItem
                            key={row.id}
                            id={row.id}
                            caption={row.description}
                            date={row.date}
                            place={row.place}
                            image={row.media.length > 0 ? row.media[0]?.original_url : null}
                            title={row.title}
                            time={row.time}
                            handleEditClicked={() => navigate(`/editevent/${row.id}`)}
                            handleDeleteClicked={() => {
                                setIsDeleteOverlayOpen(true);
                                setEventIdToDelete(row.id);
                            }}
                        />
                    ))}
                </div>
                {loading && (
                    <div className="col-lg-12 Center mt-5 mb-5">
                        <div className="loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
