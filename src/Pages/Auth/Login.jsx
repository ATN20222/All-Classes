import React, { useContext, useState } from "react";
import No from '../../Assets/Images/LastBack-01-01.svg';
import Logo from '../../Assets/Images/AllClassesLogo.svg';
import './Auth.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from '../../Services/Api'; // Import the AuthService for the login function
import { ManagementContext } from "../../Context/ManagementContext";
import { getDB, setDB } from "../../Services/AxiosApi";
const Login = () => {
    // Manage email, password, and error states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState(''); // General form error for catch block
    const navigate = useNavigate();
    // Validate email format using a regular expression
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    };
    const { updateManagement } = useContext(ManagementContext);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setEmailError(''); // Reset email error
        setPasswordError(''); // Reset password error
        setFormError(''); // Reset form error

        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }

        if (password.trim()==='') {
            setPasswordError('Password is required');
            valid = false;
        }

        if (!valid) return;

        try {
            setDB('mind');
            const response = await AuthService.Login(email, password);
            localStorage.setItem('email' , email);   
            updateManagement(response.permssions); 
            
            // navigate('/home');
            window.location.href='/homemind'
            
        } catch (err) {
            console.log(err)
            console.error("Login error:", err.message);
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
                            <h1>Login</h1>
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
                                            onChange={(e) => setEmail(e.target.value)} // Update email state
                                        />
                                    </label>
                                    {/* Display email error */}
                                        {emailError && <div className="text-danger mt-2 mb-2 text-start">{emailError}</div>}
                                </div>
                                <div className="AuthInputCol">
                                    <label htmlFor="Password">
                                        <span>Password</span>
                                            <input
                                                id="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEye : faEyeSlash}
                                                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                                            />
                                    </label>
                                    {/* Display password error */}
                                    {passwordError && <div className="text-danger mt-2 mb-2 text-start">{passwordError}</div>}
                                </div>
                                <div className="ForgetPasswordLink">
                                    <Link className="nav-link">Forget password?</Link>
                                </div>
                                <div className="AllClassesBtn">
                                    <button type="submit">Login</button>
                                </div>
                            </form>
                            <div className="NewRegister">
                                New user? <Link className="nav-link"> Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
