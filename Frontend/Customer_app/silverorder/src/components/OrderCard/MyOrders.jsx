import "./styles/MyOrders.css";
import { useState, useEffect } from "react";
import OrderDetailInfo from "../OrderCard/OrderDetailInfo";
import CheckReview from "../OrderCard/CheckReview";
import WatchReview from "./WatchReview";
import useOrderStore from "../../stores/order";
import useReviewStore from "../../stores/review";

const MyOrders = () => {
  const [isModalOpen01, setIsModalOpen01] = useState(false); // 주문 정보 modal 상태
  const [isModalOpen02, setIsModalOpen02] = useState(false); // 리뷰 작성 modal 상태
  const [isModalOpen03, setIsModalOpen03] = useState(false); // 리뷰 확인 modal 상태
  const [currentOrderId, setCurrentOrderId] = useState(0);
  const { fetchBeforeOrderList } = useOrderStore();
  const { fetchAllMyReviews } = useReviewStore();
  const [orderList, setOrderList] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await fetchBeforeOrderList();
        if (response) {
          setOrderList(response);
        } else {
          console.error("주문 로딩 에러 발생");
        }
      } catch (error) {
        console.error("지난 주문 내역 불러오기 실패:", error);
      }
    };

    const fetchReviewList = async () => {
      try {
        const response = await fetchAllMyReviews();
        if (response) {
          setReviews(response);
        } else {
          console.error("리뷰 로딩 에러 발생");
        }
      } catch (error) {
        console.error("내 모든 리뷰 불러오기 실패:", error);
      }
    };

    fetchOrderList();
    fetchReviewList();
  }, [fetchBeforeOrderList, setOrderList, fetchAllMyReviews, setReviews]);

  const openDetailInfo = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalOpen01(true); // 주문정보 모달 열기
  };

  const closeDetailInfo = () => {
    setIsModalOpen01(false); // 주문정보 모달 닫기
    setCurrentOrderId(0);
  };

  const openCheckReviewModal = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalOpen02(true); // 리뷰 작성 모달 열기
  };

  const closeCheckReviewModal = () => {
    setIsModalOpen02(false); // 리뷰 작성 모달 닫기
    setCurrentOrderId(0);
  };

  const openWatchReviewModal = (orderId) => {
    setCurrentOrderId(orderId);
    setIsModalOpen03(true); // 리뷰 확인 모달 열기
  };

  const closeWatchReviewModal = () => {
    setIsModalOpen03(false); // 리뷰 확인 모달 닫기
    setCurrentOrderId(0);
  };

  // 해당 orderId로 작성된 리뷰가 있는지 확인
  const hasReview = (orderId) => {
    return reviews.some((review) => review.orderId === orderId);
  };

  return (
    <div className="myorders-container">
      {orderList.length === 0 ? (
        <p className="myorders-no-orders">주문 내역이 존재하지 않습니다.</p>
      ) : (
        orderList.map((order) => (
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
              {order.orderStatus === "ORDER_DONE" ? (
                hasReview(order.orderId) ? (
                  <button
                    className="myorders-review-btn01"
                    onClick={() => openWatchReviewModal(order.orderId)}
                  >
                    리뷰보기
                  </button>
                ) : (
                  <button
                    className="myorders-review-btn02"
                    onClick={() => openCheckReviewModal(order.orderId)}
                  >
                    리뷰쓰기
                  </button>
                )
              ) : (
                <button className="myorders-incomplete-btn">주문 미완료</button>
              )}
            </div>
            <div className="myorders-order-price">
              <p>{order.totalPrice}원</p>
            </div>
          </div>
        ))
      )}

      {isModalOpen01 && (
        <OrderDetailInfo orderId={currentOrderId} onClose={closeDetailInfo} />
      )}
      {isModalOpen02 && (
        <CheckReview orderId={currentOrderId} onClose={closeCheckReviewModal} />
      )}
      {isModalOpen03 && (
        <WatchReview orderId={currentOrderId} onClose={closeWatchReviewModal} />
      )}
    </div>
  );
};

export default MyOrders;
