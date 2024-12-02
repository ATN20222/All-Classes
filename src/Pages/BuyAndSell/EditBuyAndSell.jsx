import React, { useEffect, useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { BuyAndSellService } from "../../Services/Api";

const EditBuyAndSell = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [currentImage, setCurrentImage] = useState(null);
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAfter, setPriceAfter] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await BuyAndSellService.GetById(id);
            setDetails(response.content.description);
            setTitle(response.content.title);
            setPriceAfter(response.content.price_after);
            setPriceBefore(response.content.price_before);
            setCurrentImage(response.content.media[response.content.media.length-1]?.original_url);
        } catch (error) {
            console.error(error);
        }
    }   


    const handleEditSell = async (e) => {
        e.preventDefault();
        
        // Reset errors
        setErrors({});
        let valid = true;

        // Validate inputs
        if (!title) {
            setErrors((prev) => ({ ...prev, title: 'Sell title is required.' }));
            valid = false;
        }
        if (!priceBefore) {
            setErrors((prev) => ({ ...prev, priceBefore: 'Price before is required.' }));
            valid = false;
        }
        if (!priceAfter) {
            setErrors((prev) => ({ ...prev, priceAfter: 'Price after is required.' }));
            valid = false;
        }
        if (!details) {
            setErrors((prev) => ({ ...prev, details: 'Details are required.' }));
            valid = false;
        }
        // if (!image) {
        //     setErrors((prev) => ({ ...prev, image: 'Image is required.' }));
        //     valid = false;
        // }

        if (valid) {
            setIsLoading(true);
            try {
                console.log(image);
                const response = await BuyAndSellService.Edit(id,title, priceBefore, priceAfter, details, image);
                toast.success('Item edited successfully');
                setTimeout(() => {
                    navigate('/buyandsell');
                }, 2000);
            } catch (error) {
                toast.error('Failed to edit item');
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
                        <Link className="AddIconContainer nav-link" to='/buyandsell'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="Back" />
                        </Link>
                        Buy & Sell
                    </div>
                </div>

                <form onSubmit={handleEditSell}>
                <div className="AddNewsImageContainer EditNewsImageContainer">
                        <label htmlFor="NewsImage">
                            <FontAwesomeIcon icon={faImage} />
                        </label>
                        <input 
                            type="file" 
                            id="NewsImage" 
                            className="d-none" 
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange} // Handle image selection
                        />
                        <img src={currentImage} width="100%" alt="buy and sell" />
                        {errors.image && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.image}</div>}
                    </div>

                    <div className="AddField">
                        <label>
                            <input
                                type="text"
                                placeholder="Sell title"
                                className="AddField"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        {errors.title && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.title}</div>}
                    </div>

                    <div className="AddField">
                        <label>
                            <input
                                type="number"
                                placeholder="Price before"
                                className="AddField"
                                value={priceBefore}
                                onChange={(e) => setPriceBefore(e.target.value)}
                            />
                        </label>
                        {errors.priceBefore && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.priceBefore}</div>}
                    </div>

                    <div className="AddField">
                        <label>
                            <input
                                type="number"
                                placeholder="Price after"
                                className="AddField"
                                value={priceAfter}
                                onChange={(e) => setPriceAfter(e.target.value)}
                            />
                        </label>
                        {errors.priceAfter && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.priceAfter}</div>}
                    </div>

                    <div className="AddField">
                        <textarea
                            placeholder="Write sell details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                        {errors.details && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.details}</div>}
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
                                <button type="button" onClick={() => navigate('/buyandsell')}>Cancel</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default EditBuyAndSell;
