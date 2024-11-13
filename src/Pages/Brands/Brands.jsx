import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import logo from '../../Assets/Images/Avatar.svg'
import './Brands.css'
import AddBrandModal from "../../Components/Brands/AddBrandModal";
import toast, { Toaster } from "react-hot-toast";
import { BrandsService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import { Link, useNavigate } from "react-router-dom";
const Brands = ()=>{
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isDeleteOverlayOpen , setIsDeleteOverlayOpen] = useState(false);
    const [brandIdToDelete , setBrandIdToDelete] = useState('');
    const [brands , setBrands] = useState([]);

    const handleAddBrand = async (name , email) => {
        try {    
                const response = await BrandsService.Add(name ,email);
                toast.success('Brand added successfully');
                getData();

            } catch (error) {
                console.log(error)
                toast.error('Failed to add brand'); 
            }
    };
    const navigate = useNavigate();
    useEffect(()=>{
        getData();
    },[])
    

    async function getData() {
        try {
            const response = await BrandsService.List();
            setBrands(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async (id)=>{
        try {
                
            const response = await BrandsService.Delete(id);
            toast.success('Brand deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete brand');
            
        }finally{
            setBrandIdToDelete('')
        }
    }



    return(
        <div className="MainContent Applications">
            <AddBrandModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddBrand={handleAddBrand}
            />
            <DeleteModalComponent
                id={brandIdToDelete}
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
                        Brands
                    </div>
                    {/* <div className="Right   SideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        
                    </div> */}
                </div>
                
                <div className="TableContainer container">
                    <div className="row">
                        {brands.map((row)=>(
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-4 BrandAvatarAndNameCol">
                                            <div className="BrandAvatar">
                                                <img src={logo} alt="" />
                                            </div>
                                            {row.name}
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-3  Center">
                                            {row.created_at}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-2 col-2  Center">
                                            {row.id}
                                        </div>
                                        {/* <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center">
                                            <Link to={`/cashiers/${row.id}`} className="nav-link">
                                                <FontAwesomeIcon icon={faEye} /> View Cashiers
                                            </Link>
                                        </div> */}
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center">
                                            <div className="Delete" onClick={()=>{
                                                setBrandIdToDelete(row.id);
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
export default Brands;