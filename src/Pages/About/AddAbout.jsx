import React, { useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { AboutServices } from "../../Services/Api";

const AddAbout = () => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const navigate = useNavigate();

    const handleAddAbout = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({});
        let valid = true;

        // Validate inputs
        if (!title) {
            setErrors((prev) => ({ ...prev, title: 'Title is required.' }));
            valid = false;
        }
        if (!caption) {
            setErrors((prev) => ({ ...prev, caption: 'Caption is required.' }));
            valid = false;
        }
        // if (!image) {
        //     setErrors((prev) => ({ ...prev, image: 'Image is required.' }));
        //     valid = false;
        // }

        if (valid) {
            setIsLoading(true);
            try {
                const response = await AboutServices.Add(title, caption, image);
                toast.success('About section added successfully');
                setTimeout(() => {
                    navigate('/about');
                }, 2000);
            } catch (error) {
                toast.error('Failed to add about section');
            } finally {
                setIsLoading(false);
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
            <Toaster position="top-right" reverseOrder={false} />

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to='/about'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="Back" />
                        </Link>
                        About
                    </div>
                </div>

                <form onSubmit={handleAddAbout}>
                    <div className="AddNewsImageContainer EditNewsImageContainer">
                        <label htmlFor="AboutImage" className="absolute">
                            <FontAwesomeIcon icon={faImage} />
                        </label>
                        <input
                            type="file"
                            id="AboutImage"
                            className="d-none"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                            />
                            {currentImage&&
                            
                            <img src={currentImage} width="100%" alt="News Preview" />
                            }                        
                        
                        {errors.image && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.image}</div>}
                    </div>

                    <div className="AddField mb-3">
                        <label>
                            <input
                                type="text"
                                placeholder="Title"
                                className="AddField"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        {errors.title && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.title}</div>}
                    </div>

                    <div className="AddNewsCaptionContainer">
                        <textarea
                            placeholder="Write a caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        {errors.caption && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.caption}</div>}
                    </div>

                    {isLoading ? (
                        <div className="col-lg-12 Center mt-5 mb-5">
                            <div className="loader">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-lg-12 ApplicationButtons">
                            <div className="AllClassesBtn AcceptBtn">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                            <div className="AllClassesBtn RejectBtn">
                                <button type="button" onClick={() => navigate('/about')}>Cancel</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddAbout;
