import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function BarChartComponent({ title, labels, datas }) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'IPS',
                data: datas.map((data) => (data >= 0 ? data : null)),
                backgroundColor: 'rgba(187, 99, 132, 0.5)',
            },
            {
                label: 'ASTRE',
                data: datas.map((data) => (data < 0 ? data : null)),
                backgroundColor: 'rgba(255, 128, 132, 0.5)',
            },
        ],
    };

    return (
        <div>
            <h2>Prédictions</h2>
            <Bar options={options} data={data} />
        </div>
        );
}