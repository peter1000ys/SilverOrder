import React, { useState } from "react";
import "./styles/EmailAPIModal.css";

const EmailAPIModal = ({ onClose }) => {
  const [inputEmail, setInputEmail] = useState("");

  // 이메일 입력 처리
  const handleInputChange = (e) => {
    setInputEmail(e.target.value);
  };

  // 이메일 검증 및 API 호출 처리
  const handleConfirm = () => {
    onClose(); // 모달 닫기
  };

  return (
    <div className="emailAPImodal-overlay">
      <div className="emailAPImodal-content">
        <h2>이메일 인증</h2>
        <p>내 카드 목록을 불러오기 위한 이메일 정보를 입력해주세요.</p>
        <input
          type="email"
          value={inputEmail}
          onChange={handleInputChange}
          placeholder="이메일을 입력하세요"
        />
        <div className="emailAPImodal-btns">
          <button className="emailAPImodal-checkBtn" onClick={handleConfirm}>
            확인
          </button>
          <button className="emailAPImodal-cancelBtn" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailAPIModal;
