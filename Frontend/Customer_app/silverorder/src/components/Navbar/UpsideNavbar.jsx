import "./styles/UpsideNavbar.css";
import { useNavigate } from "react-router-dom";
import useInfoStore from "../../stores/infos";
import left_arrow from "../../img/left_arrow.png";
import clock from "../../img/clock.png";
import notification from "../../img/notification.png";
import { baseURL } from "../../constant";

const UpsideNavbar = () => {
  const { logout } = useInfoStore();

  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1); // 뒤로 가기
  };

  const go_to_orderstate = () => {
    navigate(`${baseURL}/orderstate`);
  };

  const handleLogout = () => {
    logout(navigate); // navigate를 전달
  };

  return (
    <div className="up-navbar-container">
      <div className="upnav-leftside">
        <img
          className="move-before-page"
          onClick={handleback}
          src={left_arrow}
          alt="뒤로가기"
        />
      </div>
      <div className="upnav-logout" onClick={handleLogout}>
        <p>로그아웃</p>
      </div>
      <div className="upnav-rightside">
        <img
          className="order-state-check"
          onClick={go_to_orderstate}
          src={clock}
          alt="주문 상태 확인"
        />
      </div>
    </div>
  );
};
export default UpsideNavbar;
