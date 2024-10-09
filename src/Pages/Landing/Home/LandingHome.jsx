import React from "react";
import './LandingHome.css'
import logo from '../../../Assets/Images/AllClassesLogo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
const LandingHome = ()=>{
    return(
        <div className="LandingHome pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-5 mb-4 ">
                        <img src={logo} width="60%" alt="" />
                    </div>
                    <div className="col-lg-12 mt-4 CommingSoon">
                        <span> <FontAwesomeIcon icon={faCode}/> Coming soon...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LandingHome;