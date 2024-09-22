import React from "react";
import './Home.css'
import HomeCardsSection from "../../Components/Home/HomeCardsSection";
const Home = ()=>{
    return(
        <div className="MainContent">
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle">
                        Home
                    </div>
                </div>
                <HomeCardsSection/>
            </div>

        </div>
    );
}
export default Home;