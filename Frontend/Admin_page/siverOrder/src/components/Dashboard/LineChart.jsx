import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import './LineChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = ({ title }) => {
    // 오늘 날짜 기준으로 7일 전까지의 날짜 생성
    const generateDateLabels = () => {
        const labels = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`; // 월은 0부터 시작하므로 +1
            labels.push(formattedDate);
        }
        return labels;
    };

    // 더미 데이터
    const lineChartData = {
        labels: generateDateLabels(),  // 7일간의 날짜 라벨
        datasets: [
            {
                label: '매출액',
                data: [1200, 900, 1000, 1100, 1500, 1400, 1800], // 매출액 데이터
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
