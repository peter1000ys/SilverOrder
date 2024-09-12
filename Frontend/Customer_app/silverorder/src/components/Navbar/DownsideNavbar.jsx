import "./styles/DownsideNavbar.css";
import { useNavigate } from "react-router-dom";

const DownsideNavbar = () => {
  const navigate = useNavigate();

  const go_to_shoppingcart = () => {
    navigate("/shoppingcart");
  };

  const go_to_orderlist = () => {
    navigate("/orderlist");
  };

  const go_store_main = () => {
    navigate("/store");
  };

  const go_to_mypage = () => {
    navigate("/mypage");
  };

  return (
    <div className="down-navbar-container">
      <div>
        <img
          className="downnav-btn"
          src="/shopping_cart.png"
          alt="장바구니 페이지"
          onClick={go_to_shoppingcart}
        />
      </div>
      <div>
        <img
          className="downnav-btn"
          src="/scroll.png"
          alt="지난 주문 내역 확인"
          onClick={go_to_orderlist}
        />
      </div>
      <div>
        <img
          className="downnav-btn"
          src="/home.png"
          alt="처음 화면"
          onClick={go_store_main}
        />
      </div>
      <div>
        <img
          className="downnav-btn"
          src="/user.png"
          alt="마이 페이지"
          onClick={go_to_mypage}
        />
      </div>
    </div>
  );
};
export default DownsideNavbar;
