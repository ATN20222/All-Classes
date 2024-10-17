import React, { useEffect, useState } from "react";
import './Applications.css'
import { Link } from "react-router-dom";
import { ApplicationsService } from "../../Services/Api";
const Applications = ()=>{
    const data = [
        {
            id:1,
            name:'Ahmed adel',
            date:'20-2-2025'
        },
        {
            id:2,
            name:'Nader adel',
            date:'20-2-2025'
        },
        {
            id:3,
            name:'zaher adel',
            date:'20-2-2025'
        }
    ]
    const [applications , setApplications] = useState([]);
    useEffect(()=>{
        getData();
    },[]);
    async function getData() {
        try {
            const response = await ApplicationsService.List();
            console.log("response",response);
            setApplications(response.content);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className="MainContent Applications">
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        Applications
                    </div>
                </div>
                <div className="TableContainer container">
                    <div className="row">
                        {applications.map((row)=>(
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-5 col-sm-5 col-5 Center">
                                            <Link to={`./${row.id}`} className="nav-link">
                                            {row.name}
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                            {row.id}
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 Center">
                                            {row.created_at}
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
export default Applications;