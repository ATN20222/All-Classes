import React, { useEffect, useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { BrandsService, OffersService } from "../../Services/Api";

const AddOffer = () => {
    const [brands , setBrands] = useState([]);
    const cats = [
        'Fun',
        'Food',
        'Hotels',
        'Health & Beauty',
        'Retails & Services'
    ]
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [brandInfo, setBrandInfo] = useState('');
    const [offerName, setOfferName] = useState('');
    const [discount, setDiscount] = useState('');
    const [offerDetails, setOfferDetails] = useState('');
    const [image, setImage] = useState(null);
    
    const [categoryError, setCategoryError] = useState('');
    const [brandError, setBrandError] = useState('');
    const [offerNameError, setOfferNameError] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [priceAfterError, setPriceAfterError] = useState('');
    const [offerDetailsError, setOfferDetailsError] = useState('');
    const [imageError, setImageError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSave = async (e) => {
        e.preventDefault();
        // Reset errors
        setCategoryError('');
        setBrandError('');
        setOfferNameError('');
        setDiscountError('');
        setPriceAfterError('');
        setOfferDetailsError('');
        setImageError('');
        let valid = true;

        // Validate inputs
        if(!image){
            setImageError('Image is required.');
            valid = false;
        }
        if (!category) {
            setCategoryError('Category is required.');
            valid = false;
        }
        if (!brand) {
            setBrandError('Brand is required.');
            valid = false;
        }
        if (!offerName) {
            setOfferNameError('Offer name is required.');
            valid = false;
        }
        if (!discount) {
            setDiscountError('discount is required.');
            valid = false;
        }
        if (!offerDetails) {
            setOfferDetailsError('Offer details are required.');
            valid = false;
        }

        if (valid) {
            setIsLoading(true);
            try {
                
                const response = await OffersService.Add(offerName , brandInfo , category , discount  , offerDetails , brand , image);
                toast.success('Offer added successfully');
                setTimeout(() => {
                    navigate('/offers');
                }, 2000);
                
            } catch (error) {
                toast.error('Failed to add offer');
            } finally {
                setIsLoading(false);
            }
        }
    };
    useEffect(()=>{
        getBrands();
    },[]);

    async function getBrands() {
        try {
            const response = await BrandsService.List();
            setBrands(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    

    return (
        <div className="MainContent">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to='/offers'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="Back" />
                        </Link>
                        Offers
                    </div>
                </div>

                <form onSubmit={handleSave}>
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
                        {imageError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError mt-2 mb-2 text-start ServicesFieldError">{imageError}</div>}
                    </div>

                    <div className="AddField">
                        <label htmlFor="category">
                            <select 
                                className="form-select DropDown" 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                    <option value="">Category</option>
                                {cats.map((cat)=>(
                                    <option value={cat}>{cat}</option>
                                    
                                ))}
                            </select>
                        </label>
                        {categoryError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{categoryError}</div>}
                    </div>

                    <div className="AddField mb-3">
                        <label htmlFor="brand">
                            <select 
                                className="form-select DropDown" 
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                                <option value="">Brand</option>
                                {brands.map((brand)=>(
                                    <option value={brand.id}>{brand.name}</option>
                                
                                ))}
                            </select>
                        </label>
                        {brandError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{brandError}</div>}
                    </div>

                    <div className="AddField mb-3">
                        <label htmlFor="brandInfo">
                            <input 
                                type="text" 
                                placeholder="Brand info" 
                                value={brandInfo}
                                onChange={(e) => setBrandInfo(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="AddField mb-3">
                        <label htmlFor="offerName">
                            <input 
                                type="text" 
                                placeholder="Offer name (title)" 
                                value={offerName}
                                onChange={(e) => setOfferName(e.target.value)}
                            />
                        </label>
                        {offerNameError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{offerNameError}</div>}
                    </div>

                    <div className="AddField mb-3">
                        <label htmlFor="priceBefore">
                            <input 
                                type="number" 
                                placeholder="discount" 
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </label>
                        {discount && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{discountError}</div>}
                    </div>

                    <div className="AddField">
                        <textarea 
                            placeholder="Write offer details" 
                            value={offerDetails}
                            onChange={(e) => setOfferDetails(e.target.value)}
                        />
                        {offerDetailsError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{offerDetailsError}</div>}
                    </div>

                    <div className="col-lg-12 ApplicationButtons">
                        <div className="AllClassesBtn AcceptBtn">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                        <div className="AllClassesBtn RejectBtn">
                            <button type="button" onClick={() => navigate('/offers')}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddOffer;
