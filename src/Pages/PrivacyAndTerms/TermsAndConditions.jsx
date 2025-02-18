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
import AddTermsModal from "./AddTermsModal";
import { PolicyServices } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
const TermsAndConditions = ()=>{
    const [isOverlayOpen,setIsOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [policies , setPolicies] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await PolicyServices.ListTerms();
            console.log("response",response);
            setPolicies(response.content);
        } catch (error) {
            console.error(error);
        }
    }



    const handleDelete = async (id)=>{
        try {
                
            const response = await PolicyServices.DeleteTerms(id);
            toast.success('Term deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete term');
            
        }finally{
            setItemIdToDelete('');
        }
    }
    const handleAddPrivacy = async (title , description)=>{
        try {
            const response = await PolicyServices.AddTerms(title,description);
            toast.success('Term added successfully');
            getData();  
            
        } catch (error) {
            toast.error(`${error}`);
        }
    }
    return(
        <div className="MainContent Applications">
            <AddTermsModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddPolicy={handleAddPrivacy}
            />
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
                    <div className="PageTitle PageTitleSecondary p-3">
                        <div className="AddIconContainer nav-link" 
                        onClick={()=>setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Terms and conditions
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
                                <span>{row.details}</span>
                            </div>
                        ))}
                    </div>
                    }
                </div>
                
                
            </div>
        </div>
    );
}
export default TermsAndConditions;