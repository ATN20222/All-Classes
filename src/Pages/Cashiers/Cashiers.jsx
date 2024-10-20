import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import AddAdminModal from "../../Components/Admins/AddAdminModal";
import AddPointModal from "../../Components/PointSystem/AddPointModal";
import logo from '../../Assets/Images/Avatar.svg'
import './Cashiers.css'
import AddBrandModal from "../../Components/Brands/AddBrandModal";
import AddCashiersModal from "../../Components/Cashiers/AddCashiersModal";
import { Link } from "react-router-dom";
import { CashierService } from "../../Services/Api";
const Cashiers = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [cashiers , setCashiers] = useState([]);
    const data = [
        {
            id:1,
            name:'name',
            brand_name:'Brand name',
            date:'20-2-2025'
        },
        {
            id:2,
            name:'name',
            brand_name:'Brand name',
            date:'20-2-2025'
        },
        {
            id:3,
            name:'name',
            brand_name:'Brand name',
            date:'20-2-2025'
        },
    ]

    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await CashierService.List();
            setCashiers(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddCashier = async (name , email , brand) => {
        try {
    
            // const response = await ClassService.Add(className , ClassAgeFrom , ClassAgeTo);
            // console.log(response);
            // toast.success('Class added successfully');
            
            getData();
          } catch (error) {
              console.log(error)
      
          }
    };

    return(
        <div className="MainContent Applications">
            <AddCashiersModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddCashier={handleAddCashier}
            />
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <div className="AddIconContainer" 
                            onClick={() => setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Cashiers
                    </div>
                    <div className="RightSideHeader">
                        <Link to='/cashiershistory' className="CashiersHistoryLink">History</Link>

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
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-4 Center">
                                            {row.name}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2 col-2  Center">
                                            {row.id}
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4  Center">
                                            {row.brand_name}
                                        </div>
                                        <div className="col-lg-3 col-md-2 col-sm-2 col-1 Center">
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
export default Cashiers;