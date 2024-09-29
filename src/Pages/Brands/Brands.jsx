import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import AddAdminModal from "../../Components/Admins/AddAdminModal";
import AddPointModal from "../../Components/PointSystem/AddPointModal";
import logo from '../../Assets/Images/Avatar.svg'
import './Brands.css'
import AddBrandModal from "../../Components/Brands/AddBrandModal";
const Brands = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const data = [
        {
            id:1,
            name:'Brand name',
            date:'20-2-2025'
        },
        {
            id:2,
            name:'Brand name',
            date:'20-2-2025'
        },
        {
            id:3,
            name:'Brand name',
            date:'20-2-2025'
        }
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
            <AddBrandModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddBrand={handleAddClass}
            />
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <div className="AddIconContainer" 
                            onClick={() => setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Brands
                    </div>
                    <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        
                    </div>
                </div>
                
                <div className="TableContainer container">
                    <div className="row">
                        {data.map((row)=>(
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-4 BrandAvatarAndNameCol">
                                            <div className="BrandAvatar">
                                                <img src={logo} alt="" />
                                            </div>
                                            {row.name}
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4  Center">
                                            {row.date}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2 col-2  Center">
                                            {row.id}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-1 Center">
                                            <div className="Delete">
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Brands;