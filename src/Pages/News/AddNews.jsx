import React from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
const AddNews = ()=>{
    return(
        <div className="MainContent">

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                            to='/news'
                        > 
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        News
                    </div>
                </div>

                <div className="AddNewsImageContainer">
                    <label htmlFor="NewsImage">

                        <FontAwesomeIcon icon={faImage}/>
                    </label>
                    <input type="file" id="NewsImage" className="d-none" accept="png" />
                    {/* <img src={} width="100%" alt="" /> */}
                </div>
                <div className="AddNewsCaptionContainer">
                    <textarea name="" id="" placeholder="Write a caption"></textarea>
                </div>
            </div>
            <div className="col-lg-12 ApplicationButtons">
                <div className="AllClassesBtn AcceptBtn">
                    <button>Share</button>
                </div>
                <div className="AllClassesBtn RejectBtn">
                    <button>Delete</button>
                </div>
            </div>
        </div>

    );
}
export default AddNews;