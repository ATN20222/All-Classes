import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import NewsImage from '../../Assets/Images/NewsImage.png'
import BrandImage from '../../Assets/Images/BrandImage.png'
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import CategoryIcon from '../../Assets/Images/CategoryIcon.svg'
import { Link, useNavigate } from "react-router-dom";
import RewardsItem from "../../Components/Rewards/RewardsItem";
import CharityItem from "../../Components/Charity/CharityItem";
import { CharityService } from "../../Services/Api";
import './Charity.css'
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
const Charity = ()=>{
    const news = [
        {
            id: 1, 
            image: NewsImage,
            details: "This is a high-quality product designed for maximum performance and reliability. Perfect for daily use and comes with excellent customer reviews.",
            title: "Premium Wireless Headphones",
            points:'200',
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
            points:'200',
            brand_image: BrandImage,
            brand_rating: 4.5,
            brand_info: "Founded in 2005, the brand is known for creating top-tier electronic devices with a focus on innovation and customer satisfaction.",
            brand_name: "TechGuru"
        }
        
    ];
    const [charities , setCharities] = useState([]);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [charityIdToDelete , setCharityIdToDelete] = useState('');
    useEffect(()=>{
        getData();
    },[]);
    const navigate = useNavigate();
    async function getData() {
        try {
            const response = await CharityService.List();
            console.log(response);
            setCharities(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async (id)=>{
        try {
            const response = await CharityService.Delete(id);
            toast.success('charity deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete charity');
            
        }finally{
            setCharityIdToDelete('');
        }
    }

    return(
        <div className="MainContent Applications">
            <DeleteModalComponent
                id={charityIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>

            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                        to="/addcharity"
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Charity
                    </div>
                    <div className="RightSideHeader">
                        {/* <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div> */}

                    </div>
                </div>
                <div className="NewsRow">
                        {charities.map((row)=>(
                                <CharityItem
                                    key={row.id}
                                    id={row.id}
                                    name={row.name}
                                    brand_info={row.description}
                                    brand_image={row.media.length>0? row.media[0].original_url:null}
                                    title={"Services"}
                                    image={row.media.length>0? row.media[0].original_url:null}
                                    services={row.services}
                                    address={row.address}
                                    email={row.email}
                                    number={row.phone}
                                    website={row.website}
                                    handleDeleteClicked={()=>{
                                        setCharityIdToDelete(row.id);
                                        setIsDeleteOverlayOpen(true);
                                    }}
                                    handleEditClicked={()=>navigate(`/editcharity/${row.id}`)}
                                />
                        ))}
                    </div>
                
            </div>
        </div>
    );
}
export default Charity;