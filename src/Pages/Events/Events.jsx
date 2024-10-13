import React, { useEffect, useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import EventImage from '../../Assets/Images/EventImage.png'
import './Events.css'
import { Link, useNavigate } from "react-router-dom";
import EventsItem from "../../Components/Events/EventsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { EventService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import toast, { Toaster } from "react-hot-toast";
const Events = ()=>{
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);  

    // const events = [
    //     {
    //         id :1 , 
    //         title:'Event Title',
    //         image:EventImage,
    //         caption:'Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing',
    //         Place:'Costa coffe mall of egypt',
    //         Date:'Monday at 8:00pm'
    //     },
    //     {
    //         id :2, 
    //         title:'Event Title',
    //         image:EventImage,
    //         caption:'Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing',
    //         Place:'Costa coffe mall of egypt',
    //         Date:'Monday at 8:00pm'
    //     },
    // ];
    const navigate = useNavigate()
    const [events , setEvents] = useState([]);
    const [EventIdToDelete, setEventIdToDelete] = useState('');
    useEffect(()=>{
        getData();
    },[])
    

    async function getData() {
        try {
            const response = await EventService.List();
            console.log(response.content)
            setEvents(response.content);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async (id)=>{
        try {
                
            const response = await EventService.Delete(id);
            toast.success('Event deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete event');
            
        }finally{
            setEventIdToDelete('')
        }
    }

    return(
        <div className="MainContent News">
            <DeleteModalComponent
                id={EventIdToDelete}
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
                            to="/addevent"
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Events
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
                                <EventsItem
                                    key={row.id}
                                    id={row.id}
                                    caption={row.description}
                                    date={row.date}
                                    place={row.place}
                                    image={row.image}
                                    title={row.title}
                                    time={row.time}
                                    handleEditClicked={()=>navigate(`/editevent/${row.id}`)}
                                    handleDeleteClicked={()=>{
                                        setIsDeleteOverlayOpen(true);
                                        setEventIdToDelete(row.id);
                                    }}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default Events;