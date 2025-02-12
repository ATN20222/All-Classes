import React, { useEffect, useState } from "react";
import './Admins.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import AddAdminModal from "../../Components/Admins/AddAdminModal";
import { AdminsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import EditAdminModal from "../../Components/Admins/EditAdminModal";
const Admins = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [AdminIdToEdit , setAdminIdToEdit] = useState('');
    const [AdminKeyToEdit , setAdminKeyToEdit] = useState('');
    const[emailToEdit,setEmailToEdit] = useState('');
    const[nameToEdit,setNameToEdit] = useState('');
    const [manageToEdit,setManageToEdit] = useState([]);
    const [admins , setAdmins] = useState([]);

    const data = [
        {
            id:1,
            name:'Ahmed adel',
            date:'20-2-2025'
        },
        {
            id:2,
            name:'Nader adel',
            date:'20-2-2025'
        },
        {
            id:3,
            name:'zaher adel',
            date:'20-2-2025'
        }
    ]


    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await AdminsService.List();
            console.log("response",response);
            setAdmins(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    const handleAddAdmin = async (data) => {
        try {
            const response = await AdminsService.Add(data);
            toast.success('Admin added successfully');
            getData();  
            
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const handleEditAdmin = async (id, data) => {
        try {
            console.log(id , data);
            // return;
            const response = await AdminsService.Edit(id , data);
            // console.log(response);
            toast.success('Admin edited successfully');
            getData();  
            
        } catch (error) {
            toast.error(`${error}`);
    
        }
    };
    const handleDelete = async (id)=>{
        try {
                
            const response = await AdminsService.Delete(id);
            toast.success('Admin deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete admin');
            
        }finally{
            setItemIdToDelete('');
        }
    }
    const HandleEditClick = async (id)=>{
            setAdminIdToEdit(id);
            setAdminKeyToEdit(AdminKeyToEdit+1);
            setIsEditOverlayOpen(true);
    }
    



    return(
        <div className="MainContent Applications">
            <AddAdminModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddAdmin={handleAddAdmin}
            />
            {AdminIdToEdit&&
                <EditAdminModal
                    isOpen={isEditOverlayOpen}
                    onClose={() => setIsEditOverlayOpen(false)}
                    onEditAdmin={handleEditAdmin}
                    id={AdminIdToEdit}
                    key={AdminKeyToEdit}
                />
            }
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
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <div className="AddIconContainer" 
                            onClick={() => setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Admins
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
                        {admins.map((row)=>(
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-5 col-sm-5 col-5 Center">
                                            {row.name}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-3  Center">
                                            {row.id}
                                        </div>

                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center">
                                            <div className="Delete" onClick={()=>HandleEditClick(row.id)}>
                                                <FontAwesomeIcon icon={faPen}/>
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center">
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
export default Admins;