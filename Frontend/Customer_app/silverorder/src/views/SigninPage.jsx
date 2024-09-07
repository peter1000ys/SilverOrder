import "../styles/SigninPage.css";
import { useState } from "react";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-contents" onSubmit={handleSubmit}>
        <img
          className="sign-in-logo"
          src="/icon-512x512.png"
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
        <button type="submit" className="signin-btn">
          로 그 인
        </button>
      </form>
    </div>
  );
};

export default SigninPage;