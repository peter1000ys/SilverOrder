import "../styles/OrderstatePage.css";
import { useState, useEffect } from "react";
import usePurchaseStore from "../stores/purchase";
import useOrderStore from "../stores/order";
import useWebSocketStore from "../stores/websocket";

const OrderstatePage = () => {
  const [orderInfo, setOrderInfo] = useState({});
  const { lastOrderId } = usePurchaseStore();
  const { fetchLastOrderInfo } = useOrderStore();

  const { nowOrderStatus } = useWebSocketStore();

  useEffect(() => {
    if (nowOrderStatus) {
      console.log("주문 상태 변경 감지:", nowOrderStatus);
      // 새로고침 대신 orderInfo를 업데이트
      setOrderInfo((prevOrderInfo) => ({
        ...prevOrderInfo,
        orderStatus: nowOrderStatus,
      }));
    }
  }, [nowOrderStatus]); // nowOrderStatus가 변경될 때마다 실행

  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        const response = await fetchLastOrderInfo(lastOrderId);
        if (response) {
          setOrderInfo(response);
        } else {
          console.error("로딩 에러 발생");
        }
      } catch (error) {
        console.error("최근 주문내역 불러오기 실패:", error);
      }
    };

    fetchLastOrder(lastOrderId);
  }, [fetchLastOrderInfo, setOrderInfo]);

  // 주문 상태에 따른 메시지 및 진행 상태 바 비율 설정
  const getStatusMessage = () => {
    switch (orderInfo.orderStatus) {
      case "ORDER_IN":
        return "주문이 접수되었습니다.";
      case "ORDER_IN_PROGRESS":
        return "주문이 준비 중입니다.";
      case "ORDER_DONE":
        return "주문이 완료되었습니다.";
      default:
        return "";
    }
  };

  // 진행 상태 바의 채워진 비율을 계산하는 함수
  const getProgressBarWidth = () => {
    switch (orderInfo.orderStatus) {
      case "ORDER_IN":
        return "10%";
      case "ORDER_IN_PROGRESS":
        return "50%";
      case "ORDER_DONE":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <div className="orderstate-container">
      <p className="orderstate-title">내 주문 현황</p>

      {/* 주문 내역이 있을 때만 상세 정보와 상태 표시 */}
      {orderInfo.menuList && orderInfo.menuList.length > 0 ? (
        <>
          {/* 내 주문 상세 정보 */}
          <div className="orderstate-order-info">
            {orderInfo.menuList.map((menu) => (
              <div key={menu.orderMenuId} className="orderstate-menu-item">
                <div className="orderstate-menu-name">
                  <p>{menu.menuName}</p>
                </div>
                {/* 옵션 정보를 한 줄로 표시, 옵션이 없는 경우 '옵션 X' 표시 */}
                <div className="orderstate-menu-options">
                  <p>
                    {menu.optionList && menu.optionList.length > 0
                      ? `옵션: ${menu.optionList
                          .map((option) => option.optionName)
                          .join(", ")}`
                      : "옵션: X"}
                  </p>
                </div>
                <div className="orderstate-menu-price">
                  <p>{menu.menuPrice}원</p>
                </div>
              </div>
            ))}
          </div>

          {/* 현재 내 주문 상태 */}
          <div className="orderstate-now-state">
            <div className="orderstate-progress-bar-container">
              <div
                className="orderstate-progress-bar"
                style={{ width: getProgressBarWidth() }}
              ></div>
            </div>
            <p className="orderstate-progress-text">{getStatusMessage()}</p>
          </div>
        </>
      ) : (
        <p className="orderstate-menu-none">주문 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default OrderstatePage;
