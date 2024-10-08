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

    try {
      const response = await sendLoginRequest(email, password);
      if (response === "success") {
        Notiflix.Notify.success("로그인 성공");
        if (storeId === 0) {
          navigate(`${baseURL}/outdoor`);
        } else {
          navigate(`${baseURL}/store`);
        }
      } else if (response === "password error") {
        Notiflix.Notify.error("비밀번호가 틀렸습니다.");
      } else if (response === "unknown user") {
        Notiflix.Notify.error("존재하지 않는 이메일입니다.");
      }
    } catch (error) {
      // 비동기 처리 중 오류 발생 시 처리
      Notiflix.Notify.failure("로그인 중 오류가 발생했습니다.");
      console.error("로그인 오류:", error);
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
              required
            />
          </div>
          <div className="signin-input-box">
            <input
              id="signin-input02"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
