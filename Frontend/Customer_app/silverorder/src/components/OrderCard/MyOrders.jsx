import "./styles/MyOrders.css";
import { useState } from "react";
import OrderDetailInfo from "../OrderCard/OrderDetailInfo";
import CheckReview from "../OrderCard/CheckReview";

const MyOrders = () => {
  const [isModalOpen01, setIsModalOpen01] = useState(false);
  const [isModalOpen02, setIsModalOpen02] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(0);

  const DummyOrderList = [
    {
      orderId: 5,
      storeId: 1799,
      storeName: "메가커피 싸피점",
      paymentId: 2,
      cardName: "SSAFY 스마일카드",
      totalPrice: 9500,
      orderDate: "2024-09-25",
      orderStatus: "ORDER_DONE",
    },
    {
      orderId: 6,
      storeId: 1799,
      storeName: "메가커피 싸피점",
      paymentId: 2,
      cardName: "SSAFY 스마일카드",
      totalPrice: 9500,
      orderDate: "2024-09-26",
      orderStatus: "ORDER_DONE",
    },
    {
      orderId: 7,
      storeId: 1799,
      storeName: "메가커피 싸피점",
      paymentId: 2,
      cardName: "SSAFY 스마일카드",
      totalPrice: 9500,
      orderDate: "2024-09-27",
      orderStatus: "ORDER_IN",
    },
  ];

  const openDetailInfo = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalOpen01(true); // 주문정보 모달 열기
  };

  const closeDetailInfo = () => {
    setIsModalOpen01(false); // 주문정보 모달 닫기
    setCurrentOrderId(0);
  };

  const openReviewModal = (orderId) => {
    console.log("openReviewModal triggered for order:", orderId); // 상태 확인용 콘솔 로그
    setCurrentOrderId(orderId);
    setIsModalOpen02(true); // 리뷰 작성 모달 열기
    console.log("isModalOpen02:", isModalOpen02); // 상태 확인용 콘솔 로그
  };

  const closeReviewModal = () => {
    setIsModalOpen02(false); // 리뷰 작성 모달 닫기
    setCurrentOrderId(0);
  };

  return (
    <div className="myorders-container">
      {DummyOrderList.map((order) => (
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
