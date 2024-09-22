import React from "react";
import No from '../../Assets/Images/LastBack-01-01.svg'
import Logo from '../../Assets/Images/AllClassesLogo.svg'
import './Auth.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const ResetPassword = ()=>{
    return(
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
                    <div className="RightAuthTitle TwoPartsText">
                            <h1>Set new password</h1>
                            <div className="ForgetPasswordText">
                                <span>No worries, we’ll send you reset instructions.</span>
                            </div>
                        </div>
                        <div className="RightAuthForm">
                            
                            <div className="AuthInputCol">
                                <label htmlFor="Password">
                                    <span>New password</span>
                                    <input id="Password" type="password" placeholder="Enter your password" />
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                </label>
                            </div>
                            <div className="AuthInputCol">
                                <label htmlFor="Password">
                                    <span>Confirm password</span>
                                    <input id="Password" type="password" placeholder="Enter your confirm password" />
                                    <FontAwesomeIcon icon={faEyeSlash}/>
                                </label>
                            </div>
                            
                            <div className="AllClassesBtn mt-5">
                                <button>Reset password</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ResetPassword;   