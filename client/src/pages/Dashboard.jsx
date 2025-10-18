import React, {useEffect, useState} from 'react';
import {mappedData} from "../utils/helper.js";
import StatusCard from "../components/StatusCard.jsx";
import Chart from "../components/Chart.jsx";
import MetricTable from "../components/MetricTable.jsx";
import {baseUrl} from "../../constants.js";

function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/analytics?limit=10`);
                const result = await res.json();
                const formatedData = mappedData(result);
                setData(formatedData);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-8">
            {/*Header*/}
            <div className="w-full max-w-6xl space-y-10">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-2">🛡️ PC Protection Dashboard</h1>
                    <p className="text-gray-400">Real-time system health and security monitoring</p>
                </div>

                {/*Status*/}
                <StatusCard data={data}/>

                {/*Chart Section*/}
                <Chart data={data}/>

                {/*Table Section*/}
                <MetricTable data={data}/>

            </div>
        </div>
    );
}

export default Dashboard;