import "../styles/OrderstatePage.css";

const OrderstatePage = () => {
  const DummyState = {
    storeId: 1,
    totalPrice: 4000,
    paymentId: 1,
    orderDate: "2024-09-24",
    require: "요청 사항",
    orderStatus: "ORDER_ACCEPTED",
    menulist: [
      {
        menuId: 1,
        menuName: "아메리카노",
        menuAmount: 1,
        menuPrice: 1500,
        optionList: null,
      },
      {
        menuId: 1,
        menuName: "아메리카노",
        menuAmount: 1,
        menuPrice: 2500,
        optionList: [
          { optionId: 3, optionName: "샷 1개 추가" },
          { optionId: 5, optionName: "사이즈 업" },
        ],
      },
    ],
  };

  // 주문 상태에 따른 메시지 및 진행 상태 바 비율 설정
  const getStatusMessage = () => {
    switch (DummyState.orderStatus) {
      case "ORDER_IN":
        return "주문이 접수되길 기다리고 있습니다.";
      case "ORDER_ACCEPTED":
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
    switch (DummyState.orderStatus) {
      case "ORDER_ACCEPTED":
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

      {/* 내 주문 상세 정보 */}
      <div className="orderstate-order-info">
        {DummyState.menulist.map((menu, index) => (
          <div key={index} className="orderstate-menu-item">
            <div className="orderstate-menu-name">
              <p>{menu.menuName}</p>
            </div>
            {/* 옵션 정보를 한 줄로 표시, 옵션이 없는 경우 '옵션 X' 표시 */}
            <div className="orderstate-menu-options">
              <p>
                {menu.optionList
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
        {/* 주문 상태에 따른 메시지 출력 */}
        {DummyState.orderStatus === "ORDER_IN" ? (
          <p className="orderstate-progress-text">{getStatusMessage()}</p>
        ) : (
          <>
            <div className="orderstate-progress-bar-container">
              {/* 진행 상황을 보여주는 바 */}
              <div
                className="orderstate-progress-bar"
                style={{ width: getProgressBarWidth() }}
              ></div>
            </div>
            <p className="orderstate-progress-text">{getStatusMessage()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderstatePage;
