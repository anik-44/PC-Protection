import React from "react";
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip,} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Chart = ({data}) => {
    const chartData = {
        labels: data.map((d) => d.timestamp.split(' ')[1]), datasets: [{
            label: 'CPU Usage (%)',
            data: data.map((d) => d.cpu),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
        }, {
            label: 'Memory Usage (GB)',
            data: data.map((d) => d.memory),
            borderColor: 'rgba(255,99,132,1)',
            backgroundColor: 'rgba(255,99,132,0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
        },],
    };

    const chartOptions = {
        responsive: true, maintainAspectRatio: false, scales: {
            y: {
                min: 0, max: 100,
                grid: {color: 'rgba(255,255,255,0.1)'}, ticks: {color: '#ccc'},
            }, x: {
                grid: {color: 'rgba(255,255,255,0.05)'}, ticks: {color: '#ccc'},
            },
        }, plugins: {legend: {labels: {color: '#fff'}}},
    }

    return (<div
        className="bg-gray-800/70 backdrop-blur rounded-2xl shadow-xl p-6 border border-gray-700 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400 text-center">System Metrics</h2>
        <div className="h-96 w-11/12">
            <Line data={chartData} options={chartOptions}/>
        </div>
    </div>)
}

export default Chart;
