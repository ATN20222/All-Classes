import React from "react";
import BackIcon from '../../Assets/Images/BackIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
const AddOffer = ()=>{
    return(
        <div className="MainContent">

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                            to='/offers'
                        > 
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Offers
                    </div>
                </div>

                <div className="AddNewsImageContainer">
                    <label htmlFor="NewsImage">

                        <FontAwesomeIcon icon={faImage}/>
                    </label>
                    <input type="file" id="NewsImage" className="d-none" accept="png" />
                    {/* <img src={} width="100%" alt="" /> */}
                </div>
                {/* <div className="AddNewsCaptionContainer">
                    <textarea name="" id="" placeholder="Write a caption"></textarea>
                </div> */}

                <div className="AddField">
                    <label htmlFor="">
                        <select class="form-select DropDown" aria-label="Category">
                            <option selected>Category</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </label>
                </div>
                <div className="AddField">
                    <label htmlFor="">
                        <select class="form-select DropDown" aria-label="Brand">
                            <option selected>Brand</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </label>
                </div>

                <div className="AddField">
                    <label htmlFor="">
                        <input 
                            type="text" 
                            placeholder="Brand info" 
                            className="AddField"
                        />
                    </label>
                </div>

                
                
                <div className="AddField">
                    <label htmlFor="">
                        <input 
                            type="text" 
                            placeholder="offer name (title)"
                            className="AddField"
                            
                        />
                    </label>
                </div>

                <div className="AddField">
                    <label htmlFor="">
                        <input 
                            type="number" 
                            placeholder="Price before"
                            className="AddField"
                            
                        />
                    </label>
                </div>

                <div className="AddField">
                    <label htmlFor="">
                        <input 
                            type="number" 
                            placeholder="Price after"
                            className="AddField"
                            
                        />
                    </label>
                </div>

                <div className="AddField">
                    <textarea name="" id="" placeholder="Write job details"></textarea>
                </div>
            </div>
            <div className="col-lg-12 ApplicationButtons">
                <div className="AllClassesBtn AcceptBtn">
                    <button>Save</button>
                </div>
                <div className="AllClassesBtn RejectBtn">
                    <button>Cancel</button>
                </div>
            </div>
        </div>

    );
}
export default AddOffer;