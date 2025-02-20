import React, { useState, useEffect } from "react";
import No from '../../Assets/Images/LastBack-01-01.svg';
import Logo from '../../Assets/Images/AllClassesLogo.svg';
import './Auth.css';
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthService } from "../../Services/Api";

const Verify = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [seconds, setSeconds] = useState(120);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const ResendOTP = async () => {
        if (seconds !== 0) return;
        setSeconds(120);
        try {
            await AuthService.RequestPasswordReset(email);
            toast.success("OTP resent successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to resend OTP.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        try {
            const response = await AuthService.VerifyOTP(otpCode, email);
            navigate(`/PasswordReset?email=${email}&token=${response.token}`);
        } catch (error) {
            console.error(error);
            toast.error("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="Login">
            <Toaster position="top-right" reverseOrder={false} />
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
                            <h1>Password reset</h1>
                            <div className="ForgetPasswordText">
                                <span>No worries, we’ll send you reset instructions.</span>
                            </div>
                        </div>
                        <div className="RightAuthForm">
                            <form onSubmit={handleSubmit}>
                                <div className="AuthOTPInputContainer">
                                    {otp.map((data, index) => (
                                        <div className="AuthOTPInput" key={index}>
                                            <input
                                                type="text"
                                                maxLength="1"
                                                value={data}
                                                onChange={e => handleChange(e.target, index)}
                                                onFocus={e => e.target.select()}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="AllClassesBtn mt-5">
                                    <button type="submit">Submit</button>
                                </div>
                                <div className="ResendOTPContainer">
                                    <span>({seconds})s <span className="ResendCode" onClick={ResendOTP}>Resend Code</span></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verify;