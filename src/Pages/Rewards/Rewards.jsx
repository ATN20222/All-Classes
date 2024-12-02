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
import { RewardsService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import toast, { Toaster } from "react-hot-toast";
const Rewards = ()=>{
    const [rewards , setRewards] = useState([]);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState([]);

    useEffect(() => {
        getData();
    }, []); 
    async function getData() {
        try {
            const response = await RewardsService.List();
            console.log(response);
            setRewards(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async (id) => {
        try {
            const response = await RewardsService.Delete(id);
            toast.success('reward deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete reward');
        } finally {
            setItemIdToDelete('');
        }
    }
    const navigate = useNavigate();
    return(
        <div className="MainContent Applications">
            <DeleteModalComponent
                id={itemIdToDelete}
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
                        to="/addreward"
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Rewards
                    </div>
                    {/* <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        <div className="FilterAdmins">
                            <img src={FilterIcon} alt="" />
                        </div>
                        <div className="FilterAdmins">
                            <img src={CategoryIcon} alt="" />
                        </div>
                    </div> */}
                </div>
                <div className="NewsRow">
                        {rewards.map((row)=>(
                                <RewardsItem
                                    key={row.id}
                                    id={row.id}
                                    points={row.redeem_points}
                                    title={row.name}
                                    image={row.media? row.media[0]?.original_url:null}
                                    details={row.description}
                                    handleEditClicked={()=>navigate(`/editrewards/${row.id}`)}
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
export default Rewards;