import "./styles/UpsideNavbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import useInfoStore from "../../stores/infos";
import left_arrow from "../../img/arrow-go-back-fill.png";
import clock from "../../img/time-line.png";
import clock_fill from "../../img/time-fill.png";
import logout_img from "../../img/logout-box-r-line.png";
import { baseURL } from "../../constant";
import Notiflix from "notiflix";

const UpsideNavbar = () => {
  const { logout } = useInfoStore();

  const navigate = useNavigate();
  const location = useLocation();

  const handleback = () => {
    navigate(-1); // 뒤로 가기
  };

  const go_to_orderstate = () => {
    navigate(`${baseURL}/orderstate`);
  };

  const handleLogout = () => {
    Notiflix.Confirm.show(
      "로그아웃", // 제목
      "정말 로그아웃하시겠습니까?", // 메시지
      "네", // 확인 버튼 텍스트
      "아니오", // 취소 버튼 텍스트
      () => {
        logout(navigate); // 사용자가 "네"를 클릭했을 때 실행
      },
      () => {
        // 사용자가 "아니오"를 클릭했을 때는 아무것도 하지 않음
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#000",
        okButtonBackground: "#d33",
      }
    );
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
      <div className="upnav-rightside">
        <img
          className="order-state-check"
          onClick={go_to_orderstate}
          src={location.pathname.includes("/orderstate") ? clock_fill : clock}
          alt="주문 상태 확인"
        />
        <img
          className="user-logout"
          onClick={handleLogout}
          src={logout_img}
          alt="로그아웃"
        />
      </div>
    </div>
  );
};
export default UpsideNavbar;
