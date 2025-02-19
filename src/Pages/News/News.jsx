import React, { useEffect, useState, useCallback, useRef } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import NewsImage from '../../Assets/Images/NewsImage.png'
import CommentImage from '../../Assets/Images/CommentImage.jpeg'
import NewsItem from "../../Components/News/NewsItem";
import './News.css'
import { Link, useNavigate } from "react-router-dom";
import Comments from "../../Components/News/Comments";
import { NewsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";

const News = () => {
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [NewsIdToDelete, setNewsIdToDelete] = useState('');
    const [commentToDelete, setCommentToDelete] = useState('');
    const [isCommentsOpend, setIsCommentsOpend] = useState(false);
    const [selectedComments, setSelectedComments] = useState([]);
    const [selectedNews, setSelectedNews] = useState('');
    const [allNews, setAllNews] = useState([]);
    const [CommentKey, setCommentKey] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const mainContentRef = useRef(null);

    const handleOpenComments = (newsId) => {
        setSelectedComments(allNews.find(n => n.id === newsId).comments);
        setSelectedNews(newsId);
        setIsCommentsOpend(true);
    }
    const handleScroll = useCallback(() => {
        if (!mainContentRef.current || loading) return;

        const { scrollTop, scrollHeight, clientHeight } = mainContentRef.current;

        if (scrollHeight - scrollTop <= clientHeight + 100 && pagination?.next_page_url) {
            setPagination(prev => prev);
            getData(pagination.current_page + 1);
        }
    }, [loading, pagination?.next_page_url]);


    const handleAddComment = async (newsId, comment) => {
        try {
            await NewsService.AddComment(newsId, comment);
            GetNewsById(newsId);
        } catch (error) {
            toast.error("Failed to comment");
        } finally {
            setCommentKey(CommentKey + 1);
        }
    }

    const handleReplyComment = async (newsId, replyData) => {
        try {
            await NewsService.ReplyComment(replyData.replyTo, replyData.text);
            GetNewsById(newsId);
        } catch (error) {
            toast.error("Failed to comment");
        } finally {
            setCommentKey(CommentKey + 1);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async (page = 1) => {
        if (loading || (page > 1 && !pagination?.next_page_url)) return;

        setLoading(true);
        try {
            const response = await NewsService.List(page);
            if (response?.content) {
                setAllNews(prevNews => page === 1 ? response.content : [...prevNews, ...response.content]);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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

 
    async function GetNewsById(id) {
        try {
            const response = await NewsService.GetById(id);
            const updatedItems = allNews.map((item) =>
                item.id === id ? response.content : item
            );
            setAllNews(updatedItems);
            setSelectedComments(response.content.comments);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        if (commentToDelete) {
            handleConfirmDeleteComment(id);
            return;
        }
        try {
            await NewsService.Delete(id);
            toast.success('News deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete news');
        } finally {
            setNewsIdToDelete('');
        }
    }

    const handleLikeNews = async (id) => {
        try {
            await NewsService.LikeNews(id);
            GetNewsById(id);
        } catch (error) {
            toast.error('An error occurred');
        }
    }

    const handleConfirmDeleteComment = async (id) => {
        try {
            await NewsService.DeleteComment(id);
            toast.success('Comment deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete comment');
        } finally {
            setCommentToDelete('');
        }
    }

    const handleDeleteComment = (id) => {
        setCommentToDelete(id);
        setIsCommentsOpend(false);
        setIsDeleteOverlayOpen(true);
    }

    const navigate = useNavigate();

    return (
        <div className="MainContent News" ref={mainContentRef}>
            <DeleteModalComponent
                id={commentToDelete ? commentToDelete : NewsIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <Comments
                key={CommentKey}
                isOpen={isCommentsOpend}
                onClose={() => setIsCommentsOpend(false)}
                onAddComment={handleAddComment}
                comments={selectedComments}
                newsId={selectedNews}
                onReplyComment={handleReplyComment}
                onDeleteComment={handleDeleteComment}
            />
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" to='/addnews'>
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        News
                    </div>
                </div>

                <div className="NewsRow">
                    {allNews.map((row) => (
                        <NewsItem
                            key={row.id}
                            id={row.id}
                            caption={row.caption}
                            comments={row.comments}
                            likes={row.likes_count}
                            date={row.created_at}
                            isLiked={row.likes.some(c => c.user_id == localStorage.getItem("UId"))}
                            image={row.media.length > 0 ? row.media[0].original_url : null}
                            OpenComments={handleOpenComments}
                            handleEditClicked={() => { navigate(`/editnews/${row.id}`) }}
                            handleDeleteClicked={() => {
                                setNewsIdToDelete(row.id);
                                setIsDeleteOverlayOpen(true);
                            }}
                            handlelikeClick={handleLikeNews}
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
}

export default News;