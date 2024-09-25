import "./styles/OrderDetailInfo.css";

const OrderDetailInfo = ({ orderId, onClose }) => {
  const DummyOrderDetail = [
    {
      orderMenuId: 7,
      menuId: 7,
      menuName: "블랙 밀크티",
      menuAmount: 1,
      menuPrice: 4500,
      optionCount: 1,
      optionList: [
        {
          optionId: 7,
          optionName: "사이즈 업",
        },
      ],
    },
    {
      orderMenuId: 8,
      menuId: 1,
      menuName: "아메리카노",
      menuAmount: 1,
      menuPrice: 1500,
      optionCount: 0,
      optionList: null,
    },
    {
      orderMenuId: 9,
      menuId: 2,
      menuName: "카페라떼",
      menuAmount: 1,
      menuPrice: 3000,
      optionCount: 1,
      optionList: [
        {
          optionId: 7,
          optionName: "사이즈 업",
        },
      ],
    },
    {
      orderMenuId: 10,
      menuId: 2,
      menuName: "카페라떼",
      menuAmount: 1,
      menuPrice: 2500,
      optionCount: 0,
      optionList: null,
    },
  ];

  return (
    <div className="orderdetail-overlay">
      <div className="orderdetail-container">
        <p className="orderdetail-title">상세 정보</p>

        <div className="orderdetail-item-box">
          {DummyOrderDetail.map((order) => (
            <div key={order.orderMenuId} className="orderdetail-item">
              <div className="orderdetail-name">
                <p>
                  {order.menuName}({order.menuAmount}잔)
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
