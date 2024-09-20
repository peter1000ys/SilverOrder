import "./styles/DownsideNavbar.css";
import { useNavigate } from "react-router-dom";
import shopping_cart from "../../img/shopping_cart.png";
import scroll from "../../img/scroll.png";
import home from "../../img/home.png";
import user from "../../img/user.png";

const DownsideNavbar = () => {
  const navigate = useNavigate();

  const go_to_shoppingcart = () => {
    navigate("/silverorder/shoppingcart");
  };

  const go_to_orderlist = () => {
    navigate("/silverorder/orderlist");
  };

  const go_store_main = () => {
    navigate("/silverorder/store");
  };

  const go_to_mypage = () => {
    navigate("/silverorder/mypage");
  };

  return (
    <div className="down-navbar-container">
      <div>
        <img
          className="downnav-btn"
          src={shopping_cart}
          alt="장바구니 페이지"
          onClick={go_to_shoppingcart}
        />
      </div>
      <div>
        <img
          className="downnav-btn"
          src={scroll}
          alt="지난 주문 내역 확인"
          onClick={go_to_orderlist}
        />
      </div>
      <div>
        <img
          className="downnav-btn"
          src={home}
          alt="처음 화면"
          onClick={go_store_main}
        />
      </div>
      <div>
        <img
          className="downnav-btn"
          src={user}
          alt="마이 페이지"
          onClick={go_to_mypage}
        />
      </div>
    </div>
  );
};
export default DownsideNavbar;
