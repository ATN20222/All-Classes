import React, { useEffect, useState } from "react";
import './Members.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { MembersService } from "../../Services/Api";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";

const Members = () => {
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [ItemIdToDelete, setItemIdToDelete] = useState('');
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await MembersService.List();
            setMembers(response.content);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await MembersService.Delete(id);
            toast.success('Member deleted successfully');
            getData();
        } catch (error) {
            toast.error('Failed to delete member');
        } finally {
            setItemIdToDelete('');
        }
    };

    // Filter members based on search query
    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        member.id.toString().includes(searchQuery)
    );

    return (
        <div className="MainContent Applications">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
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
                        Members
                    </div>
                    <div className="PageSearch">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                
                <div className="TableContainer container">
                    <div className="row">
                        {filteredMembers.map((row) => (
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <Link to={`/member/${row.id}`} className="nav-link col-lg-4 col-md-5 col-sm-5 col-5 Center">
                                            {row.name}
                                        </Link>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 Center">
                                            {row.id}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                            <div className="Delete" onClick={() => {
                                                setItemIdToDelete(row.id);
                                                setIsDeleteOverlayOpen(true);
                                            }}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredMembers.length === 0 && (
                            <div className="col-lg-12 text-center">
                                No members found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
