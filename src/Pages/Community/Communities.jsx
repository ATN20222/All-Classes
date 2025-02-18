import React, { useState } from "react";
import './Communities.css'
import { Link, useNavigate } from "react-router-dom";
import LoginCommunityModal from "../../Components/Community/LoginCommunityModal";
import { AuthService } from "../../Services/Api";
import { getToken, setDB, setMindToken } from "../../Services/AxiosApi";
import toast, { Toaster } from "react-hot-toast";
const Communities = ()=>{
    const [isManageOverlayOpen, setIsManageOverlayOpen] = useState(false);
    const [selectedId , setSelectedId] = useState('');
    const data = [  
        {
            id:1,
            name:'All Classes',
            date:'20-2-2025',
            data_base:'community_1'
        },
        
    ]

    const navigate = useNavigate();
    const handleCommunityLogin = async (id , password) => {
        try {
                const email = localStorage.getItem('email');
                const temp_token = getToken();
                setMindToken(temp_token);
                setDB(data.find(i=>i.id===id).data_base);
                const response = await AuthService.Login(email , password);
                setTimeout(() => {
                    window.location.href = '/home';
                }, 2000);
                toast.success(`Now your active as ${data.find(i=>i.id===id).name}`);
                
            } catch (error) {
                console.log(error)
                toast.error(`${error}`);

        
            }
    };

    return(
        <div className="MainContent Applications">
            <LoginCommunityModal
                id={selectedId}
                isOpen={isManageOverlayOpen}
                onClose={() => setIsManageOverlayOpen(false)}
                onLogin={handleCommunityLogin}
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
                        {/* <div className="AddIconContainer" 
                            onClick={() => setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div> */}
                        Community
                    </div>
                    {/* <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch}/>
                            
                        </div>
                        <div className="FilterAdmins">
                            <img src={FilterIcon} alt="" />
                        </div>
                    </div> */}
                </div>
                
                <div className="TableContainer container">
                    <div className="row">
                        {data.map((row)=>(
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <Link className="col-lg-4 col-md-5 col-sm-5 col-5 Center nav-link"to={`/community/${row.id}`} >
                                            {row.name}
                                        </Link>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4  Center">
                                            {row.id}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-3  Center">
                                            <span className="ManageCommunity" onClick={()=>{
                                                setIsManageOverlayOpen(true);
                                                setSelectedId(row.id);

                                            }}>Manage</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Communities;