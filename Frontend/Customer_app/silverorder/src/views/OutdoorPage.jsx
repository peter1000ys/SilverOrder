import "../styles/OutdoorPage.css";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const go_to_sign_up = () => {
    navigate("/silverorder/signup");
  };

  const go_to_find_store = () => {
    navigate("/silverorder/findstore");
  };

  return (
    <div className="outdoor-container">
      <div className="outdoor-contents">
        <img
          className="outdoor-page-logo"
          src="/silverorder_logo.png"
          alt="로고"
        />
        <button
          className="outdoor-page-findstore-btn"
          onClick={go_to_find_store}
        >
          주변매장 찾아보기
        </button>
        <button className="outdoor-page-signup-btn" onClick={go_to_sign_up}>
          회 원 가 입
        </button>
      </div>
    </div>
  );
};

export default StartPage;
