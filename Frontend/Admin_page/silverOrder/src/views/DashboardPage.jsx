import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import DashboardStats from '../components/Dashboard/DashboardStats';
import AgeChart from '../components/Dashboard/AgeChart';
import LineChart from '../components/Dashboard/LineChart';
import '../styles/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useInfoStore from "../stores/infos";
import useDashboardStore from '../stores/dashboard'; // 대시보드 상태 관리 스토어

const DashboardPage = () => {
    const { userInfo } = useInfoStore();
    const { fetchDashboardData, dashboardData } = useDashboardStore();
    
    useEffect(() => {
        if (userInfo.storeId) {
            fetchDashboardData(userInfo.storeId); // storeId로 대시보드 데이터 가져오기
        }
    }, [userInfo.storeId, fetchDashboardData]);

    // 값이 0일 경우에도 표시하고, null 또는 undefined일 경우만 로딩 중으로 처리
    const displayValue = (value) => {
        return value !== null && value !== undefined ? value : "로딩 중...";
    };

    return (
        <div className="dashboard">
            <Navbar />
            <div className="container-fluid">
                {/* stats-section */}
                <div className="row stats-section">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats 
                            title="일매출" 
                            value={displayValue(dashboardData?.procSalesDto?.todaySales)} 
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats 
                            title="최근 7일간 매출" 
                            value={displayValue(dashboardData?.procSalesDto?.weekSales)} 
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats 
                            title="월매출" 
                            value={displayValue(dashboardData?.procSalesDto?.monthSales)} 
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats 
                            title="년매출" 
                            value={displayValue(dashboardData?.procSalesDto?.yearSales)} 
                        />
                    </div>
                </div>

                {/* charts-section */}
                <div className="row charts-section">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <LineChart 
                            title="이번 주 일별 매출총액" 
                            data={dashboardData?.procWeekDtoList || []} // 데이터가 없는 경우 빈 배열 전달
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <AgeChart title="연령별 인기 상품 Top 5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
