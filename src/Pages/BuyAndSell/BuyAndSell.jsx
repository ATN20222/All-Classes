import React, { useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import BuyImage from '../../Assets/Images/BuyImage.png'
import JobPersonImage from '../../Assets/Images/JobsPersonImage.png'
import './BuyAndSell.css'
import { Link } from "react-router-dom";
import EventsItem from "../../Components/Events/EventsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import JobItem from "../../Components/Jobs/JobItem";
import BuyAndSellItem from "../../Components/BuyAndSell/BuyAndSellItem";
const BuyAndSell = ()=>{
    const data = [
        {
            id :1 , 
            puplisher_name:'Nada ahmed',
            puplish_date:'5 hours ago',
            puplisher_image:JobPersonImage,
            image:BuyImage,
            buy_title:'Dining tables',
            Location:' Egypt, Anywhere',
            buy_details:'Lunge into the cold of the frozen tundra as you experience Ski Egypt, Africa’s first and only Indoor skiing resort. Hit the ski runs, sit in one of the beautiful cafes or strap on your boots and discover the interactive snow cavern. Including a ski school for lessons, magnificently designed, 7000 tons of snow makes up the pure white hills and slopes of ice that brings the experience of the mountains directly to you.Lunge into the cold of the frozen tundra as you experience Ski Egypt, Africa’s first and only Indoor skiing resort. Hit the ski runs, sit in one of the beautiful cafes or strap on your boots and discover the interactive snow cavern. Including a ski school for lessons, magnificently designed, 7000 tons of snow makes up the pure white hills and slopes of ice that brings the experience of the mountains directly to you.',
            rating:'3',
            price:'800',
            total_price:'400',
            discount:'0.5',
        },
        {
            id :2 , 
            puplisher_name:'Nada ahmed',
            puplish_date:'5 hours ago',
            puplisher_image:JobPersonImage,
            image:BuyImage,
            buy_title:'Dining tables',
            Location:' Egypt, Anywhere',
            buy_details:'Lunge into the cold of the frozen tundra as you experience Ski Egypt, Africa’s first and only Indoor skiing resort. Hit the ski runs, sit in one of the beautiful cafes or strap on your boots and discover the interactive snow cavern. Including a ski school for lessons, magnificently designed, 7000 tons of snow makes up the pure white hills and slopes of ice that brings the experience of the mountains directly to you.Lunge into the cold of the frozen tundra as you experience Ski Egypt, Africa’s first and only Indoor skiing resort. Hit the ski runs, sit in one of the beautiful cafes or strap on your boots and discover the interactive snow cavern. Including a ski school for lessons, magnificently designed, 7000 tons of snow makes up the pure white hills and slopes of ice that brings the experience of the mountains directly to you.',
            rating:'3',
            price:'800',
            total_price:'400',
            discount:'0.5',
        },
    ];


    return(
        <div className="MainContent News">
            <div className="container">
            <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                            to="/addbuyandsell"
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Buy & Sell
                    </div>
                    <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        {/* <div className="FilterAdmins">
                            <img src={CategoryIcon} alt="" />
                        </div> */}
                    </div>
                </div>

                    <div className="NewsRow">
                        {data.map((row)=>(
                                <BuyAndSellItem
                                    key={row.id}
                                    id={row.id}
                                    Location={row.Location}
                                    buy_details={row.buy_details}
                                    image={row.image}
                                    buy_title={row.buy_title}
                                    discount={row.discount}
                                    price={row.price}
                                    puplisher_image={row.puplisher_image}
                                    puplisher_name={row.puplisher_name}
                                    puplish_date={row.puplish_date}
                                    rating={row.rating}
                                    total_price={row.total_price}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default BuyAndSell;