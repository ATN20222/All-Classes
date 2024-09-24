import React from "react";
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import NewsImage from '../../Assets/Images/NewsImage.png'
import NewsItem from "../../Components/News/NewsItem";
import './News.css'
import { Link } from "react-router-dom";
const News = ()=>{
    const news = [
        {
            id :1 , 
            image:NewsImage,
            caption:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, ..................... more',
            comments:[
                {
                    text:'loream',

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
                    text:'loream',

                }
            ],
            likes:30,

        }
    ]
    return(
        <div className="MainContent News">
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
                        {news.map((row)=>(
                                <NewsItem
                                    key={row.id}
                                    id={row.id}
                                    caption={row.caption}
                                    comments={row.comments}
                                    likes={row.likes}
                                    date="5h ago"
                                    isLiked={true}
                                    image={row.image}
                                />
                        ))}
                    </div>
            </div>
        </div>
    );
}
export default News;