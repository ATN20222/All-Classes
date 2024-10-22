import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import AddAdminModal from "../../Components/Admins/AddAdminModal";
import AddPointModal from "../../Components/PointSystem/AddPointModal";
import logo from '../../Assets/Images/Avatar.svg'
import './Cashiers.css'
import AddBrandModal from "../../Components/Brands/AddBrandModal";
import AddCashiersModal from "../../Components/Cashiers/AddCashiersModal";
import { Link, useParams } from "react-router-dom";
import { BrandsService, CashierService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import EditCashiersModal from "../../Components/Cashiers/EditCashiersModal";
const Cashiers = ()=>{
    const {id} = useParams();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
    const [cashierDataToEdit , setCashierDataToEdit] = useState({});
    const [cashiers , setCashiers] = useState([]);
    const [isDeleteOverlayOpen , setIsDeleteOverlayOpen] = useState(false);
    const [itemIdToDelete , setItemIdToDelete] = useState('');
    const [brandName , setBrandName] = useState('');
    useEffect(()=>{
        getData();
    },[]);

    async function getData() {
        try {
            const response = await  BrandsService.GetById(id);
            console.log(response);
            setCashiers(response.content.cashires);
            setBrandName(response.content.name)
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddCashier = async (name,email ,password) => {
        try {
            const response = await CashierService.Add(id,name , email ,password);
                toast.success('Cashier added successfully');
                getData();
            
            getData();
        } catch (error) {
            toast.error(`${error}`);
        }
    };
    const handleEditCashier = async ( name,email ,password) => {
        try {
            const response = await CashierService.Edit(cashierDataToEdit.id, id,name , email ,password);
                toast.success('Cashier edited successfully');
                getData();
            
            getData();
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const handleDelete = async (id)=>{
        try {
                
            const response = await CashierService.Delete(id);
            toast.success('Cashier deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete cashier');
            
        }finally{
            setItemIdToDelete('');
        }
    }


    return(
        <div className="MainContent Applications">
            <AddCashiersModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddCashier={handleAddCashier}
            />
            <EditCashiersModal
                isOpen={isEditOverlayOpen}
                data = {cashierDataToEdit}
                onClose={() =>{ setIsEditOverlayOpen(false); setCashierDataToEdit({})}}
                onAddCashier={handleEditCashier}
            />
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
                        {cashiers.map((row)=>(
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
                                            {brandName}
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                            <FontAwesomeIcon icon={faPen} onClick={()=>{
                                                setCashierDataToEdit(row);
                                                setIsEditOverlayOpen(true);
                                            }}/>
                                        </div>
                                        <div className="col-lg-2 col-md-1 col-sm-1 col-1 Center">
                                            <div className="Delete" onClick={()=>{
                                                setItemIdToDelete(row.id);
                                                setIsDeleteOverlayOpen(true);
                                            }}>
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