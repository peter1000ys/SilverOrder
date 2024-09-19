import "../styles/StartPage.css";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const go_to_sign_up = () => {
    navigate("/silverorder/signup");
  };

  const go_to_sign_in = () => {
    navigate("/silverorder/signin");
  };

  return (
    <div className="start-container">
      <div className="start-contents">
        <img
          className="start-page-logo"
          src="/silverorder_logo.png"
          alt="로고"
        />
        <button className="start-page-signin-btn" onClick={go_to_sign_in}>
          로 그 인
        </button>
        <button className="start-page-signup-btn" onClick={go_to_sign_up}>
          회 원 가 입
        </button>
      </div>
    </div>
  );
};

export default StartPage;
