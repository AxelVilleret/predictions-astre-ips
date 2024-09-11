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

export default function BarChartComponent({ data }) {
    

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Prédictions',
            },
        },
    };

    const formattedData = {
        labels : data.map((entry) => entry.student_number),
        datasets: [
            {
                label: 'IPS',
                data: data.map((data) => (data.value >= 0 ? data.value : null)),
                backgroundColor: 'rgba(187, 99, 132, 0.5)',
            },
            {
                label: 'ASTRE',
                data: data.map((data) => (data.value < 0 ? data.value : null)),
                backgroundColor: 'rgba(255, 128, 132, 0.5)',
            },
        ],
    };

    return (
        <Bar options={options} data={formattedData} />
        );
}