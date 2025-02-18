import React, { useEffect, useState, useCallback, useRef } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import './BuyAndSell.css'
import { Link, useNavigate } from "react-router-dom";
import BuyAndSellItem from "../../Components/BuyAndSell/BuyAndSellItem";
import { BuyAndSellService } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import toast, { Toaster } from "react-hot-toast";

const BuyAndSell = () => {
    const navigate = useNavigate();
    
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [buyAndSell, setBuyAndSell] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const mainContentRef = useRef(null);

    const getData = async (page = 1) => {
        if (loading || (page > 1 && !pagination?.next_page_url)) return;

        setLoading(true);
        try {
            const response = await BuyAndSellService.List(page);
            if (response?.content) {
                setBuyAndSell(prevItems => page === 1 ? response.content : [...prevItems, ...response.content]);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setBuyAndSell([]);
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
            await BuyAndSellService.Delete(id);
            toast.success('Item deleted successfully');
            getData(1);
        } catch (error) {
            toast.error('Failed to delete item');
        } finally {
            setItemIdToDelete('');
        }
    };

    return (
        <div className="MainContent News" ref={mainContentRef}>
            <DeleteModalComponent
                id={ItemIdToDelete}
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
                        <Link className="AddIconContainer nav-link" to="/addbuyandsell">
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        Buy & Sell
                    </div>
                </div>

                <div className="NewsRow">
                    {buyAndSell.map((row) => (
                        <BuyAndSellItem
                            key={row.id}
                            id={row.id}
                            Uid={row.user.id}
                            price={row.price}
                            discount={row.discount}
                            buy_details={row.description}
                            image={row.media.length > 0 ? row.media[row.media.length - 1]?.original_url : null}
                            buy_title={row.title}
                            puplisher_image={row.user?.member?.media.length > 0 ? row.user?.member?.media[0].original_url : null}
                            puplisher_name={row.user.name}
                            puplish_date={row.user.created_at}
                            handleEditClicked={() => navigate(`/editbuyandsell/${row.id}`)}
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

export default BuyAndSell;
