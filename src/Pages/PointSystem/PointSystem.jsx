import React, { useEffect, useState } from "react";
import './PointSystem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import FilterIcon from '../../Assets/Images/Filter.svg'
import PlusIcon from '../../Assets/Images/CirclePlus.svg'
import AddAdminModal from "../../Components/Admins/AddAdminModal";
import AddPointModal from "../../Components/PointSystem/AddPointModal";
import { MindHomeServices, PointsService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
const PointSystem = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState({});
    const [pointsData , setPointsData] = useState([]);
    const [key , setKey] = useState(0);
    const data = [
        {
            id: 1,
            name: 'Add Job',
            points: 0,
            date: '20-2-2025'
        },
        {
            id: 2,
            name: 'Renew Subscription',
            points: 10,
            date: '20-2-2025'
        },
        {
            id: 3,
            name: 'Join Event',
            points: 0,
            date: '20-2-2025'
        }
    ]


    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await PointsService.ListPoints();
            console.log("response",response);
            setPointsData(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    const handlePoints = async (id, points ,display_name , action) => {
        try {
            const response = await PointsService.EditPoints(id, points , display_name, action);
            toast.success('Points modified successfully');
            getData();
        } catch (error) {
            console.log(error)
            toast.error('Failed to modify points');
        }
        setSelectedPoint({});
        
    };

    return (
        <div className="MainContent Applications">
            <AddPointModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onEditPoint={handlePoints}
                data={selectedPoint}
                key={key}
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
                            // onClick={() => setIsOverlayOpen(true)}
                        > 
                            <img src={PlusIcon} width="20px" height="20px" className="m-1" alt="" />
                        </div> */}
                        Point system
                    </div>
                    {/* <div className="RightSideHeader">
                        <div className="PageSearch">
                            <input type="text" placeholder="Search" />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </div> */}
                </div>
                <div className="TableContainer container">
                    <div className="row">
                        {pointsData.map((row) => (
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-5 col-sm-5 col-5 Center">
                                            {row.display_name}
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4  Center">
                                            {row.points}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                            <div className="Delete" onClick={() => {
                                                setKey(key + 1);
                                                setSelectedPoint(row);
                                                setIsOverlayOpen(true);
                                            }}>
                                                <FontAwesomeIcon icon={faPen} />
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
export default PointSystem;