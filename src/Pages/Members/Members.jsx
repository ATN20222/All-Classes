import React from "react";
import './Members.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
const Members = ()=>{
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
    return(
        <div className="MainContent Applications">
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle PageTitleSecondary">
                        Members
                    </div>
                    <div className="PageSearch">
                        <input type="text" placeholder="Search" />
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                </div>
                
                <div className="TableContainer container">
                    <div className="row">
                        {data.map((row)=>(
                            <div className="col-lg-12 TableRecord" key={row.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-5 col-sm-5 col-5 Center">
                                            {row.name}
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4  Center">
                                            {row.id}
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">
                                            <div className="Delete">
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
export default Members;