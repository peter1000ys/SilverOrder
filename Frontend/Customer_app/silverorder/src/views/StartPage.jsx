import "../styles/StartPage.css";
import { useNavigate } from "react-router-dom";
import silverorder_logo from "../img/silverorder_logo.png";
import { baseURL } from "../constant";

const StartPage = () => {
  const navigate = useNavigate();

  const go_to_sign_up = () => {
    navigate(`${baseURL}/signup`);
  };

  const go_to_sign_in = () => {
    navigate(`${baseURL}/signin`);
  };

  return (
    <div className="start-container">
      <div className="start-contents">
        <img className="start-page-logo" src={silverorder_logo} alt="로고" />
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
