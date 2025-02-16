import React from "react";
import HomeCard from "./HomeCard";
import HomeCardMind from "./HomeCardMind";
const HomeMindCardsSection = ({Communities , Offers})=>{
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
                        title={"Offers"}
                        number={Offers}
                        link={'Offers'}
                    />
                    
                </div>
            </div>
        </section>
    );
}
export default HomeMindCardsSection;