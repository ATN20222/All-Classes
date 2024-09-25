import React, { useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import EventImage from '../../Assets/Images/EventImage.png'
import './Events.css'
import { Link } from "react-router-dom";
import EventsItem from "../../Components/Events/EventsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Events = ()=>{
    const events = [
        {
            id :1 , 
            title:'Event Title',
            image:EventImage,
            caption:'Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing',
            Place:'Costa coffe mall of egypt',
            Date:'Monday at 8:00pm'
        },
        {
            id :2, 
            title:'Event Title',
            image:EventImage,
            caption:'Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing securing bookings, communicating with vendors, managing crowds,Your business most likely focuses on the following things each day: securing bookings, communicating with vendors, managing crowds, and marketing',
            Place:'Costa coffe mall of egypt',
            Date:'Monday at 8:00pm'
        },
    ];


    return(
        <div className="MainContent News">
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
                                    caption={row.caption}
                                    date={row.Date}
                                    place={row.Place}
                                    image={row.image}
                                    title={row.title}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default Events;