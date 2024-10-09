import React, { useState } from "react";
import No from '../../Assets/Images/LastBack-01-01.svg';
import Logo from '../../Assets/Images/AllClassesLogo.svg';
import './Auth.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthService } from '../../Services/Api'; // Import AuthService for register functionality

const Register = () => {
    // Manage form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [formError, setFormError] = useState('');

    // Validate email format using regex
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validate password strength (minimum 8 characters, contains uppercase, symbol, and number)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        return passwordRegex.test(password);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setFormError('');

        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a symbol, and a number.');
            valid = false;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            valid = false;
        }

        if (!valid) return;

        try {
            // Call the register function from AuthService
            const response = await AuthService.RegisterApi(email, password);
            console.log("Registration successful:", response);
            // Handle successful registration, such as redirecting the user
        } catch (err) {
            console.error("Registration error:", err.message);
            setFormError(err.message); // Display error message
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
                            <img src={Logo} width='40%' alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 RightAuthCol">
                        <div className="RightAuthTitle">
                            <h1>Register</h1>
                        </div>
                        <div className="RightAuthForm">
                            {/* Display general form error */}
                            {formError && <div className="text-danger mt-2 mb-2 text-start ">{formError}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="AuthInputCol">
                                    <label htmlFor="Email">
                                        <span>Email</span>
                                        <input
                                            id="Email"
                                            type="text"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>
                                    {/* Display email error */}
                                    {emailError && <div className="text-danger mt-2 mb-2 text-start ">{emailError}</div>}
                                </div>

                                <div className="AuthInputCol">
                                    <label htmlFor="Password">
                                        <span>Password</span>
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
                                            />
                                    </label>
                                    {/* Display password error */}
                                    {passwordError && <div className="text-danger mt-2 mb-2 text-start ">{passwordError}</div>}
                                </div>

                                <div className="AuthInputCol">
                                    <label htmlFor="ConfirmPassword">
                                        <span>Confirm Password</span>
                                        <input
                                            id="ConfirmPassword"
                                            type="password"
                                            placeholder="Enter your confirm password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </label>
                                    {/* Display confirm password error */}
                                    {confirmPasswordError && <div className="text-danger mt-2 mb-2 text-start ">{confirmPasswordError}</div>}
                                </div>

                                <div className="AllClassesBtn mt-5">
                                    <button type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
