import React, { useEffect, useState } from "react";
import './Home.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

import HomeCardsSection from "../../Components/Home/HomeCardsSection";
import { HomeServices, MindHomeServices } from "../../Services/Api";
import HomeMindCardsSection from "../../Components/Home/HomeMindCardsSection";

// Register chart elements
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend);

const HomeMind = () => {
    const [admins, setAdmins]= useState('');
    const [communities, setCommunities]= useState('');
    const [suppliersChartLables , setSuppliersChartLables] = useState([]);
    const [offersChartLables , setOffersChartLables] = useState([]);
    const [offersCounts , setOffersCounts] = useState([]);
    const [suppliersCounts , setSuppliersCounts] = useState([]);

    useEffect(() => {
        getData();
    }, []); 

    async function getData() {
        try {
            const response = await MindHomeServices.ListCommunity();
            setAdmins(response.admins);
            setCommunities(response.communities);
            const offersLables = response.offers.map(item => formatMonthYear(item.year, item.month));
            const OffersCounts = response.offers.map(item => item.count);
            setOffersChartLables(offersLables.reverse());
            setOffersCounts(OffersCounts.reverse());
            const SuppLabels = response.suppliers.map(item => formatMonthYear(item.year, item.month));
            const SuppCounts = response.suppliers.map(item => item.count);

            console.log(SuppCounts,SuppLabels,OffersCounts,offersLables)
            setSuppliersChartLables(SuppLabels.reverse());
            setSuppliersCounts(SuppCounts.reverse());
        } catch (error) {
            console.error(error);
        }
    }


    const formatMonthYear = (year, month) => {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return `${monthNames[month - 1]} ${year}`;
    };
    

    
    const chartOptions = {
        maintainAspectRatio: false, 
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        layout: {
            padding: 20, 
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const SuppliersData = {

        labels: suppliersChartLables,
        datasets: [
            {
                label:'Suppliers',
                data: suppliersCounts, 
                fill: false,
                backgroundColor: '#124985',
                borderColor: '#124985',
                tension: 0.1,
            },
        ],
    };

    const OffersData = {
        labels: offersChartLables,
        datasets: [
            {
                label:'Offers',
                data: offersCounts, 
                fill: false,
                backgroundColor: '#124985',
                borderColor: '#124985',
                tension: 0.1,
            },
        ],
    };
    return (
        <div className="MainContent">
            <div className="container">
                <div className="PageHeader">
                    <div className="PageTitle">
                        Home
                    </div>
                </div>
                <HomeMindCardsSection Offers={offersCounts.length} Communities={communities}/>

                <div className="container">
                    <div className="row ChartsRow">
                        <div className="col-lg-6">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={OffersData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={SuppliersData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeMind;
