import "./styles/OrderDetailInfo.css";
import { useState, useEffect } from "react";
import useOrderStore from "../../stores/order";

const OrderDetailInfo = ({ orderId, onClose }) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const { fetchBeforeOrderDetail } = useOrderStore();

  useEffect(() => {
    const fetchOrderDetail = async (orderId) => {
      try {
        const response = await fetchBeforeOrderDetail(orderId);
        if (response) {
          setOrderDetail(response);
        } else {
          console.error("로딩 에러 발생");
        }
      } catch (error) {
        console.error("주문 내역 상세 불러오기 실패:", error);
      }
    };

    fetchOrderDetail(orderId);
  }, [fetchBeforeOrderDetail, setOrderDetail]);

  return (
    <div className="orderdetail-overlay">
      <div className="orderdetail-container">
        <p className="orderdetail-title">상세 정보</p>

        <div className="orderdetail-item-box">
          {orderDetail.map((order) => (
            <div key={order.orderMenuId} className="orderdetail-item">
              <div className="orderdetail-name">
                <p>
                  {order.menuName} ({order.menuAmount}잔)
                </p>
              </div>
              <div className="orderdetail-info">
                <div className="orderdetail-options">
                  {order.optionCount === 0 ? (
                    <p>옵션: X</p>
                  ) : (
                    <p>
                      옵션: {/* 띄어쓰기를 위해 {" "}를 넣어줌 */}
                      {order.optionList
                        .map((option) => option.optionName)
                        .join(", ")}
                    </p>
                  )}
                </div>
                <div className="orderdetail-price">
                  <p>{order.menuPrice}원</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="orderdetail-close-btn" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
