import React, { useState, useEffect } from 'react';
import './styles/OrderList.css';
import useOrderStore from '../../stores/order';

const OrderList = ({ selectedTab, onOrderSelect }) => {
  const { orders, fetchOrders } = useOrderStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(8);

  // 화면 크기에 따른 ordersPerPage 설정
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setOrdersPerPage(8);
      } else if (width > 768) {
        setOrdersPerPage(13);
      } else {
        setOrdersPerPage(15);
      }
    };

    handleResize(); // 처음 로드될 때 실행
    window.addEventListener('resize', handleResize); // 화면 크기 변경 감지
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 주문 데이터를 처음 로드할 때 fetch
  useEffect(() => {
    fetchOrders(); // 주문 데이터를 fetch
  }, [fetchOrders]);

  // 선택된 탭이 변경되면 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1); // Reset to first page on tab change
  }, [selectedTab]);

  const translateStatus = (status) => {
    switch (status) {
      case 'ORDER_IN':
        return '대기';
      case 'ORDER_IN_PROGRESS':
        return '처리 중';
      case 'ORDER_DONE':
        return '완료';
      default:
        return status;
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // 상태별로 필터링 후 현재 페이지에 해당하는 주문 목록만 표시
  const filteredOrders = orders.filter(
    order => translateStatus(order.orderStatus) === selectedTab
  );
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="order-list">
      <div className="order-list-content">
        <table>
          <thead>
            <tr>
              <th>주문 번호</th>
              <th>주문 날짜</th>
              <th>총합 금액</th>
              <th>주문 상태</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map(order => (
                <tr key={order.orderId} onClick={() => onOrderSelect(order)}>
                  <td>{order.orderId}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.totalPrice}</td>
                  <td className='status-text'>{translateStatus(order.orderStatus)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">해당 상태의 주문이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-c">
        <button onClick={prevPage} disabled={currentPage === 1 || totalPages === 0}>&lt;</button>
        <span>{totalPages > 0 ? `${currentPage} / ${totalPages}` : '0 / 0'}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>&gt;</button>
      </div>
    </div>
  );
};

export default OrderList;
