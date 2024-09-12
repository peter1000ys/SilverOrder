import React, { useState, useEffect } from 'react';
import './styles/OrderList.css';

const OrderList = ({ selectedTab, onOrderSelect }) => {
  const orders = [
    { id: '0003', date: '2024.09.03 14:03:00', amount: 12000, status: '대기', items: [{ name: '샤인머스캣그린주스', price: 6000 }, { name: '레드오렌지자몽주스', price: 6000 }] },
    { id: '0002', date: '2024.09.03 12:33:00', amount: 6000, status: '대기', items: [{ name: '샤인머스캣그린주스', price: 6000 }] },
    { id: '0001', date: '2024.09.03 11:32:00', amount: 2500, status: '대기', items: [{ name: '아이스티', price: 2500 }] },
    { id: '0004', date: '2024.09.04 10:15:00', amount: 8500, status: '대기', items: [{ name: '블루베리 스무디', price: 4500 }, { name: '오렌지 주스', price: 4000 }] },
    { id: '0005', date: '2024.09.04 09:50:00', amount: 7000, status: '대기', items: [{ name: '모카 커피', price: 3500 }, { name: '에스프레소', price: 3500 }] },
    { id: '0006', date: '2024.09.04 15:45:00', amount: 4500, status: '대기', items: [{ name: '레몬에이드', price: 4500 }] },
    { id: '0007', date: '2024.09.05 14:25:00', amount: 6500, status: '대기', items: [{ name: '카페 라떼', price: 3500 }, { name: '바닐라 라떼', price: 3000 }] },
    { id: '0008', date: '2024.09.05 16:42:00', amount: 3000, status: '대기', items: [{ name: '아메리카노', price: 3000 }] },
    { id: '0009', date: '2024.09.05 17:01:00', amount: 9000, status: '완료', items: [{ name: '망고 스무디', price: 4500 }, { name: '바나나 스무디', price: 4500 }] },
    { id: '0010', date: '2024.09.06 08:20:00', amount: 5500, status: '대기', items: [{ name: '핫 초콜릿', price: 3000 }, { name: '카푸치노', price: 2500 }] },
    { id: '0011', date: '2024.09.06 08:45:00', amount: 3200, status: '처리 중', items: [{ name: '그린티', price: 3200 }] },
    { id: '0012', date: '2024.09.06 09:10:00', amount: 4300, status: '완료', items: [{ name: '카페 모카', price: 4300 }] },
    { id: '0013', date: '2024.09.06 11:22:00', amount: 7600, status: '대기', items: [{ name: '스트로베리 주스', price: 3800 }, { name: '키위 주스', price: 3800 }] },
    { id: '0014', date: '2024.09.06 13:37:00', amount: 2900, status: '처리 중', items: [{ name: '마키아토', price: 2900 }] },
    { id: '0015', date: '2024.09.06 14:50:00', amount: 5100, status: '완료', items: [{ name: '레몬 티', price: 2600 }, { name: '페퍼민트 티', price: 2500 }] },
    { id: '0016', date: '2024.09.07 10:33:00', amount: 9400, status: '대기', items: [{ name: '플랫 화이트', price: 4700 }, { name: '다크 초콜릿 모카', price: 4700 }] },
    { id: '0017', date: '2024.09.07 12:48:00', amount: 3500, status: '처리 중', items: [{ name: '진저 티', price: 3500 }] },
    { id: '0018', date: '2024.09.07 13:09:00', amount: 6800, status: '완료', items: [{ name: '얼그레이 티', price: 3400 }, { name: '차이 티', price: 3400 }] },
    { id: '0019', date: '2024.09.07 15:20:00', amount: 12000, status: '대기', items: [{ name: '블랙 커피', price: 6000 }, { name: '바닐라 프라푸치노', price: 6000 }] },
    { id: '0020', date: '2024.09.07 17:55:00', amount: 4500, status: '처리 중', items: [{ name: '초콜릿 프라푸치노', price: 4500 }] },
  ];

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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.filter(order => order.status === selectedTab)
                              .slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.filter(order => order.status === selectedTab).length / ordersPerPage);

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
            {currentOrders.map(order => (
              <tr key={order.id} onClick={() => onOrderSelect(order)}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td className='status-text'>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-c">
        <button onClick={prevPage} disabled={currentPage === 1}>&lt;</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>&gt;</button>
      </div>
    </div>
  );
};

export default OrderList;
