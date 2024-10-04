import React from 'react';
import './DashboardStats.css';

const DashboardStats = ({ title, value }) => {
    return (
        <div className="stat-box">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};

export default DashboardStats;
