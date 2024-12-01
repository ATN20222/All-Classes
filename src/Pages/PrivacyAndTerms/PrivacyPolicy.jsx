import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import NewsImage from '../../Assets/Images/NewsImage.png'
import BrandImage from '../../Assets/Images/BrandImage.png'
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import CategoryIcon from '../../Assets/Images/CategoryIcon.svg'
import './PrivacyPolicy.css'
import { Link } from "react-router-dom";
import AddPrivacyPolicyModal from "./AddPrivacyPolicyModal";
import { PolicyServices } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
const PrivacyPolicy = ()=>{
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [isOverlayOpen,setIsOverlayOpen] = useState(false);
    const data = [
        {
            id: 1,
            title:"Clause 1",
            description:`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse`,
        },
        {
            id: 2,
            title:"Clause 1",
            description:`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse`,
        },
        {
            id: 3,
            title:"Clause 1",
            description:`Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse`,
        }
    ];

    const [policies , setPolicies] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await PolicyServices.ListPrivacy();
            console.log("response",response);
            setPolicies(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddPrivacy = async (title , description)=>{
        try {
            const response = await PolicyServices.AddPrivacy(title,description);
            toast.success('Policy added successfully');
            getData();  
            
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    const handleDelete = async (id)=>{
        try {
                
            const response = await PolicyServices.DeletePrivacy(id);
            toast.success('Policy deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete policy');
            
        }finally{
            setItemIdToDelete('');
        }
    }

    return(
        <div className="MainContent Applications">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <DeleteModalComponent
                id={ItemIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <AddPrivacyPolicyModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddPolicy={handleAddPrivacy}
            />
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary p-3">
                        <div className="AddIconContainer nav-link" 
                        onClick={()=>setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Privacy policy
                    </div>
                    
                </div>
                <div className="NewsRow">
                    {policies.length>0&&<div className="PrivacyContainer">
                        {policies.map((row)=>(
                            <div className="PrivacyItem" key={row.id}>
                                <h6 className="PolicyHeader">
                                    <div className="">{row.title}</div>
                                    <div className="DeletIcon" onClick={()=>{
                                        setItemIdToDelete(row.id);
                                        setIsDeleteOverlayOpen(true);
                                    }}><FontAwesomeIcon icon={faTrashAlt}/></div>
                                </h6>
                                <span>{row.description}</span>
                            </div>
                        ))}
                    </div>}
                </div>
                
            </div>
        </div>
    );
}
export default PrivacyPolicy;