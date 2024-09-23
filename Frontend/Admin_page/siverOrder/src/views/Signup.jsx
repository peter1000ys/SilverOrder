import React, { useState, useEffect } from 'react';
import '../styles/Signup.css';
import useInfoStore from "../stores/infos";
import { Navigate } from "react-router-dom";
import Logo from "../logo/Logo.png";
const Signup = () => {
  const { sendLoginRequest, sendRegisterRequest, isLogin } = useInfoStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [store, setStore] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // 비밀번호와 비밀번호 재입력 값이 다르면 하이라이트 설정
    setIsPasswordMismatch(password !== confirmPassword && confirmPassword.length > 0);
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      Notiflix.Notify.failure('비밀번호가 일치하지 않습니다.');
      return;
    }

    setError("");
    const success = await sendRegisterRequest(email, password, birth, store);
    if (success) {
      sendLoginRequest(email, password);
    }
  };

  if (isLogin) {
    return <Navigate to="/silverorder/admin/order" />; // 로그인 상태라면 메인페이지로 redirect
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" className="signup-image" />
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className="signup-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 핸들러
          required
        />
        <input
          type="password"
          placeholder="비밀번호 재입력"
          className={`signup-input ${isPasswordMismatch ? 'error' : ''}`} // 비밀번호 불일치 시 'error' 클래스 추가
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 재입력 핸들러
          required
        />
        <input
          type="text"
          placeholder="생년월일 0000-00-00"
          className="signup-input"
          value={birth}
          onChange={(e)=>setBirth(e.target.value)}

        />

        <input
          type="text"
          placeholder="가맹점 ID를 넣어주세요"
          className="signup-input"
          value={store}
          onChange={(e)=>setStore(e.target.value)}
          required
        />
        <button className="signup-button">회원 가입</button>
      </form>
      
    </div>
  );
};

export default Signup;
