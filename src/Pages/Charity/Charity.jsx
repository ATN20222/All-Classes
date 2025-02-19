import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlusIcon from '../../Assets/Images/CirclePlus.svg';
import CharityItem from "../../Components/Charity/CharityItem";
import { CharityService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import './Charity.css';

const Charity = () => {
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [charityIdToDelete, setCharityIdToDelete] = useState('');
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [charities, setCharities] = useState([]);
    const navigate = useNavigate();
    const mainContentRef = useRef(null);

    const getData = async (page = 1) => {
        if (loading || (page > 1 && !pagination?.next_page_url)) return;

        setLoading(true);
        try {
            const response = await CharityService.List(page);
            if (response?.content) {
                setCharities(prevCharities => page === 1 ? response.content : [...prevCharities, ...response.content]);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCharities([]);
        getData(1);
    }, []);

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
            await CharityService.Delete(id);
            toast.success('Charity deleted successfully');
            getData(1);
        } catch (error) {
            toast.error('Failed to delete charity');
        } finally {
            setCharityIdToDelete('');
        }
    };

    return (
        <div className="MainContent Applications" ref={mainContentRef}>
            <DeleteModalComponent
                id={charityIdToDelete}
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
                        <Link className="AddIconContainer nav-link" to="/addcharity">
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Charity
                    </div>
                </div>
                <div className="NewsRow">
                    {charities.map((row) => (
                        <CharityItem
                            key={row.id}
                            id={row.id}
                            name={row.name}
                            brand_info={row.description}
                            brand_image={row.media.length > 0 ? row.media[0].original_url : null}
                            title={"Services"}
                            image={row.media.length > 0 ? row.media[0].original_url : null}
                            services={row.services}
                            address={row.address}
                            email={row.email}
                            number={row.phone}
                            website={row.website}
                            handleDeleteClicked={() => {
                                setCharityIdToDelete(row.id);
                                setIsDeleteOverlayOpen(true);
                            }}
                            handleEditClicked={() => navigate(`/editcharity/${row.id}`)}
                        />
                    ))}
                </div>
                {loading && (
                    <div className="col-lg-12 Center mt-5 mb-5">
                        <div className="loader">
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

export default Charity;
