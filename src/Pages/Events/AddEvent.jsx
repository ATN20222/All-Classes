import React, { useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { EventService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";

const AddEvent = () => {
    // State for form fields
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [groupChatName, setGroupChatName] = useState('');
    const [place, setPlace] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [image, setImage] = useState(null);

    // State for error messages
    const [titleError, setTitleError] = useState('');
    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [groupChatNameError, setGroupChatNameError] = useState('');
    const [placeError, setPlaceError] = useState('');
    const [detailsError, setDetailsError] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [imageError, setImageError] = useState('');
    const navigate = useNavigate();

    // Validate form on submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset all error messages
        setTitleError('');
        setDateError('');
        setGroupChatNameError('');
        setPlaceError('');
        setDetailsError('');
        setImageError('');

        let valid = true;

        if (!eventTitle) {
            setTitleError('Event title is required.');
            valid = false;
        }

        if (!eventDate) {
            setDateError('Event date is required.');
            valid = false;
        }
        if (!eventTime) {
            setTimeError('Event times is required.');
            valid = false;
        }

        // if (!groupChatName) {
        //     setGroupChatNameError('Group chat name is required.');
        //     valid = false;
        // }

        if (!place) {
            setPlaceError('Event place is required.');
            valid = false;
        }

        if (!eventDetails) {
            setDetailsError('Event details are required.');
            valid = false;
        }

        if (!image) {
            setImageError('Event image is required.');
            valid = false;
        }

        if (valid) {
            try {
                
                const response = EventService.Add(eventTitle, eventDate ,eventTime,place,eventDetails,image);
                toast.success('Event added successfully');
                setTimeout(() => {
                    
                    navigate('/events');
                }, 2000);
                
            } catch (error) {
                toast.error('Failed to add event');
                
            }
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentImage(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="MainContent">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to="/events">
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Events
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="AddNewsImageContainer EditNewsImageContainer">
                        <label htmlFor="NewsImage" className="absolute">
                            <FontAwesomeIcon icon={faImage} />
                        </label>
                        <input 
                            type="file" 
                            id="NewsImage" 
                            className="d-none" 
                            accept="image/png, image/jpeg" 
                            onChange={handleImageChange}
                        />
                        {/* Display image error */}
                        {currentImage&&
                        
                        <img src={currentImage} width="100%" alt="News Preview" />
                        }
                        {imageError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{imageError}</div>}
                    </div>

                    <div className="AddField">
                        <label htmlFor="">
                            <input
                                type="text"
                                placeholder="Event title"
                                className="AddField"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                            />
                        </label>
                        {/* Display title error */}
                        {titleError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{titleError}</div>}
                    </div>

                    <div className="AddField">
                        <label htmlFor="">
                            <input
                                type="date"
                                placeholder="Date"
                                className="AddField"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </label>
                        {/* Display date error */}
                        {dateError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{dateError}</div>}
                    </div>
                    <div className="AddField">
                        <label htmlFor="">
                            <input
                                type="time"
                                placeholder="time"
                                className="AddField"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                            />
                        </label>
                        {/* Display date error */}
                        {timeError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{timeError}</div>}
                    </div>

                    {/* <div className="AddField">
                        <label htmlFor="">
                            <input
                                type="text"
                                placeholder="Group chat name"
                                className="AddField"
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </label>
                        {groupChatNameError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{groupChatNameError}</div>}
                    </div> */}

                    <div className="AddField">
                        <label htmlFor="">
                            <input
                                type="text"
                                placeholder="Place"
                                className="AddField"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                            />
                        </label>
                        {/* Display place error */}
                        {placeError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{placeError}</div>}
                    </div>

                    <div className="AddField">
                        <textarea
                            name=""
                            id=""
                            placeholder="Write event details"
                            value={eventDetails}
                            onChange={(e) => setEventDetails(e.target.value)}
                        ></textarea>
                        {/* Display event details error */}
                        {detailsError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{detailsError}</div>}
                    </div>

                    <div className="col-lg-12 ApplicationButtons">
                        <div className="AllClassesBtn AcceptBtn">
                            <button type="submit">Save</button>
                        </div>
                        <div className="AllClassesBtn RejectBtn">
                            <button type="button" onClick={() => window.history.back()}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
