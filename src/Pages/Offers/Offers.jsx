import React, { useEffect, useState } from "react";
import './Offers.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import NewsImage from '../../Assets/Images/NewsImage.png';
import BrandImage from '../../Assets/Images/BrandImage.png';
import FilterIcon from '../../Assets/Images/Filter.svg';
import PlusIcon from '../../Assets/Images/CirclePlus.svg';
import CategoryIcon from '../../Assets/Images/CategoryIcon.svg';
import { Link, useNavigate } from "react-router-dom";
import NewsItem from "../../Components/News/NewsItem";
import OffersItem from "../../Components/Offers/OffersItem";
import toast, { Toaster } from "react-hot-toast";
import { OffersService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import CategoryMenu from "../../Components/Offers/CategoryMenu";

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [category, setCategory] = useState('all');
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [offerIdToDelete, setOfferIdToDelete] = useState([]);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false); 

    useEffect(() => {
        getData();
    }, [category]); 

    async function getData() {
        try {
            const response = await OffersService.List(category);
            setOffers(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const response = await OffersService.Delete(id);
            toast.success('Offer deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete offer');
        } finally {
            setOfferIdToDelete('');
        }
    }

    const handleChangeCategory = (cat) => {
        setCategory(cat); // This will trigger useEffect to call `getData()`
        setIsCategoryMenuOpen(false); // Close the category menu after selecting
    }

    return (
        <div className="MainContent Applications">
            <DeleteModalComponent
                id={offerIdToDelete}
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
                        <Link className="AddIconContainer nav-link" to="/addoffer">
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Offers
                    </div>
                    <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        {/* <div className="FilterAdmins">
                            <img src={FilterIcon} alt="" />
                        </div> */}
                        <div className="FilterAdmins" onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}>
                            <img src={CategoryIcon} alt="" />
                        </div>
                        <div className="CategoryMenu">
                            <CategoryMenu 
                                isOpen={isCategoryMenuOpen} 
                                onClose={() => setIsCategoryMenuOpen(false)}
                                ChangeSelectedCat={handleChangeCategory}
                            />
                        </div>
                    </div>
                </div>
                <div className="NewsRow">
                    {offers.map((row) => (
                        <OffersItem
                            key={row.id}
                            id={row.id}
                            brand_name={row.brand?.name}
                            brand_info={row.brand_info}
                            brand_rating={row.brand_rating}
                            brand_image={row.brand_image ? row.brand_image : BrandImage}
                            discount={row.discount}
                            title={row.title}
                            image={row.media? row.media[0]?.original_url :null}
                            details={row.description}
                            handleDeleteClicked={() => {
                                setOfferIdToDelete(row.id);
                                setIsDeleteOverlayOpen(true);
                            }}
                            handleEditClicked={()=>{
                                navigate(`/editoffer/${row.id}`)
                            }}
                            code = {row.qr_code}
                        />
                    ))}
                    {offers.length===0&&
                        <div className="NoData">
                            <FontAwesomeIcon icon={faBan}/>
                            <p>No data found</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Offers;
