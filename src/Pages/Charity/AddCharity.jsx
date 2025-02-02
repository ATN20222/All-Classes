import React, { useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { CharityService } from "../../Services/Api";

const AddCharity = () => {
    const [charityName, setCharityName] = useState("");
    const [charityDetails, setCharityDetails] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');

    const [errors, setErrors] = useState({});
    const [services, setServices] = useState([{ title: "", description: "" }]);
    const [isLoading , setIsLoading] = useState(false);

    const validateFields = () => {
        let validationErrors = {};
        if (!charityName) validationErrors.charityNameError = "Charity name is required.";
        if (!charityDetails) validationErrors.charityDetailsError = "Charity details are required.";
        if (!address) validationErrors.addressError = "Address is required.";
        if (!phone) validationErrors.phoneError = "Phone number is required.";
        if (!/^\d+$/.test(phone)) validationErrors.phoneError = "Phone number must contain only digits.";
        if (!website) validationErrors.websiteError = "Website is required.";
        if (!email) validationErrors.emailError = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(email)) validationErrors.emailError = "Email format is invalid.";

        // Check for each service
        services.forEach((service, index) => {
            if (!service.title) validationErrors[`serviceTitleError${index}`] = `Service title ${index + 1} is required.`;
            if (!service.description) validationErrors[`serviceDescriptionError${index}`] = `Service description ${index + 1} is required.`;
        });

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; // Return true if no errors
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (validateFields()) {
            console.log("Form submitted successfully!", { charityName, charityDetails, email,website, phone,address, services });
            
            try {
                const response = await CharityService.Add( charityName, charityDetails, email,website, phone,address, services , image );
                toast.success('Charity added successfully');
                setTimeout(() => {
                    navigate('/charity');
                }, 2000);
                
            } catch (error) {
                toast.error('Failed to add charity');
            } finally {
                setIsLoading(false); 
            }
        }
    };

    const addService = () => {
        setServices([...services, { title: "", description: "" }]);
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = services.map((service, i) => {
            if (i === index) {
                return { ...service, [field]: value };
            }
            return service;
        });
        setServices(updatedServices);
    };

    return (
        <div className="MainContent">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to='/charity'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Charity
                    </div>
                </div>

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

                <div className="AddField">
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="Charity name"
                            className="AddField"
                            value={charityName}
                            onChange={(e) => setCharityName(e.target.value)}
                        />
                        {errors.charityNameError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.charityNameError}</div>}
                    </label>
                </div>

                <div className="AddField">
                    <textarea
                        placeholder="Write Charity details"
                        value={charityDetails}
                        onChange={(e) => setCharityDetails(e.target.value)}
                    />
                    {errors.charityDetailsError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.charityDetailsError}</div>}
                </div>

                <div className="AddField">
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="Address"
                            className="AddField"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.addressError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.addressError}</div>}
                    </label>
                </div>

                <div className="AddField">
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="Phone"
                            className="AddField"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phoneError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.phoneError}</div>}
                    </label>
                </div>

                <div className="AddField">
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="Website"
                            className="AddField"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        {errors.websiteError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.websiteError}</div>}
                    </label>
                </div>

                <div className="AddField">
                    <label htmlFor="">
                        <input
                            type="text"
                            placeholder="Email"
                            className="AddField"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.emailError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.emailError}</div>}
                    </label>
                </div>

                {/* Dynamic Charity Services */}
                <div className="container CharityServicesContainer">
                    <h6>Services</h6>
                    {services.map((service, index) => (
                        <div className="row mb-2" key={index}>
                            <div className="AddField col-lg-6">
                                <label htmlFor="">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="AddField"
                                        value={service.title}
                                        onChange={(e) => handleServiceChange(index, "title", e.target.value)}
                                    />
                                    {errors[`serviceTitleError${index}`] && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors[`serviceTitleError${index}`]}</div>}
                                </label>
                            </div>
                            <div className="AddField col-lg-6">
                                <label htmlFor="">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        className="AddField"
                                        value={service.description}
                                        onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                                    />
                                    {errors[`serviceDescriptionError${index}`] && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors[`serviceDescriptionError${index}`]}</div>}
                                </label>
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-lg-2 Center">
                            <button className="AddService" onClick={addService}>
                                <FontAwesomeIcon icon={faPlus} /> Add Service
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col-lg-12 ApplicationButtons">
                <div className="AllClassesBtn AcceptBtn">
                    <button onClick={handleSubmit}>Save</button>
                </div>
                <div className="AllClassesBtn RejectBtn">
                    <button>Cancel</button>
                </div>


            </div>
        </div>
    );
};

export default AddCharity;
