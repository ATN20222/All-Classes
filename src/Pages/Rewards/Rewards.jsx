import React, { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import NewsImage from '../../Assets/Images/NewsImage.png';
import BrandImage from '../../Assets/Images/BrandImage.png';
import FilterIcon from '../../Assets/Images/Filter.svg';
import PlusIcon from '../../Assets/Images/CirclePlus.svg';
import CategoryIcon from '../../Assets/Images/CategoryIcon.svg';
import { Link, useNavigate } from "react-router-dom";
import RewardsItem from "../../Components/Rewards/RewardsItem";
import { RewardsService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import toast, { Toaster } from "react-hot-toast";

const Rewards = () => {
    const [rewards, setRewards] = useState([]);
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState('');
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    
    const navigate = useNavigate();
    const mainContentRef = useRef(null);

    const getData = async (page = 1) => {
        if (loading || (page > 1 && !pagination?.next_page_url)) return;

        setLoading(true);
        try {
            const response = await RewardsService.List(page);
            if (response?.content) {
                setRewards(prevRewards => page === 1 ? response.content : [...prevRewards, ...response.content]);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
            await RewardsService.Delete(id);
            toast.success('Reward deleted successfully');
            getData(1);
        } catch (error) {
            toast.error('Failed to delete reward');
        } finally {
            setItemIdToDelete('');
        }
    };

    return (
        <div className="MainContent Applications" ref={mainContentRef}>
            <DeleteModalComponent
                id={itemIdToDelete}
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
                        <Link className="AddIconContainer nav-link" to="/addreward">
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Rewards
                    </div>
                </div>
                <div className="NewsRow">
                    {rewards.map((row) => (
                        <RewardsItem
                            key={row.id}
                            id={row.id}
                            points={row.redeem_points}
                            title={row.name}
                            image={row.media ? row.media[0]?.original_url : null}
                            details={row.description}
                            handleEditClicked={() => navigate(`/editrewards/${row.id}`)}
                            handleDeleteClicked={() => {
                                setItemIdToDelete(row.id);
                                setIsDeleteOverlayOpen(true);
                            }}
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

export default Rewards;
