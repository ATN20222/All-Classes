import React, { useState, useEffect } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { CharityService } from "../../Services/Api";

const EditCharity = () => {
    const { id } = useParams();  
    const [charityName, setCharityName] = useState("");
    const [charityDetails, setCharityDetails] = useState("");
    const [address, setAddress] = useState("");
    const [currentImage, setCurrentImage] = useState(null);
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [errors, setErrors] = useState({});
    const [services, setServices] = useState([{ title: "", description: "" }]);
    const [isLoading , setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        
        getData();
    }, [id]);
    const getData = async () => {
        try {
            const charityData = await CharityService.GetById(id);
            setCharityName(charityData.content.name);
            setCharityDetails(charityData.content.description);
            setAddress(charityData.content.address);
            setPhone(charityData.content.phone);
            setWebsite(charityData.content.website);
            setEmail(charityData.content.email);
            setServices(charityData.content.services || [{id:null, title: "", description: "" }]);
            // setImage(charityData.content.image);
            setCurrentImage(charityData.content.media.length>0?charityData.content.media[0]?.original_url:''); 

            
        } catch (error) {
            toast.error("Failed to load charity details");
        }
    };
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

        services.forEach((service, index) => {
            if (!service.title) validationErrors[`serviceTitleError${index}`] = `Service title ${index + 1} is required.`;
            if (!service.description) validationErrors[`serviceDescriptionError${index}`] = `Service description ${index + 1} is required.`;
        });

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (validateFields()) {
            try {
                // console.log(services);
                // setServices();
                const serv = services.map(s=>({id:s.id?s.id:0, title: s.title, description: s.description }));
                // console.log({id,  charityName, charityDetails, email, website, phone, address, serv, image });
                await CharityService.Edit(id,  charityName, charityDetails, email, website, phone, address, serv, image );
                toast.success('Charity edited successfully');
                setTimeout(() => {
                    // navigate('/charity');
                }, 2000);
            } catch (error) {
                toast.error('Failed to edit charity');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const addService = () => {
        setServices([...services, {id:null, title: "", description: "" }]);
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

    const removeService = (index) => {
        if (services.length > 1) {
            setServices(services.filter((_, i) => i !== index));
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
                        <Link className="AddIconContainer nav-link" to='/charity'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Edit Charity
                    </div>
                </div>

                {/* Form Fields */}
                <div className="AddNewsImageContainer EditNewsImageContainer">
                    <label htmlFor="NewsImage">
                        <FontAwesomeIcon icon={faImage} />
                    </label>
                    <input 
                        type="file" 
                        id="NewsImage" 
                        className="d-none" 
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                    />
                    <img src={currentImage} width="100%" className="absolute" alt="News Preview" />

                    {imageError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{imageError}</div>}
                </div>

                <div className="AddField">
                    <input
                        type="text"
                        placeholder="Charity name"
                        className="AddField"
                        value={charityName}
                        onChange={(e) => setCharityName(e.target.value)}
                    />
                    {errors.charityNameError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.charityNameError}</div>}
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
                    <input
                        type="text"
                        placeholder="Address"
                        className="AddField"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.addressError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.addressError}</div>}
                </div>

                <div className="AddField">
                    <input
                        type="text"
                        placeholder="Phone"
                        className="AddField"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phoneError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.phoneError}</div>}
                </div>

                <div className="AddField">
                    <input
                        type="text"
                        placeholder="Website"
                        className="AddField"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    {errors.websiteError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.websiteError}</div>}
                </div>

                <div className="AddField">
                    <input
                        type="text"
                        placeholder="Email"
                        className="AddField"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.emailError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.emailError}</div>}
                </div>

                {/* Charity Services */}
                <div className="container CharityServicesContainer">
                                    <h6>Services</h6>
                                    <div className="row mb-2 Center" >
                                    {services.map((service, index) => (
                                        <>
                                        
                                        <div  className="AddField col-lg-5">
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
                                        {services.length > 1 && (
                                            <div className="col-lg-1 d-flex align-items-center justify-content-end">
                                                <button className="btn btn-danger" onClick={() => removeService(index)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        
                                                
                                            )}
                                            </>
                                            
                                    ))}
                                    <div className="col-lg-12 mt-2 d-flex align-items-center justify-content-end">
                                            
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
                    <button onClick={()=>navigate('/charity')}>Cancel</button>
                </div>


            </div>
        </div>
    );
};

export default EditCharity;
