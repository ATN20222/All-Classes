import React, { useEffect, useState } from "react";
import './Chats.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faClock, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import NewsImage from '../../Assets/Images/NewsImage.png'
import BrandImage from '../../Assets/Images/BrandImage.png'
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import userImage from '../../Assets/Images/Avatar.svg'
import CategoryIcon from '../../Assets/Images/CategoryIcon.svg'
import { Link } from "react-router-dom";
import NewsItem from "../../Components/News/NewsItem";
import OffersItem from "../../Components/Offers/OffersItem";
import ChatComponent from "../../Components/Chat/ChatComponent";
import AddChatModal from "../../Components/Chat/AddChatModal";
import { ChatService, MembersService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
const Chats = ()=>{
    const [isChatTab , setIsChatTap] = useState (true);
    const [isOpen, setIsOpen] = useState(false);
    const [membersData , setMembersData] = useState([]);
    const [isChatOpen , setIsChatOpen] = useState(false);
    const [selectedChat , setselectedChat] = useState('');
    const [chatsData , setChatsData] = useState([]);
    const [groupsData , setGroupsData] = useState([]);

    const news = [
        {
            id: 1, 
            image: NewsImage,
            details: "This is a high-quality product designed for maximum performance and reliability. Perfect for daily use and comes with excellent customer reviews.",
            title: "Premium Wireless Headphones",
            price_after: "120",
            price_before: "150",
            brand_image: BrandImage,
            brand_rating: 4.5,
            brand_info: "Founded in 2005, the brand is known for creating top-tier electronic devices with a focus on innovation and customer satisfaction.",
            brand_name: "TechGuru"
        },
        
        {
            id: 2, 
            image: NewsImage,
            details: "This is a high-quality product designed for maximum performance and reliability. Perfect for daily use and comes with excellent customer reviews.",
            title: "Premium Wireless Headphones",
            price_after: "$120",
            price_before: "$150",
            brand_image: BrandImage,
            brand_rating: 4.5,
            brand_info: "Founded in 2005, the brand is known for creating top-tier electronic devices with a focus on innovation and customer satisfaction.",
            brand_name: "TechGuru"
        }
        
    ];
    const chats = [
        {
            id:1,
            name:"Marawan ahmed",
            message:`
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt doloremque ea facere ullam, possimus aliquid inventore, culpa error eius dolore omnis, delectus quas a harum. Numquam doloremque corrupti ullam blanditiis.
            `,
            image:userImage,
            status:0,
        },
        {
            id:2,
            name:"Marawan ahmed",
            message:`
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt doloremque ea facere ullam, possimus aliquid inventore, culpa error eius dolore omnis, delectus quas a harum. Numquam doloremque corrupti ullam blanditiis.
            `,
            image:userImage,
            status:1,
        },
        {
            id:3,
            name:"Marawan ahmed",
            message:`
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt doloremque ea facere ullam, possimus aliquid inventore, culpa error eius dolore omnis, delectus quas a harum. Numquam doloremque corrupti ullam blanditiis.
            `,
            image:userImage,
            status:2,
        }
    ]
    useEffect(()=>{
        getMembersData();
        getChats();
    },[])

    const handleCreateChat = async (members,name)=>{
        try {
            const type = members.length===1?'personal':'group';
            const response = await ChatService.Add(type ,members,name);
            getChats();
            toast.success('Chat created successfully');
        } catch (error) {
            console.error(error);
            toast.error(`${error}`)
        }
    }

    async function getMembersData() {
        try {
            const response = await MembersService.List();
            setMembersData(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    
    async function getChats() {
        try {
            const response = await ChatService.List();
            const allChats = response.content.filter(e=>e.type==='personal');
            const allGroups = response.content.filter(e=>e.type==='group');
            setChatsData(allChats);
            setGroupsData(allGroups);
        } catch (error) {
            console.error(error);
        }
    }



    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };
    return(
        <div className="MainContent Applications">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <AddChatModal
                isOpen={isOpen}
                membersData={membersData}
                onAddMembers={handleCreateChat}
                onClose={()=>setIsOpen(false)}      
            />
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <div className="AddIconContainer nav-link" 
                            onClick={()=>setIsOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div>
                        Chats 
                    </div>
                    {/* <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        <div className="FilterAdmins"   >
                            <img src={FilterIcon} alt="" />
                        </div>
                        
                    </div> */}
                </div>
                <div className="ChatTypeHeader">
                    <div className={`Chats ${isChatTab?'ChatsActiveTap':''}`}
                    onClick={()=>setIsChatTap(true)}
                    >
                        Chats
                    </div>
                    <div className={`Groups ${!isChatTab?'ChatsActiveTap':''}`}
                        onClick={()=>setIsChatTap(false)}
                    >
                        Groups
                    </div>
                </div>
                <div className="NewsRow">
                    {isChatTab?
                    chatsData.map((chat)=>(
                        <div className="ChatRecord" key={chat.chat_id} 
                        onClick={()=>{
                            setselectedChat(chat);
                            setIsChatOpen(true);
                        }}>
                            <div className="ChatRecordImage">
                                <div className="Avatar">
                                    <img src={userImage} width="100%" alt="" />
                                </div>
                            </div>
                            <div className="ChatRecordNameAndMessage">
                                <span className="Name">{chat.members[0].first_name + ' '+chat.members[0].last_name }</span>
                                <span className="Message">{chat.last_message}</span>
                            </div>
                            <div className="ChatRecordDateAndSeen">
                                <span>
                                    {chat.status===0&&<FontAwesomeIcon className="NotSeend" icon={faClock}/>}
                                    {chat.status===1&&<FontAwesomeIcon className="NotSeend" icon={faCheck}/>}
                                    {chat.status===2&&<FontAwesomeIcon icon={faCheckDouble}/>}
                                    
                                </span>
                            </div>
                        </div>
                    ))
                    :groupsData.map((chat)=>(
                        <div className="ChatRecord" key={chat.chat_id} 
                        onClick={()=>{
                            setselectedChat(chat);
                            setIsChatOpen(true);
                        }}>
                            <div className="ChatRecordImage">
                                <div className="Avatar">
                                    <img src={userImage} width="100%" alt="" />
                                </div>
                            </div>
                            <div className="ChatRecordNameAndMessage">
                                <span className="Name">{chat.name }</span>
                                <span className="Message">{chat.last_message}</span>
                            </div>
                            <div className="ChatRecordDateAndSeen">
                                <span>
                                    {chat.status===0&&<FontAwesomeIcon className="NotSeend" icon={faClock}/>}
                                    {chat.status===1&&<FontAwesomeIcon className="NotSeend" icon={faCheck}/>}
                                    {chat.status===2&&<FontAwesomeIcon icon={faCheckDouble}/>}
                                    
                                </span>
                            </div>
                        </div>
                    ))

                    }
                </div>
                {selectedChat&&
                    <ChatComponent ChatId={selectedChat.chat_id} 
                    Name={selectedChat.name?selectedChat.name:selectedChat.members[0].first_name+" "+selectedChat.members[0].last_name} 
                    isOpen={isChatOpen} 
                    toggleChat={toggleChat}/>
                }
            </div>
        </div>
    );
}
export default Chats;