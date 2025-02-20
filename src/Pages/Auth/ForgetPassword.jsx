import React, { useState } from "react";
import No from '../../Assets/Images/LastBack-01-01.svg'
import Logo from '../../Assets/Images/AllClassesLogo.svg'
import './Auth.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
const ForgetPassword = ()=>{
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setEmailError("");

        if (!validateEmail(email)) {
            setEmailError("Invalid email");
            return;
        }

        try {
            setLoading(true);
            const response = await AuthService.RequestPasswordReset(email);
            toast.success('OTP sent successfully');
            setTimeout(() => {
                navigate(`/verify?email=${email}`);
            }, 3000);
        } catch (error) {
            setEmailError(error.message);
            setLoading(false);

        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return(
        <div className="Login">
            <div className="Toaster">
                    <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                </div>
            <div className="AuthLayout">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 LeftAuthCol">
                        <div className="NoContainer">
                            <img src={No} width="100%" alt="" />
                        </div>
                        <div className="AllClassesLogo Center">
                            <img src={Logo} width='40%' alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 RightAuthCol">
                        <div className="RightAuthTitle TwoPartsText">
                            <h1>Forget password</h1>
                            <div className="ForgetPasswordText">
                                <span>No worries, we’ll send you reset instructions.</span>
                            </div>
                        </div>
                        <div className="RightAuthForm">
                            <div className="AuthInputCol">
                                <label htmlFor="Email">
                                    <span>Email</span>
                                    <input id="Email" type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address" />
                                </label>
                                
                            </div>
                            
                            {emailError && <div className="text-danger mt-2 mb-2 text-start ServicesFieldError">{emailError}</div>}
                            
                            <div className="AllClassesBtn mt-5" >
                                <button onClick={handleFormSubmit}> Send code</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgetPassword;   