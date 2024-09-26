import React from "react";
import NewsImage from '../../Assets/Images/News.svg';
import EventsImage from '../../Assets/Images/Events.svg';
import OffersImage from '../../Assets/Images/Offers.svg';
import BuyAndSellImage from '../../Assets/Images/Buy&Sell.svg';
import JobsImage from '../../Assets/Images/Jobs.svg';
import CharityImage from '../../Assets/Images/Charity.svg';

import { useParams } from "react-router-dom";
import './Communities.css'
import CommunityProfileHeader from "../../Components/Community/CommunityProfileHeader";
const Community = ()=>{
    const {id} = useParams();
    return(
        <div className="MainContent">
            <div className="container">
                <CommunityProfileHeader/>
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            ID Community
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                            201512
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Total Subscription
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        201512
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Link ios
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        httpsappdzfsg                
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="ApplicationDetailsItem">
                            <span>
                            Link app store
                            </span>
                        </div>
                        <div className="TableRecord ApplicationDetailsItem">
                        httpsappjdhgry
                        </div>
                    </div>
                    <div className="col-lg-12 CommunityProfileItemsContainer">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2 col-md-4 col-sm-4 col-6 CommunityProfileItemContainer">
                                    <div className="CommunityProfileItem">
                                        <img src={NewsImage}  alt="" />
                                        <div className="CommunityProfileItemText">
                                            News
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-4 col-6 CommunityProfileItemContainer">
                                    <div className="CommunityProfileItem">

                                        <img src={EventsImage}  alt="" />
                                        <div className="CommunityProfileItemText">
                                            Events
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-4 col-6 CommunityProfileItemContainer">
                                    <div className="CommunityProfileItem">
                                        <img src={OffersImage}  alt="" />
                                        <div className="CommunityProfileItemText">
                                            Offers
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-4 col-6 CommunityProfileItemContainer">
                                    <div className="CommunityProfileItem">
                                        <img src={BuyAndSellImage}  alt="" />
                                        <div className="CommunityProfileItemText">
                                            Buy & Sell
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-4 col-6 CommunityProfileItemContainer">
                                    <div className="CommunityProfileItem">
                                        <img src={JobsImage}  alt="" />
                                        <div className="CommunityProfileItemText">
                                            Jobs
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-4 col-6 CommunityProfileItemContainer">
                                    <div className="CommunityProfileItem">
                                        <img src={CharityImage}  alt="" />
                                        <div className="CommunityProfileItemText">
                                            Charity
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
    );
}
export default Community;