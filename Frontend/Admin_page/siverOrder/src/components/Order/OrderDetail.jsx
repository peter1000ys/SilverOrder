import React, { useState } from 'react';
import './styles/OrderDetail.css';
import OrderModal from '../Modal/OrderModal';
import useOrderStore from '../../stores/order'; // changeOrderState를 가져오기 위해 import

const OrderDetail = ({ order, onClose }) => { // onClose 함수 추가
  const { changeOrderState } = useOrderStore(); // 상태 변경 함수를 가져옴
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // 주문 상태에 따른 버튼 렌더링
  const renderButtons = () => {
    switch (order.orderStatus) {
      case 'ORDER_IN_PROGRESS': // 처리 중일 때는 완료 버튼만 보이게 설정
        return (
          <div className="action-buttons">
            <button className="complete" onClick={() => changeOrderState(order.orderId, 'ORDER_DONE')}>
              완료
            </button>
          </div>
        );
      case 'ORDER_DONE': // 완료된 상태에서는 버튼을 숨김
        return null;
      default: // 대기 중일 때는 수락과 취소 버튼을 표시
        return (
          <div className="action-buttons">
            <button className="accept" onClick={() => changeOrderState(order.orderId, 'ORDER_IN_PROGRESS')}>
              수락
            </button>
            <button className="cancel" onClick={() => changeOrderState(order.orderId, 'ORDER_DENIED')}>
              취소
            </button>
          </div>
        );
    }
  };

  return (
    <div className="order-detail">
      <div className="order-header">
        <h3>주문 번호: {order.orderId}</h3>
        <h4 className='order-status'>
          {order.orderStatus === 'ORDER_IN' && '대기중'}
          {order.orderStatus === 'ORDER_IN_PROGRESS' && '처리 중'}
          {order.orderStatus === 'ORDER_DONE' && '완료'}
        </h4>
      </div>
      <div className="order-detail-content">
        <table>
          <thead>
            <tr>
              <th>메뉴</th>
              <th>수량</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {order.menuList.map((item, index) => (
              <tr key={index} onClick={() => handleItemClick(item)}>
                <td>{item.menuName}</td>
                <td>{item.menuAmount}</td>
                <td>{item.menuPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-and-buttons">
        <p className="total-amount">합계: <span>{order.totalPrice}원</span></p>
        {renderButtons()}
      </div>
      <OrderModal isOpen={!!selectedItem} onClose={closeModal}>
        <h3>{selectedItem?.menuName}</h3>
        <p>수량: {selectedItem?.menuAmount}</p>
        <p>금액: {selectedItem?.menuPrice}</p>
        <p>옵션:</p>
        <ul>
          {/* optionList가 null이 아니면 사용, null이면 빈 배열로 처리 */}
          {selectedItem?.optionList && selectedItem.optionList.length > 0 ? (
            selectedItem.optionList.map((option, idx) => (
              <li key={idx}>{option.optionName}</li>
            ))
          ) : (
            <li>옵션 없음</li>
          )}
        </ul>
      </OrderModal>
    </div>
  );
};

export default OrderDetail;
