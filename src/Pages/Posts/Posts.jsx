import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomPostsService, RoomsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import PostsItem from "../../Components/Posts/PostsItem";
import PostsComments from "../../Components/Posts/PostsComments";
const Posts = ()=>{
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [NewsIdToDelete, setNewsIdToDelete] = useState('');
    const [commentToDelete , setCommentToDelete] = useState('');
    const [isCommentsOpend , setIsCommentsOpend] = useState(false);
    const [selectedComments , setSelectedComments] = useState([]);
    const [selectedNews , setSelectedNews] = useState('');
    const [allNews , setAllNews] = useState([]);
    const [CommentKey , setCommentKey] = useState(1);
    

    const {id} = useParams(); 

    const handleOpenComments = (newsId)=>{
        console.log(newsId);
        setSelectedComments(allNews.find(n=>n.id===newsId).comments);
        setSelectedNews(newsId);
        setIsCommentsOpend(true);
        console.log(allNews.find(n=>n.id===newsId).comments);
    }
    

    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await RoomsService.GetById(id);
            console.log(response);
            setAllNews(response.content.posts);
        } catch (error) {
            console.error(error);
        }
    }

    async function GetNewsById(id) {
        try {
            const response = await RoomPostsService.GetById(id);
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
                
            const response = await RoomPostsService.Delete(id);
            toast.success('Post deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete post');
            
        }finally{
            setNewsIdToDelete('');
        }
    }
    const handleConfirmDeleteComment = async (id)=>{
        
        try {
                
            const response = await RoomPostsService.DeleteComment(id);
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

    return(
        <div className="MainContent News">
            <DeleteModalComponent
                id={commentToDelete?commentToDelete:NewsIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <PostsComments
                key={CommentKey}
                isOpen={isCommentsOpend}
                onClose={()=>setIsCommentsOpend(false)}
                comments={selectedComments}
                newsId={selectedNews}
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
                        Posts
                    </div>
                </div>

                    <div className="NewsRow">
                        {allNews.map((row)=>(
                                <PostsItem
                                    key={row.id}
                                    id={row.id}
                                    name={row.user?.name}
                                    userImage={row.user?.member?.media?.length>0?row.user?.member?.media[0].original_url:null}
                                    caption={row.content}
                                    comments={row?.comments?row.comments:[]}
                                    likes={row.likes_count}
                                    date={row.created_at}
                                    image={row?.media?.length>0?row.media[0].original_url:null}
                                    OpenComments={handleOpenComments}
                                    handleDeleteClicked={()=>{
                                        setNewsIdToDelete(row.id);
                                        setIsDeleteOverlayOpen(true);
                                    }}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default Posts;