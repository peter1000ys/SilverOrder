import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './LineChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

const LineChart = ({ title }) => {
    // 더미 데이터
    const lineChartData = {
        labels: ['3월', '4월', '5월', '6월', '7월', '8월'],
        datasets: [
            {
                label: '매출액',
                data: [1200, 900, 1000, 1100, 1500, 400],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (
        <div className="chart-box">
            <h3>{title}</h3>
            <div className="chart">
                <Line data={lineChartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default LineChart;
