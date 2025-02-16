import React, { useEffect, useState } from "react";
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
const News = ()=>{
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [NewsIdToDelete, setNewsIdToDelete] = useState('');
    const [commentToDelete , setCommentToDelete] = useState('');
    const [isCommentsOpend , setIsCommentsOpend] = useState(false);
    const [selectedComments , setSelectedComments] = useState([]);
    const [selectedNews , setSelectedNews] = useState('');
    const [allNews , setAllNews] = useState([]);
    const [CommentKey , setCommentKey] = useState(1);
    
    const handleOpenComments = (newsId)=>{
        console.log(newsId);
        setSelectedComments(allNews.find(n=>n.id===newsId).comments);
        setSelectedNews(newsId);
        setIsCommentsOpend(true);
        console.log(allNews.find(n=>n.id===newsId).comments);
    }
    const handleAddComment = async (newsId , comment)=>{

        try {
            const response = await NewsService.AddComment(newsId , comment);
            GetNewsById(newsId);
        } catch (error) {
            toast.error("Failed to comment");
        }finally{
            setCommentKey(CommentKey+1);
        }
    }
    const handleReplyComment = async (newsId , replyData)=>{
        
        try {
            const response = await NewsService.ReplyComment(replyData.replyTo , replyData.text);
            console.log(response);
            GetNewsById(newsId);
        } catch (error) {
            toast.error("Failed to comment");
        }finally{
            setCommentKey(CommentKey+1);
        }
    }

    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await NewsService.List();
            console.log(response);
            setAllNews(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    async function GetNewsById(id) {
        try {
            const response = await NewsService.GetById(id);
            const updatedItems = allNews.map((item) =>
                item.id === id ? response.content : item
            );
            console.log(updatedItems)
            setAllNews(updatedItems);
            setSelectedComments(response.content.comments);
            
        } catch (error) {
            console.error(error);
        } 
    }
    const handleDelete = async (id)=>{
        if(commentToDelete){
            handleConfirmDeleteComment(id);
            return;
        }
        try {
                
            const response = await NewsService.Delete(id);
            toast.success('News deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete news');
            
        }finally{
            setNewsIdToDelete('');
        }
    }
    const handleLikeNews = async (id)=>{
        try {
                
            const response = await NewsService.LikeNews(id);
            // toast.success('successfully');
            // getData();
            GetNewsById(id);
        } catch (error) {
            toast.error('an error occurred');
            
        }
    }

    const handleConfirmDeleteComment = async (id)=>{
        
        try {
                
            const response = await NewsService.DeleteComment(id);
            toast.success('Comment deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete comment');
            
        }finally{
            setCommentToDelete('');
        }
    }
    
    const handleDeleteComment =  (id)=>{
        setCommentToDelete(id);
        setIsCommentsOpend(false);
        setIsDeleteOverlayOpen(true);
    }

    const navigate = useNavigate();
    return(
        <div className="MainContent News">
            <DeleteModalComponent
                id={commentToDelete?commentToDelete:NewsIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <Comments
                key={CommentKey}
                isOpen={isCommentsOpend}
                onClose={()=>setIsCommentsOpend(false)}
                onAddComment={handleAddComment}
                comments={selectedComments}
                newsId={selectedNews}
                onReplyComment={handleReplyComment}
                onDeleteComment={handleDeleteComment}
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
                        <Link className="AddIconContainer nav-link" 
                            to='/addnews'
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        News
                    </div>
                </div>

                    <div className="NewsRow">
                        {allNews.map((row)=>(
                                <NewsItem
                                    key={row.id}
                                    id={row.id}
                                    caption={row.caption}
                                    comments={row.comments}
                                    likes={row.likes_count}
                                    date={row.created_at}
                                    isLiked={row.likes.some(c => c.user_id == localStorage.getItem("UId"))}
                                    image={row.media.length>0?row.media[0].original_url:null}
                                    OpenComments={handleOpenComments}
                                    handleEditClicked={()=>{navigate(`/editnews/${row.id}`)}}
                                    handleDeleteClicked={()=>{
                                        setNewsIdToDelete(row.id);
                                        setIsDeleteOverlayOpen(true);
                                    }}

                                    handlelikeClick={handleLikeNews}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default News;