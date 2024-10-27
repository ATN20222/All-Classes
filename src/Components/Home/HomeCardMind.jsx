import React from "react";
import ChartImage from '../../Assets/Images/Chart.svg'
import { Link } from "react-router-dom";
const HomeCardMind = ({title , number , isAdmins , link})=>{
    return(
        <div className={`col-lg-6 HomeCard HomeCardMind ${isAdmins?'SpecialHomeCard':''}`}>
            <div className="HomeCardTitle">
                <Link className="nav-link" to={`/${link}`}>{title}</Link>
                <img src={ChartImage} alt="" />
            </div>

            <div className="HomeCardData">
                <span>{number}</span>
                {/* <div className="HomeCardText">
                    <span>84% of total (1,260)</span>
                </div> */}
            </div>
        </div>
    );
}
export default HomeCardMind;