import React, { useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { NewsService } from "../../Services/Api";

const AddNews = () => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [captionError, setCaptionError] = useState('');
    const [imageError, setImageError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const handleShare = async (e) => {
        e.preventDefault();
        
        // Reset errors
        setCaptionError('');
        setImageError('');
        let valid = true;

        // Validate inputs
        if (!caption) {
            setCaptionError('Caption is required.');
            valid = false;
        }

        // if (!image) {
        //     setImageError('Image is required.');
        //     valid = false;
        // }

        if (valid) {
            setIsLoading(true);
            try {
                const response = await NewsService.Add(caption , image);
                toast.success('News shared successfully');
                setTimeout(() => {
                    
                    navigate('/news');
                }, 2000);
                
            } catch (error) {
                toast.error('Failed to share news');
            } finally {
                setIsLoading(false); 
            }
        }
    };

    return (
        <div className="MainContent">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to='/news'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        News
                    </div>
                </div>

                <form onSubmit={handleShare}>
                    <div className="AddNewsImageContainer">
                        <label htmlFor="NewsImage">
                            <FontAwesomeIcon icon={faImage} />
                        </label>
                        <input 
                            type="file" 
                            id="NewsImage" 
                            className="d-none" 
                            accept="image/png, image/jpeg"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {imageError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{imageError}</div>}
                    </div>

                    <div className="AddNewsCaptionContainer">
                        <textarea 
                            name="caption" 
                            id="caption" 
                            placeholder="Write a caption" 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        {captionError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{captionError}</div>}
                    </div>

                    {isLoading?
                        <div className="col-lg-12 Center mt-5 mb-5">
                            <div class="loader ">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>
                        
                        :


                    <div className="col-lg-12 ApplicationButtons">
                        
                        <div className="AllClassesBtn AcceptBtn">
                            <button 
                                type="submit" 
                                disabled={isLoading} >
                                {isLoading ? 'Sharing...' : 'Share'} 
                            </button>
                        </div>
                        <div className="AllClassesBtn RejectBtn">
                            <button type="button" onClick={() => window.history.back()}>Cancel</button>
                        </div>
                        
                        
                    </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default AddNews;
