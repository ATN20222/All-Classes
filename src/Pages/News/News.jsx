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

    const [isCommentsOpend , setIsCommentsOpend] = useState(false);
    const [selectedComments , setSelectedComments] = useState([]);
    const [selectedNews , setSelectedNews] = useState('');
    const [allNews , setAllNews] = useState([]);
    const [CommentKey , setCommentKey] = useState(1);
    
    const news = [
        {
            id :1 , 
            image:NewsImage,
            caption:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, ..................... more',
            comments:[
                {
                    name:'Mike Johnson',
                    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ab quidem esse autem saepe, ratione sint incidunt suscipit dolores enim voluptatum rem temporibus illo quos, iure impedit deleniti? Facilis, doloribus.",
                    image:CommentImage,
                    time:'5m'
                },
                {
                    name:'Mike Johnson',
                    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ab quidem esse autem saepe, ratione sint incidunt suscipit dolores enim voluptatum rem temporibus illo quos, iure impedit deleniti? Facilis, doloribus.",
                    image:CommentImage,
                    time:'5m'
                }
                ,{
                    name:'Mike Johnson',
                    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ab quidem esse autem saepe, ratione sint incidunt suscipit dolores enim voluptatum rem temporibus illo quos, iure impedit deleniti? Facilis, doloribus.",
                    image:CommentImage,
                    time:'5m'
                }
            ],
            likes:30,

        },
        {
            id :2 , 
            image:NewsImage,
            caption:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, ..................... more',
            comments:[
                {
                    name:'Mike Johnson',
                    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ab quidem esse autem saepe, ratione sint incidunt suscipit dolores enim voluptatum rem temporibus illo quos, iure impedit deleniti? Facilis, doloribus.",
                    image:CommentImage,
                    time:'5m'
                }
            ],
            likes:30,

        }
    ];
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
            toast.success('successfully');
            // getData();
            GetNewsById(id);
        } catch (error) {
            toast.error('an error occurred');
            
        }
    }

    const navigate = useNavigate();
    return(
        <div className="MainContent News">
            <DeleteModalComponent
                id={NewsIdToDelete}
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
                            // onClick={() => setIsOverlayOpen(true)}
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
                                    isLiked={true}
                                    image={row.media?row.media[0].original_url:null}
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