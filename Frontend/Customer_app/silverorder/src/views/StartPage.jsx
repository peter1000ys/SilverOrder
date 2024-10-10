import "../styles/StartPage.css";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import silverorder_logo from "../img/silverorder_logo.png";
import { baseURL } from "../constant";
import useInfoStore from "../stores/infos";

const StartPage = ({ storeId }) => {
  const { isLogin, setLoginedStore, loginedStore } = useInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (storeId) {
      setLoginedStore(storeId); // storeId를 loginedStore에 저장
    }
  }, [storeId, setLoginedStore]);

  const go_to_sign_up = () => {
    navigate(`${baseURL}/signup`, { state: { storeId } });
  };

  const go_to_sign_in = () => {
    navigate(`${baseURL}/signin`, { state: { storeId } });
  };

  if (isLogin && loginedStore != 0) {
    return <Navigate to={`${baseURL}/store`} />;
  }

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
