import React, { useState } from "react";
import './Communities.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import AddAdminModal from "../../Components/Admins/AddAdminModal";
import { Link } from "react-router-dom";
const Communities = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const data = [
        {
            id:1,
            name:'Horeya',
            date:'20-2-2025'
        },
        {
            id:2,
            name:'All Classes',
            date:'20-2-2025'
        },
        
    ]

    const handleAddClass = async (className , ClassAgeFrom , ClassAgeTo) => {
        try {
    
            // const response = await ClassService.Add(className , ClassAgeFrom , ClassAgeTo);
            // console.log(response);
            // toast.success('Class added successfully');
            
            
          } catch (error) {
              console.log(error)
      
          }
    };

    return(
        <div className="MainContent Applications">
            <AddAdminModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddClass={handleAddClass}
            />
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <div className="AddIconContainer" 
                            onClick={() => setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Community
                    </div>
                    {/* <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        <div className="FilterAdmins">
                            <img src={FilterIcon} alt="" />
                        </div>
                    </div> */}
                </div>
                
                <div className="TableContainer container">
                    <div className="row">
                        {data.map((row)=>(
                            <Link to={`/community/${row.id}`} className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-5 col-sm-5 col-5 Center">
                                            {row.name}
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4  Center">
                                            {row.id}
                                        </div>
                                        
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Communities;