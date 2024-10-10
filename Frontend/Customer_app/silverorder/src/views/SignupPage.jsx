import "../styles/SignupPage.css";
import { useState } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import useInfoStore from "../stores/infos";
import sign_up_logo from "../img/icon-512x512.png";
import { baseURL } from "../constant";
import Notiflix from "notiflix";

const SignupPage = () => {
  const { sendRegisterRequest, sendLoginRequest, isLogin } = useInfoStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthcode, setBirthcode] = useState("");

  const location = useLocation();
  // 전달된 storeId 가져오기
  const storeId = location.state?.storeId || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      Notiflix.Notify.warning("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 생년월일 형식 검증 (정규식: 0000-00-00 형태)
    const birthcodeRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthcodeRegex.test(birthcode)) {
      Notiflix.Notify.warning("생년월일 형식을 맞춰주세요 (예: 0000-00-00).");
      return;
    }

    const success = await sendRegisterRequest(email, password, birthcode);
    if (success) {
      Notiflix.Notify.success("회원가입 성공!");
      sendLoginRequest(email, password);
    } else {
      Notiflix.Notify.failure("회원가입 실패!");
    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLogin) {
    if (storeId === 0) {
      return <Navigate to={`${baseURL}/outdoor`} />;
    } else {
      return <Navigate to={`${baseURL}/store`} />;
    }
  }

  return (
    <div className="sign-up-container">
      <form className="sign-up-contents" onSubmit={handleSubmit}>
        <img
          className="sign-up-logo"
          src={sign_up_logo}
          alt="로그인 페이지 로고"
        />
        <div>
          <div className="signup-input-box">
            <input
              id="signup-input01"
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // 해당 필드가 반드시 채워져야 함 (빈 상태로 제출 방지)
            />
          </div>
          <div className="signup-input-box">
            <input
              id="signup-input02"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // 해당 필드가 반드시 채워져야 함 (빈 상태로 제출 방지)
            />
          </div>
          <div className="signup-input-box">
            <input
              id="signup-input03"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required // 해당 필드가 반드시 채워져야 함 (빈 상태로 제출 방지)
            />
          </div>
          <div className="signup-input-box">
            <input
              id="signup-input04"
              type="text"
              placeholder="0000-00-00"
              value={birthcode}
              onChange={(e) => setBirthcode(e.target.value)}
              required // 해당 필드가 반드시 채워져야 함 (빈 상태로 제출 방지)
            />
          </div>
        </div>
        <div className="signup-btn-box">
          <div>
            <button type="submit" className="signin-btn">
              가 입
            </button>
          </div>
          <div>
            <button className="signup-cancel-btn" onClick={handleCancel}>
              취 소
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
