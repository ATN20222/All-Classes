import React, { useState } from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { JobsService } from "../../Services/Api";

const AddJob = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [experience, setExperience] = useState('');
    const [jobDetails, setJobDetails] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [currentImage, setCurrentImage] = useState('');

    const navigate = useNavigate();

    const handleAddJob = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({});
        let valid = true;

        // Validate inputs
        if (!jobTitle) {
            setErrors((prev) => ({ ...prev, jobTitle: 'Job title is required.' }));
            valid = false;
        }
        if (!jobType) {
            setErrors((prev) => ({ ...prev, jobType: 'Job type is required.' }));
            valid = false;
        }
        if (!location) {
            setErrors((prev) => ({ ...prev, location: 'Location is required.' }));
            valid = false;
        }
        if (!salaryRange) {
            setErrors((prev) => ({ ...prev, salaryRange: 'Salary range is required.' }));
            valid = false;
        }
        if (!experience) {
            setErrors((prev) => ({ ...prev, experience: 'Experience is required.' }));
            valid = false;
        }
        if (!jobDetails) {
            setErrors((prev) => ({ ...prev, jobDetails: 'Job details are required.' }));
            valid = false;
        }
        // if (!image) {
        //     setErrors((prev) => ({ ...prev, image: 'Image is required.' }));
        //     valid = false;
        // }

        if (valid) {
            setIsLoading(true);
            try {
                // Your API call here to save the job details
                const response = await JobsService.Add(jobTitle, jobType, location, salaryRange, experience, jobDetails, image);
                console.log(jobDetails)
                toast.success('Job added successfully');
                setTimeout(() => {
                    navigate('/jobs');
                }, 2000);

            } catch (error) {
                toast.error('Failed to add job');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleJobDetailsChange = (e) => {
        // Replace line breaks with '\n'
        const value = e.target.value.replace(/\n/g, ' \n ');
        setJobDetails(value);
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
                <Toaster position="top-right" reverseOrder={false} />
            </div>

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to='/jobs'>
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Jobs
                    </div>
                </div>

                <form onSubmit={handleAddJob}>
                    <div className="AddNewsImageContainer EditNewsImageContainer">
                        <label htmlFor="JobImage" className="absolute">
                            <FontAwesomeIcon icon={faImage} />
                        </label>
                        <input
                            type="file"
                            id="JobImage"
                            className="d-none"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                        />
                        {currentImage &&

                            <img src={currentImage} width="100%" alt="News Preview" />
                        }
                        {errors.image && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.image}</div>}
                    </div>

                    <div className="AddField">
                        <label>
                            <input
                                type="text"
                                placeholder="Job title"
                                className="AddField"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </label>
                        {errors.jobTitle && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.jobTitle}</div>}
                    </div>

                

                    <div className="AddField">
                        <label htmlFor="category">
                            <select
                                className="form-select DropDown"
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                            >
                                <option value="">Select Job Type</option>
                                <option value="On Site">On Site</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </label>
                        {errors.jobType && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.jobType}</div>}
                    </div>


                    <div className="AddField">
                        <label>
                            <input
                                type="text"
                                placeholder="Location"
                                className="AddField"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </label>
                        {errors.location && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.location}</div>}
                    </div>

                    <div className="AddField">
                        <label>
                            <input
                                type="number"
                                placeholder="Salary range"
                                className="AddField"
                                value={salaryRange}
                                onChange={(e) => setSalaryRange(e.target.value)}
                            />
                        </label>
                        {errors.salaryRange && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.salaryRange}</div>}
                    </div>

                    <div className="AddField">
                        <label>
                            <input
                                type="text"
                                placeholder="Experience"
                                className="AddField"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </label>
                        {errors.experience && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.experience}</div>}
                    </div>

                    <div className="AddField">
                        <textarea
                            placeholder="Write job details"
                            value={jobDetails.replace(/\\n/g, '\n')} // Restore line breaks for display
                            onChange={handleJobDetailsChange} // Use the new handler
                        />
                        {errors.jobDetails && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{errors.jobDetails}</div>}
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
                                <button type="button" onClick={() => navigate('/jobs')}>Cancel</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddJob;
