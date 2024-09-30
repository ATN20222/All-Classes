import React, { useState } from "react";
import './Offers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import NewsImage from '../../Assets/Images/NewsImage.png'
import BrandImage from '../../Assets/Images/BrandImage.png'
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import CategoryIcon from '../../Assets/Images/CategoryIcon.svg'
import { Link } from "react-router-dom";
import NewsItem from "../../Components/News/NewsItem";
import OffersItem from "../../Components/Offers/OffersItem";
const Offers = ()=>{
    const news = [
        {
            id: 1, 
            image: NewsImage,
            details: "This is a high-quality product designed for maximum performance and reliability. Perfect for daily use and comes with excellent customer reviews.",
            title: "Premium Wireless Headphones",
            price_after: "120",
            price_before: "150",
            brand_image: BrandImage,
            brand_rating: 4.5,
            brand_info: "Founded in 2005, the brand is known for creating top-tier electronic devices with a focus on innovation and customer satisfaction.",
            brand_name: "TechGuru"
        },
        
        {
            id: 2, 
            image: NewsImage,
            details: "This is a high-quality product designed for maximum performance and reliability. Perfect for daily use and comes with excellent customer reviews.",
            title: "Premium Wireless Headphones",
            price_after: "$120",
            price_before: "$150",
            brand_image: BrandImage,
            brand_rating: 4.5,
            brand_info: "Founded in 2005, the brand is known for creating top-tier electronic devices with a focus on innovation and customer satisfaction.",
            brand_name: "TechGuru"
        }
        
    ];
    return(
        <div className="MainContent Applications">
          
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                        to="/addoffer"
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Offers
                    </div>
                    <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        <div className="FilterAdmins">
                            {/* <FontAwesomeIcon icon={faFilter}/> */}
                            <img src={FilterIcon} alt="" />
                        </div>
                        <div className="FilterAdmins">
                            {/* <FontAwesomeIcon icon={faFilter}/> */}
                            <img src={CategoryIcon} alt="" />
                        </div>
                    </div>
                </div>
                <div className="NewsRow">
                        {news.map((row)=>(
                                <OffersItem
                                    key={row.id}
                                    id={row.id}
                                    brand_name={row.brand_name}
                                    brand_info={row.brand_info}
                                    brand_rating={row.brand_rating}
                                    brand_image={row.brand_image}
                                    price_before={row.price_before}
                                    price_after={row.price_after}
                                    title={row.title}
                                    image={row.image}
                                    details={row.details}
                                />
                        ))}
                    </div>
                
            </div>
        </div>
    );
}
export default Offers;