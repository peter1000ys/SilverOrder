import "../styles/SigninPage.css";
import { useState } from "react";
import useInfoStore from "../stores/infos";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import sign_in_logo from "../img/icon-512x512.png";
import { baseURL } from "../constant";
import Notiflix from "notiflix";

const SigninPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { sendLoginRequest, isLogin } = useInfoStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 전달된 storeId 가져오기
  const storeId = location.state?.storeId || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await sendLoginRequest(email, password);
    if (success) {
      Notiflix.Notify.success("로그인 성공");
      if (storeId === 0) {
        navigate(`${baseURL}/outdoor`);
      } else {
        navigate(`${baseURL}/store`);
      }
    } else {
      Notiflix.Notify.failure("로그인 실패");
    }
  };

  const handleCancel = () => {
    navigate(`${baseURL}/`);
  };

  if (isLogin) {
    if (storeId === 0) {
      return <Navigate to={`${baseURL}/outdoor`} />;
    } else {
      return <Navigate to={`${baseURL}/store`} />;
    }
  }

  return (
    <div className="sign-in-container">
      <form className="sign-in-contents" onSubmit={handleSubmit}>
        <img
          className="sign-in-logo"
          src={sign_in_logo}
          alt="로그인 페이지 로고"
        />
        <div>
          <div className="signin-input-box">
            <input
              id="signin-input01"
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // 해당 필드가 반드시 채워져야 함 (빈 상태로 제출 방지)
            />
          </div>
          <div className="signin-input-box">
            <input
              id="signin-input02"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // 해당 필드가 반드시 채워져야 함 (빈 상태로 제출 방지)
            />
          </div>
        </div>
        <div className="signin-btn-box">
          <div>
            <button type="submit" className="signin-btn">
              로그인
            </button>
          </div>
          <div>
            <button className="signin-cancel-btn" onClick={handleCancel}>
              취 소
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
