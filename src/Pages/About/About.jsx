import React, { useEffect, useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import NewsImage from '../../Assets/Images/NewsImage.png'
import CommentImage from '../../Assets/Images/CommentImage.jpeg'
import NewsItem from "../../Components/News/NewsItem";
import { Link, useNavigate } from "react-router-dom";
import Comments from "../../Components/News/Comments";
import AboutItem from "../../Components/About/AboutItem";
import { AboutServices } from "../../Services/Api";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import toast, { Toaster } from "react-hot-toast";
const About = ()=>{
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [abouts , setAbouts] = useState([]);

    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await AboutServices.List();
            setAbouts(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async (id)=>{
        try {
                
            const response = await AboutServices.Delete(id);
            toast.success('Item deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete item');
            
        }finally{
            setItemIdToDelete('');
        }
    }
    const navigate = useNavigate();
    return(
        <div className="MainContent News">
            <DeleteModalComponent
                id={ItemIdToDelete}
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
                        <Link className="AddIconContainer nav-link" 
                            to='/addabout'
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        About
                    </div>
                </div>

                    <div className="NewsRow">
                        {abouts.map((row)=>(
                                <AboutItem
                                    key={row.id}
                                    id={row.id}
                                    title = {row.title}
                                    caption={row.description}
                                    image={row.media?.original_url}
                                    handleDeleteClicked={()=>{
                                        setItemIdToDelete(row.id);
                                        setIsDeleteOverlayOpen(true);
                                    }}
                                    handleEditClicked={()=>navigate(`/editabout/${row.id}`)}
                                    
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default About;