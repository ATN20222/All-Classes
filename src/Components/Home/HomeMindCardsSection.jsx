import React from "react";
import HomeCard from "./HomeCard";
import HomeCardMind from "./HomeCardMind";
const HomeMindCardsSection = ({Communities , Admins})=>{
    return(
        <section className="HomeCardsSection">
            <div className="container">
                <div className="row">
                    <HomeCardMind
                        isAdmins={false}
                        title={'Communities'}
                        number={Communities}
                        link={'communities'}
                    />
                    <HomeCardMind 
                        isAdmins={true}
                        title={"Admins"}
                        number={Admins}
                        link={'admins'}
                    />
                    
                </div>
            </div>
        </section>
    );
}
export default HomeMindCardsSection;