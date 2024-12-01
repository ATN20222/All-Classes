import React, { useState, useEffect } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Notification library
import { RewardsService } from "../../Services/Api";

const EditReward = () => {
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [redeemPoints, setRedeemPoints] = useState('');
    const [rewardDetails, setRewardDetails] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [redeemPointsError, setRedeemPointsError] = useState('');
    const [rewardDetailsError, setRewardDetailsError] = useState('');
    const [imageError, setImageError] = useState('');

    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {        
        getData();
    }, []);

    async function getData() {
        setIsLoading(true);
        try {
            const response = await RewardsService.GetById(id); 
            setTitle(response.content.name);
            setQuantity(response.content.quantity);
            setRedeemPoints(response.content.redeem_points);
            setRewardDetails(response.content.description);
            setImage(response.content.media?.original_url);
        } catch (error) {
            toast.error('Failed to load reward details');
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Reset errors
        setTitleError('');
        setQuantityError('');
        setRedeemPointsError('');
        setRewardDetailsError('');
        setImageError('');
        let valid = true;

        // Validate inputs
        if (!title) {
            setTitleError('Title is required.');
            valid = false;
        }
        if (!quantity) {
            setQuantityError('Quantity is required.');
            valid = false;
        }
        if (!redeemPoints) {
            setRedeemPointsError('Redeem points are required.');
            valid = false;
        }
        if (!rewardDetails) {
            setRewardDetailsError('Reward details are required.');
            valid = false;
        }

        if (valid) {
            setIsLoading(true);
            try {
                const response = await RewardsService.Edit(id, title,quantity,redeemPoints,rewardDetails,image); 
                toast.success('Reward updated successfully');
                setTimeout(() => {
                    navigate('/rewards');
                }, 2000);
            } catch (error) {
                toast.error('Failed to update reward');
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
                        <Link className="AddIconContainer nav-link" to='/rewards'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="Back" />
                        </Link>
                        Edit Reward
                    </div>
                </div>

                <form onSubmit={handleUpdate}>
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

                    <div className="AddField mb-3">
                        <input 
                            type="text" 
                            placeholder="Title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {titleError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{titleError}</div>}
                    </div>

                    <div className="AddField mb-3">
                        <input 
                            type="number" 
                            placeholder="Quantity" 
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {quantityError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{quantityError}</div>}
                    </div>

                    <div className="AddField mb-3">
                        <input 
                            type="number" 
                            placeholder="Redeem points" 
                            value={redeemPoints}
                            onChange={(e) => setRedeemPoints(e.target.value)}
                        />
                        {redeemPointsError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{redeemPointsError}</div>}
                    </div>

                    <div className="AddField mb-3">
                        <textarea 
                            placeholder="Write reward details" 
                            value={rewardDetails}
                            onChange={(e) => setRewardDetails(e.target.value)}
                        />
                        {rewardDetailsError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{rewardDetailsError}</div>}
                    </div>

                    <div className="col-lg-12 ApplicationButtons">
                        <div className="AllClassesBtn AcceptBtn">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Update'}
                            </button>
                        </div>
                        <div className="AllClassesBtn RejectBtn">
                            <button type="button" onClick={() => navigate('/rewards')}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReward;
