import React from "react";
import HomeCard from "./HomeCard";
const HomeCardsSection = ()=>{
    return(
        <section className="HomeCardsSection">
            <div className="container">
                <div className="row">
                    <HomeCard 
                        isAdmins={false}
                        title={'FORMS'}
                        number={'1,059'}
                        link={'applications'}
                    />
                    <HomeCard 
                        isAdmins={true}
                        title={'ADMINS'}
                        number={'1,059'}
                    />
                    <HomeCard 
                        isAdmins={false}
                        title={'MEMBERS'}
                        number={'1,059'}
                    />
                </div>
            </div>
        </section>
    );
}
export default HomeCardsSection;