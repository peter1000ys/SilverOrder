import "./styles/MyOrders.css";
import { useState, useEffect } from "react";
import OrderDetailInfo from "../OrderCard/OrderDetailInfo";
import CheckReview from "../OrderCard/CheckReview";
import useOrderStore from "../../stores/order";

const MyOrders = () => {
  const [isModalOpen01, setIsModalOpen01] = useState(false);
  const [isModalOpen02, setIsModalOpen02] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(0);
  const { fetchBeforeOrderList } = useOrderStore();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await fetchBeforeOrderList();
        if (response) {
          setOrderList(response);
        } else {
          console.error("로딩 에러 발생");
        }
      } catch (error) {
        console.error("지난 주문 내역 불러오기 실패:", error);
      }
    };

    fetchOrderList();
  }, [fetchBeforeOrderList, setOrderList]);

  const openDetailInfo = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalOpen01(true); // 주문정보 모달 열기
  };

  const closeDetailInfo = () => {
    setIsModalOpen01(false); // 주문정보 모달 닫기
    setCurrentOrderId(0);
  };

  const openReviewModal = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalOpen02(true); // 리뷰 작성 모달 열기
  };

  const closeReviewModal = () => {
    setIsModalOpen02(false); // 리뷰 작성 모달 닫기
    setCurrentOrderId(0);
  };

  return (
    <div className="myorders-container">
      {orderList.map((order) => (
        <div key={order.orderId} className="myorders-order-item">
          <div className="myorders-order-date">
            <p>{order.orderDate}</p>
          </div>
          <div className="myorders-order-store">
            <p>{order.storeName}</p>
          </div>
          <div className="myorders-info-btns">
            <button
              className="myorders-detail-btn"
              onClick={() => openDetailInfo(order.orderId)}
            >
              주문정보
            </button>
            <button
              className="myorders-review-btn"
              onClick={() => openReviewModal(order.orderId)}
            >
              리뷰쓰기
            </button>
          </div>
          <div className="myorders-order-price">
            <p>{order.totalPrice}원</p>
          </div>
        </div>
      ))}

      {isModalOpen01 && (
        <OrderDetailInfo orderId={currentOrderId} onClose={closeDetailInfo} />
      )}
      {isModalOpen02 && (
        <CheckReview orderId={currentOrderId} onClose={closeReviewModal} />
      )}
    </div>
  );
};

export default MyOrders;
