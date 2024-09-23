import "../styles/MyPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseURL } from "../constant";
import useInfoStore from "../stores/infos";
import EmailAPIModal from "../components/AboutCard/EmailAPIModal";

const MyPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useInfoStore(); // userInfo 가져오기
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태를 관리

  const go_to_orderstate = () => {
    navigate(`${baseURL}/orderstate`);
  };

  const go_to_orderlist = () => {
    navigate(`${baseURL}/orderlist`);
  };

  const go_to_mycard = () => {
    // userApiEmail이 null인지 검사
    if (userInfo.userApiEmail === null) {
      setModalOpen(true); // userApiEmail이 없으면 모달 열기
    } else {
      navigate(`${baseURL}/mycard`); // userApiEmail이 있으면 MycardPage로 이동
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // 모달 닫기
  };

  return (
    <div className="mypage-container">
      <div className="mypage-box01" onClick={go_to_orderstate}>
        <h1>주문 현황</h1>
      </div>
      <div className="mypage-box02" onClick={go_to_orderlist}>
        <h1>지난 주문 내역</h1>
      </div>
      <div className="mypage-box03" onClick={go_to_mycard}>
        <h1>내 카드</h1>
      </div>

      {/* modal이 열려 있을 때 modal을 표시 */}
      {isModalOpen && <EmailAPIModal onClose={handleModalClose} />}
    </div>
  );
};

export default MyPage;
