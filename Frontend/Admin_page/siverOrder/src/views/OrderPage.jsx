import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import OrderTabs from '../components/Order/OrderTabs';
import OrderList from '../components/Order/OrderList';
import OrderDetail from '../components/Order/OrderDetail';
import '../styles/OrderPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderPage = () => {
  const [selectedTab, setSelectedTab] = useState('대기'); // 현재 선택된 탭
  const [selectedOrder, setSelectedOrder] = useState(null); // 선택된 주문

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedOrder(null); // 탭이 바뀔 때 선택된 주문 초기화
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetail = () => {
    setSelectedOrder(null); // 상세 페이지 닫기
  };

  return (
    <div className='order'>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <OrderTabs selectedTab={selectedTab} onTabChange={handleTabChange} />
          <div className="col-lg-8 col-md-8 col-sm-12">
            <OrderList selectedTab={selectedTab} onOrderSelect={handleOrderSelect} />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            {selectedOrder && (
              <OrderDetail order={selectedOrder} onClose={handleCloseOrderDetail} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
