import React from "react";
import HomeCard from "./HomeCard";
const HomeCardsSection = ({Admins , Members , Forms})=>{
    
    return(
        <section className="HomeCardsSection">
            <div className="container">
                <div className="row">
                    <HomeCard 
                        isAdmins={false}
                        title={'FORMS'}
                        number={Forms}
                        link={'applications'}
                    />
                    <HomeCard 
                        isAdmins={true}
                        title={'ADMINS'}
                        number={Admins}
                        link={'admins'}
                    />
                    <HomeCard 
                        isAdmins={false}
                        title={"MEMBERS"}
                        number={Members}
                        link={'members'}
                    />
                </div>
            </div>
        </section>
    );
}
export default HomeCardsSection;