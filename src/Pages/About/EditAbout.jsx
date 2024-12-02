import React, { useEffect, useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { AboutServices } from "../../Services/Api";

const EditAbout = () => {
    const { id } = useParams(); 
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [currentImage, setCurrentImage] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAboutDetails = async () => {
            try {
                const response = await AboutServices.GetById(id); 
                if (response) {
                    setTitle(response.content.title);
                    setCaption(response.content.description);
                    setCurrentImage(response.content.media[0]?.original_url); 

                }
            } catch (error) {
                toast.error('Failed to fetch about details');
            }
        };

        fetchAboutDetails();
    }, [id]);

    const handleEditAbout = async (e) => {
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
                const response = await AboutServices.Edit(id, title, caption, image ); 
                toast.success('About section updated successfully');
                setTimeout(() => {
                    navigate('/about');
                }, 2000);
            } catch (error) {
                toast.error('Failed to update about section');
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

                <form onSubmit={handleEditAbout}>
                    <div className="AddNewsImageContainer">
                        <label htmlFor="AboutImage">
                            <FontAwesomeIcon icon={faImage} />
                        </label>
                        <input
                            type="file"
                            id="AboutImage"
                            className="d-none"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                        />

                        <img src={currentImage} width="100%" alt="News Preview" />

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
                                    {isLoading ? 'Saving...' : 'Update'}
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

export default EditAbout;
