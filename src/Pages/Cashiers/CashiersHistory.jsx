import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FilterIcon from '../../Assets/Images/Filter.svg'
import BackIcon from '../../Assets/Images/BackIcon.svg'
import CashIcon from '../../Assets/Images/CashHistoryImahe.svg'
import Cicle from '../../Assets/Images/CircleWhite.svg'
import TopPart from '../../Assets/Images/TopLeftImage.svg'
import logo from '../../Assets/Images/Avatar.svg'
import './Cashiers.css'
import AddBrandModal from "../../Components/Brands/AddBrandModal";
import AddCashiersModal from "../../Components/Cashiers/AddCashiersModal";
import { Link } from "react-router-dom";
const CashiersHistory = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const data = [
        {
            id:1,
            name:'Ahmed ali',
            brand_name:'Papa johns',
            cash_id:'936737',
            date:'Aug 19, 2023',
            price_before:'200',
            price_after:'188'
        },
        {
            id:2,
            name:'Ahmed ali',
            brand_name:'Papa johns',
            cash_id:'936737',
            date:'Aug 19, 2023',
            price_before:'200',
            price_after:'188'
        },
        {
            id:3,
            name:'Ahmed ali',
            brand_name:'Papa johns',
            cash_id:'936737',
            date:'Aug 19, 2023',
            price_before:'200',
            price_after:'188'
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
            
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                            // onClick={() => setIsOverlayOpen(true)}
                            to='/cashiers'
                        > 
                        
                            <img src={BackIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Cashiers
                    </div>
                    <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        
                    </div>
                </div>

                <div className="TableContainer">
                    <div className="TableRecord CashierTopPart">
                        <div className="CashierTopPartCircle">
                            <img src={Cicle} alt="" />
                        </div>
                        <div className="CashierTopPartTop">
                            <img src={TopPart} alt="" />
                        </div>
                        <div className="Expenditure">
                            <span>Total Expenditure</span>
                            <br />
                            <span>$ 17,000</span>
                        </div>
                        <div className="Separator"></div>
                        <div className="Revenue">
                            <span>Total Revenue</span>
                            <br />
                            <span>$ 20,000</span>
                        </div>

                    </div>
                </div>
                <div className="HistoryaCash">
                    <span>History</span>
                </div>
                <div className="TableContainer CashierTableContainer  container">
                    <div className="row">
                        {data.map((row)=>(
                            <div className="col-lg-12 TableRecord CashHistoryTableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 d-flex  align-items-center">
                                            <div className="CashHistoryImage">
                                                <img src={CashIcon} alt="" />
                                            </div>
                                            {row.brand_name}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2  Center">
                                            {row.name}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-1  Center">
                                            {row.cash_id}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-1  Center text-danger">
                                            {row.price_before + ' EGP'}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-1  Center text-success">
                                            {row.price_after + ' EGP'}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2  Center text-success">
                                            {row.date}
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
export default CashiersHistory;