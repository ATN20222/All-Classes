import React, { useState } from "react";
import No from '../../Assets/Images/LastBack-01-01.svg';
import Logo from '../../Assets/Images/AllClassesLogo.svg';
import './Auth.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validatePassword = () => {
        // Regular expression for password strength
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!password) {
            setPasswordError('Password is required.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.'
            );
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmPasswordError('Confirm password is required.');
            return false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return false;
        } else {
            setConfirmPasswordError('');
            return true;
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isPasswordValid && isConfirmPasswordValid) {
            // Call API or handle the reset password logic
            console.log('Password reset successfully');
            alert('Password reset successfully');
        }
    };

    return (
        <div className="Login">
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
                                {passwordError && <div className="text-danger mt-2 mb-2 text-start">{passwordError}</div>}
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
                                {confirmPasswordError && (
                                    <div className="text-danger mt-2 mb-2 text-start">{confirmPasswordError}</div>
                                )}
                            </div>
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
