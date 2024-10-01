import React, { useState } from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import NewsImage from '../../Assets/Images/NewsImage.png'
import CommentImage from '../../Assets/Images/CommentImage.jpeg'
import NewsItem from "../../Components/News/NewsItem";
import { Link } from "react-router-dom";
import Comments from "../../Components/News/Comments";
import AboutItem from "../../Components/About/AboutItem";
const About = ()=>{
    const [isCommentsOpend , setIsCommentsOpend] = useState(false);
    const [selectedComments , setSelectedComments] = useState([]);
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
        setSelectedComments(news.find(n=>n.id===newsId).comments);
        setIsCommentsOpend(true);
        console.log(news.find(n=>n.id===newsId).comments);
    }
    const handleAddComment = (newsId , comment)=>{
        
    }
    return(
        <div className="MainContent News">
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <Link className="AddIconContainer nav-link" 
                            // onClick={() => setIsOverlayOpen(true)}
                            to='/addabout'
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </Link>
                        About
                    </div>
                </div>

                    <div className="NewsRow">
                        {news.map((row)=>(
                                <AboutItem
                                    key={row.id}
                                    id={row.id}
                                    caption={row.caption}
                                    comments={row.comments}
                                    likes={row.likes}
                                    date="5h ago"
                                    isLiked={true}
                                    image={row.image}
                                    OpenComments={handleOpenComments}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default About;