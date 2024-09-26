import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import DashboardStats from '../components/Dashboard/DashboardStats';
import AgeChart from '../components/Dashboard/AgeChart';
import LineChart from '../components/Dashboard/LineChart';
import '../styles/DashboardPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useInfoStore from "../stores/infos";


const DashboardPage = () => {
    const { sendStoreIdRequest } = useInfoStore();
    const { userInfo } = useInfoStore();
    useEffect(() => {
        console.log(userInfo);

      }, []);
      

    return (
        <div className="dashboard">
            <Navbar />
            <div className="container-fluid">
                {/* stats-section */}
                <div className="row stats-section">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats title="일매출" value="194,000" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats title="최근 7일간 매출" value="194,000" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats title="월매출" value="258,890" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                        <DashboardStats title="년매출" value="258,890" />
                    </div>
                </div>

                {/* charts-section */}
                <div className="row charts-section">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                        <LineChart title="이번 주 일별 매출총액" />
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
