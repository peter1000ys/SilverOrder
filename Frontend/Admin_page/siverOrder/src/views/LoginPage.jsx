import React, { useState } from "react";
import useInfoStore from "../stores/infos";
import '../styles/LoginPage.css';
import { Navigate } from "react-router-dom";
import NavLogo from "../logo/NavLogo.png";

const LoginPage = () => {
  const { sendLoginRequest } = useInfoStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin } = useInfoStore();
  const [error] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await sendLoginRequest(email, password);
    if (success) {
      Notiflix.Notify.success('로그인 성공');
    } else {
      Notiflix.Notify.failure('비밀번호가 일치하지 않습니다.');
    }
  };

  if (isLogin) {
    return <Navigate to="/silverorder/admin/order" />; // 로그인 상태라면 메인페이지로 redirect
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={NavLogo} alt="Logo" className="login-image" />
        <input
          type="text"
          placeholder="이메일을 입력하세요"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button">로그인</button>
        <div className="signup-text">
          회원이 아니신가요? <a href="/silverorder/admin/signup" className="signup-link">회원 가입</a>
        </div>
      </form>
      
    </div>
  );
};

export default LoginPage;
