import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { RoomsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import { Link } from "react-router-dom";
const ChatRooms = ()=>{
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [rooms , setRooms] = useState([]);
    
    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await RoomsService.List();
            console.log("response",response);
            setRooms(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id)=>{
        try {
                
            const response = await RoomsService.Delete(id);
            toast.success('Room deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete room');
            
        }finally{
            setItemIdToDelete('');
        }
    }


    return(
        <div className="MainContent Applications">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <DeleteModalComponent
                id={ItemIdToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        <div className="AddIconContainer" 
                            // onClick={() => setIsOverlayOpen(true)}
                        > 
                            {/* <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" /> */}
                        </div>
                        Chat Rooms
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
                        {rooms.map((row)=>(
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-1 col-1  Center">
                                            {row.id}
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 Center">
                                            {row.name}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-4  Center">
                                            {row.members_count+' members'}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-sm-2 col-1 Center">
                                            <Link to={`/chatrooms/${row.id}`} className="Delete">
                                                <FontAwesomeIcon icon={faEye}/>
                                            </Link>
                                        </div>

                                        <div className="col-lg-2 col-md-2 col-sm-2 col-1 Center">
                                            <div className="Delete" onClick={()=>{
                                                setItemIdToDelete(row.id);
                                                setIsDeleteOverlayOpen(true);
                                            }}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </div>
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
export default ChatRooms;