import React, { useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { BuyAndSellService } from "../../Services/Api";

const AddBuyAndSell = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddSell = async (e) => {
        e.preventDefault();
        
        // Reset errors
        setErrors({});
        let valid = true;

        // Validate inputs
        if (!title) {
            setErrors((prev) => ({ ...prev, title: 'Sell title is required.' }));
            valid = false;
        }
        if (!price) {
            setErrors((prev) => ({ ...prev, price: 'Price is required.' }));
            valid = false;
        }
        // if (!discount) {
        //     setErrors((prev) => ({ ...prev, discount: 'Discount is required.' }));
        //     valid = false;
        // }
        if (!details) {
            setErrors((prev) => ({ ...prev, details: 'Details are required.' }));
            valid = false;
        }
        if (!image) {
            setErrors((prev) => ({ ...prev, image: 'Image is required.' }));
            valid = false;
        }

        if (valid) {
            setIsLoading(true);
            try {
                
                const response = await BuyAndSellService.Add(title, price, discount, details, image);
                toast.success('Item added successfully');
                setTimeout(() => {
                    navigate('/buyandsell');
                }, 2000);
            } catch (error) {
                toast.error('Failed to add item');
            } finally {
                setIsLoading(false);
            }
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

                <form onSubmit={handleAddSell}>
                    <div className="AddNewsImageContainer">
                        <label htmlFor="SellImage">
                            <FontAwesomeIcon icon={faImage} />
                        </label>
                        <input
                            type="file"
                            id="SellImage"
                            className="d-none"
                            accept="image/png, image/jpeg"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
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
                                placeholder="Price"
                                className="AddField"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        {errors.price && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.price}</div>}
                    </div>

                    <div className="AddField">
                        <label>
                            <input
                                type="number"
                                placeholder="Discount"
                                className="AddField"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </label>
                        {errors.discount && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.discount}</div>}
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

export default AddBuyAndSell;
