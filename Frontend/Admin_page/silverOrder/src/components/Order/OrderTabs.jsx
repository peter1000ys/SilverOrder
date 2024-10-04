import React from 'react';
import './styles/OrderTabs.css'
const OrderTabs = ({ selectedTab, onTabChange }) => {
  return (
    <div className="order-tabs">
      <button onClick={() => onTabChange('대기')} className={selectedTab === '대기' ? 'active' : ''}>대기</button>
      <button onClick={() => onTabChange('처리 중')} className={selectedTab === '처리 중' ? 'active' : ''}>처리 중</button>
      <button onClick={() => onTabChange('완료')} className={selectedTab === '완료' ? 'active' : ''}>완료</button>
    </div>
  );
};

export default OrderTabs;
