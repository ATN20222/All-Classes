import React, { useEffect, useState } from "react";
import './Home.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

import HomeCardsSection from "../../Components/Home/HomeCardsSection";
import { HomeServices } from "../../Services/Api";

// Register chart elements
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend);

const Home = () => {
    const [forms, setForms]= useState(0);
    const [admins, setAdmins]= useState(0);
    const [members, setMembers]= useState(0);
    const [membersChartLables , setMembersChartLables] = useState([]);
    const [rewardsChartLables , setrewardsChartLables] = useState([]);
    const [membersCounts , setMembersCounts] = useState([]);
    const [rewardsCounts , setRewardsCounts] = useState([]);

    useEffect(() => {
        getData();
    }, []); 

    async function getData() {
        try {
            const response = await HomeServices.ListCommunity();
            setAdmins(response.content.admins);
            setForms(response.content.forms);
            setMembers(response.content.members);

            const MemLabels = response.content.membersChart.map(item => formatMonthYear(item.year, item.month));
            const MemCounts = response.content.membersChart.map(item => item.count);
            setMembersChartLables(MemLabels.reverse());
            setMembersCounts(MemCounts.reverse());
            const RewLabels = response.content.rwwardsChart.map(item => formatMonthYear(item.year, item.month));
            const RewCounts = response.content.rwwardsChart.map(item => item.count);
            setrewardsChartLables(RewLabels.reverse());
            setRewardsCounts(RewCounts.reverse());
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

    const RewardsData = {

        labels: rewardsChartLables,
        datasets: [
            {
                label:'Rewards',
                data: rewardsCounts, 
                fill: false,
                backgroundColor: '#124985',
                borderColor: '#124985',
                tension: 0.1,
            },
        ],
    };

    const MembersData = {
        labels: membersChartLables,
        datasets: [
            {
                label:'Members',
                data: membersCounts, 
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
                <HomeCardsSection Admins={admins} Members={members} Forms={forms} />

                <div className="container">
                    <div className="row ChartsRow">
                        <div className="col-lg-6">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={RewardsData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={MembersData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
