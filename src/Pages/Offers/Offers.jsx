import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Offers.css";
import { Link, useNavigate } from "react-router-dom";
import OffersItem from "../../Components/Offers/OffersItem";
import toast, { Toaster } from "react-hot-toast";
import { OffersService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import CategoryMenu from "../../Components/Offers/CategoryMenu";
import PlusIcon from "../../Assets/Images/CirclePlus.svg";
import CategoryIcon from '../../Assets/Images/CategoryIcon.svg';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [category, setCategory] = useState("all");
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [offerIdToDelete, setOfferIdToDelete] = useState("");
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const mainContentRef = useRef(null);
    const navigate = useNavigate();

    const getData = async (page = 1) => {
        if (loading || (page > 1 && !pagination?.next_page_url)) return;
        setLoading(true);
        try {
            const response = await OffersService.List(category, page);
            if (response?.content) {
                setOffers(prevOffers => page === 1 ? response.content : [...prevOffers, ...response.content]);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleChangeCategory = (cat) => {
        setCategory(cat); // This will trigger useEffect to call `getData()`
        setIsCategoryMenuOpen(false); // Close the category menu after selecting
    }

    useEffect(() => {
        setOffers([]);
        setCurrentPage(1);
        getData(1);
    }, [category]);
    

    useEffect(() => {
        if (currentPage > 1) {
            getData(currentPage);
        }
    }, [currentPage]);

    const handleScroll = useCallback(() => {
        if (!mainContentRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = mainContentRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && pagination?.next_page_url) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, [loading, pagination?.next_page_url]);

    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (mainContentRef.current) {
                mainContentRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);

    const handleDelete = async (id) => {
        try {
            await OffersService.Delete(id);
            toast.success("Offer deleted successfully");
            getData(1);
        } catch (error) {
            toast.error("Failed to delete offer");
        } finally {
            setOfferIdToDelete("");
        }
    };

    return (
        <div className="MainContent Applications" ref={mainContentRef}>
            <DeleteModalComponent
                id={offerIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
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
                            brand_image={row.brand?.media?.length > 0 ? row.brand.media[0].original_url : "../../Assets/Images/BrandImage.png"}
                            discount={row.discount}
                            title={row.title}
                            image={row.media ? row.media[0]?.original_url : null}
                            details={row.description}
                            handleDeleteClicked={() => {
                                setOfferIdToDelete(row.id);
                                setIsDeleteOverlayOpen(true);
                            }}
                            handleEditClicked={() => navigate(`/editoffer/${row.id}`)}
                            code={row.qr_code}
                        />
                    ))}
                </div>
                {loading && (
                    <div className="col-lg-12 Center mt-5 mb-5">
                        <div className="loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Offers;
