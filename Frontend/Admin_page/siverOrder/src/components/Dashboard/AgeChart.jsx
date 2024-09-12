import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './AgeChart.css';

// Chart.js에 사용할 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const ageGroupData = {
  '10대': {
    labels: ['아이스티', '콜라', '오렌지주스', '레몬에이드', '딸기주스'],
    data: [300, 250, 200, 150, 100],
  },
  '20대': {
    labels: ['아메리카노', '딸기주스', '카푸치노', '카라멜마키아토', '아이스티'],
    data: [700, 500, 500, 400, 300],
  },
  '30대': {
    labels: ['카페라떼', '카푸치노', '아메리카노', '에스프레소', '모카'],
    data: [600, 550, 450, 400, 350],
  },
  '40대': {
    labels: ['아메리카노', '카페라떼', '아이스티', '에스프레소', '카푸치노'],
    data: [800, 600, 550, 400, 300],
  },
  '50대': {
    labels: ['아메리카노', '아이스티', '카페라떼', '에스프레소', '모카'],
    data: [900, 700, 600, 500, 400],
  },
};

const AgeChart = ({ title }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('20대'); // 기본 연령대는 '20대'

  // 선택된 연령대에 따라 데이터를 가져옴
  const selectedData = ageGroupData[selectedAgeGroup];

  const barChartData = {
    labels: selectedData.labels,
    datasets: [
      {
        label: '판매량',
        data: selectedData.data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y', // 이 부분이 가로 막대 그래프를 만듭니다.
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

  // 연령대 선택 핸들러
  const handleAgeGroupChange = (event) => {
    setSelectedAgeGroup(event.target.value);
  };

  return (
    <div className="chart-box">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="age-toggle">
          <label htmlFor="age-group">연령대 선택: </label>
          <select id="age-group" value={selectedAgeGroup} onChange={handleAgeGroupChange}>
            {Object.keys(ageGroupData).map((ageGroup) => (
              <option key={ageGroup} value={ageGroup}>
                {ageGroup}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="chart">
        <Bar data={barChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AgeChart;
