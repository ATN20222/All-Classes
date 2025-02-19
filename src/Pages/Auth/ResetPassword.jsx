import React, { useState } from "react";
import No from '../../Assets/Images/LastBack-01-01.svg';
import Logo from '../../Assets/Images/AllClassesLogo.svg';
import './Auth.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password) {
            setError('Password is required.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
            return false;
        }
        return true;
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setError('Confirm password is required.');
            return false;
        } else if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validatePassword() || !validateConfirmPassword()) {
            return;
        }

        try {
            const userData = await AuthService.ResetPassword(token, email, password, confirmPassword);
            toast.success('Password reseted successfully');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            toast.error(`${error}`);
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
                            <img src={Logo} width="40%" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 RightAuthCol">
                        <div className="RightAuthTitle TwoPartsText">
                            <h1>Set new password</h1>
                            <div className="ForgetPasswordText">
                                <span>No worries, we’ll send you reset instructions.</span>
                            </div>
                        </div>

                        <form className="RightAuthForm" onSubmit={handleResetPassword}>
                            <div className="AuthInputCol">
                                <label htmlFor="Password">
                                    <span>New password</span>
                                    <input
                                        id="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="password-toggle-icon"
                                    />
                                </label>

                            </div>
                            <div className="AuthInputCol">
                                <label htmlFor="ConfirmPassword">
                                    <span>Confirm password</span>
                                    <input
                                        id="ConfirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Enter your confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                        icon={showConfirmPassword ? faEye : faEyeSlash}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="password-toggle-icon"
                                    />
                                </label>

                            </div>
                            {error && (
                                <div className="text-danger mt-2 mb-2 text-start">{error}</div>
                            )}

                            <div className="AllClassesBtn mt-5">
                                <button type="submit">Reset password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
