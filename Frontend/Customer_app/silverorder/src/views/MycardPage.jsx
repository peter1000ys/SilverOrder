import "../styles/MycardPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInfoStore from "../stores/infos";
import EmailAPIModal from "../components/AboutCard/EmailAPIModal";
import add_card from "../img/add_card.png";

const MycardPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useInfoStore(); // userInfo를 Zustand 스토어에서 가져옵니다.
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태를 관리합니다.

  // 카드 추가 버튼 클릭 시 호출되는 함수
  const handleAddCardClick = () => {
    if (userInfo.userApiEmail === null) {
      // userApiEmail이 null인 경우
      setModalOpen(true); // 모달을 엽니다.
    } else {
      // userApiEmail이 null이 아닌 경우
      navigate("/silverorder/registercard"); // RegisterCardPage로 이동합니다.
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // 모달을 닫는 함수입니다.
  };

  return (
    <div className="mycard-container">
      <div className="mycard-title">
        <h1>내 카드 목록</h1>
      </div>

      <div className="mycard-addcard" onClick={handleAddCardClick}>
        {/* 클릭 시 handleAddCardClick 함수가 실행됩니다. */}
        <img src={add_card} alt="새 카드 추가" />
      </div>

      {/* 모달이 열려 있을 때 모달을 표시합니다. */}
      {isModalOpen && <EmailAPIModal onClose={handleModalClose} />}
    </div>
  );
};

export default MycardPage;
