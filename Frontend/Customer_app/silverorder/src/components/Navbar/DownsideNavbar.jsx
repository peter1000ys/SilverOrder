import "./styles/DownsideNavbar.css";
import { useNavigate } from "react-router-dom";
import shopping_cart from "../../img/shopping-cart-2-line.png";
import scroll from "../../img/file-list-3-line.png";
import home from "../../img/home-2-line.png";
import user from "../../img/user-line.png";
import { baseURL } from "../../constant";

const DownsideNavbar = () => {
  const navigate = useNavigate();

  const go_to_shoppingcart = () => {
    navigate(`${baseURL}/shoppingcart`);
  };

  const go_to_orderlist = () => {
    navigate(`${baseURL}/orderlist`);
  };

  const go_store_main = () => {
    navigate(`${baseURL}/store`);
  };

  const go_to_mypage = () => {
    navigate(`${baseURL}/mypage`);
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
