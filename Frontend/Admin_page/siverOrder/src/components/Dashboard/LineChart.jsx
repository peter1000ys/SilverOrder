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

const LineChart = ({ title, data }) => {
    // 오늘 날짜 기준으로 7일 전까지의 날짜 생성
    const generateDateLabels = () => {
        const labels = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            labels.push(formattedDate);
        }
        return labels;
    };

    const labels = generateDateLabels();

    // 매출 데이터와 날짜 매칭
    const mapSalesDataToLabels = (labels, data) => {
        if (!data || data.length === 0) {
            console.log("데이터가 없습니다.");
        } else {
            console.log("매출 데이터:", data);
        }
        
        const salesMap = labels.map(label => {
            const found = data.find(item => item.procDate === label);
            return found ? found.procDailySales : 0; // 해당 날짜에 데이터가 없으면 0
        });
        return salesMap;
    };

    const salesData = mapSalesDataToLabels(labels, data);

    const lineChartData = {
        labels: labels.map(label => {
            const date = new Date(label);
            return `${date.getMonth() + 1}월 ${date.getDate()}일`;
        }),  // 7일간의 날짜 라벨
        datasets: [
            {
                label: '매출액',
                data: salesData, // 매출액 데이터
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
