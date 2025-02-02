import React, { useEffect, useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import BuyImage from '../../Assets/Images/BuyImage.png'
import JobPersonImage from '../../Assets/Images/JobsPersonImage.png'
import './BuyAndSell.css'
import { Link, Navigate, useNavigate } from "react-router-dom";
import EventsItem from "../../Components/Events/EventsItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import JobItem from "../../Components/Jobs/JobItem";
import BuyAndSellItem from "../../Components/BuyAndSell/BuyAndSellItem";
import { BuyAndSellService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import toast, { Toaster } from "react-hot-toast";
const BuyAndSell = ()=>{
    const navigate = useNavigate();
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
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [buyAndSell , setBuyAndSell] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await BuyAndSellService.List();
            console.log(response);
            setBuyAndSell(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id)=>{
        try {
                
            const response = await BuyAndSellService.Delete(id);
            toast.success('Item deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete item');
            
        }finally{
            setItemIdToDelete('');
        }
    }

    return(
        <div className="MainContent News">

            <DeleteModalComponent
                id={ItemIdToDelete}
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
                            to="/addbuyandsell"
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Buy & Sell
                    </div>
                    <div className="RightSideHeader">
                        {/* <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div> */}
                        {/* <div className="FilterAdmins">
                            <img src={CategoryIcon} alt="" />
                        </div> */}
                    </div>
                </div>

                    <div className="NewsRow">
                        {buyAndSell.map((row)=>(
                                <BuyAndSellItem
                                    key={row.id}
                                    id={row.id}
                                    Uid={row.user.id}
                                    price={row.price}
                                    discount={row.discount}
                                    buy_details={row.description}
                                    image={row.media.length>0?row.media[row.media.length-1]?.original_url:null}
                                    buy_title={row.title}
                                    puplisher_image={row.user?.member?.media.length>0?row.user?.member?.media[0].original_url:null}
                                    puplisher_name={row.user.name}
                                    puplish_date={row.user.created_at}
                                    handleEditClicked={()=>navigate(`/editbuyandsell/${row.id}`)}
                                    handleDeleteClicked={()=>{
                                        setItemIdToDelete(row.id);
                                        setIsDeleteOverlayOpen(true);
                                    }}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default BuyAndSell;