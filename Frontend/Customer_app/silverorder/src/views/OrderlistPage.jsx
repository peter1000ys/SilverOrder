import "../styles/OrderlistPage.css";
import MyOrders from "../components/OrderCard/MyOrders";

const OrderlistPage = () => {
  return (
    <div className="orderlist-container">
      <p className="orderlist-title">내 주문 내역</p>

      <MyOrders />
    </div>
  );
};

export default OrderlistPage;
