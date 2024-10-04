import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import './AgeChart.css';
import useDashboardStore from '../../stores/dashboard'; // 연령별 판매 데이터를 가져오는 스토어

// Chart.js에 사용할 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const AgeChart = ({ title }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(20); // 기본 연령대는 '20대'
  const { fetchPopularityByOrder, popularityData } = useDashboardStore(); // 상태와 함수 가져오기

  // 연령대가 변경될 때마다 API를 통해 데이터를 가져옴
  useEffect(() => {
    fetchPopularityByOrder(1799, selectedAgeGroup); // 1799는 storeId 예시, 실제 storeId로 대체
  }, [selectedAgeGroup, fetchPopularityByOrder]);

  // popularityData가 존재하면, labels와 data를 생성
  const labels = popularityData ? popularityData.map(item => item.menuName) : ['데이터 없음'];
  const data = popularityData ? popularityData.map(item => item.amount) : [0];

  const barChartData = {
    labels: labels, // 메뉴 이름
    datasets: [
      {
        label: '판매량',
        data: data, // 판매량 데이터
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y', // 가로 막대 그래프
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
    setSelectedAgeGroup(Number(event.target.value)); // 연령대 숫자로 변환
  };

  return (
    <div className="chart-box">
      <div className="chart-header">
        <h3>{title}</h3>
        <div className="age-toggle">
          <label htmlFor="age-group">연령대 선택: </label>
          <select id="age-group" value={selectedAgeGroup} onChange={handleAgeGroupChange}>
            <option value={10}>10대</option>
            <option value={20}>20대</option>
            <option value={30}>30대</option>
            <option value={40}>40대</option>
            <option value={50}>50대</option>
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
