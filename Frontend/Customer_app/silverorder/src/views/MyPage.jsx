import "../styles/MyPage.css";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  const go_to_changeinfo = () => {
    navigate("/changeInfo");
  };

  const go_to_orderstate = () => {
    navigate("/orderstate");
  };

  const go_to_orderlist = () => {
    navigate("/orderlist");
  };

  const go_to_mycard = () => {
    navigate("/mycard");
  };

  return (
    <div className="mypage-container">
      <div className="mypage-box01" onClick={go_to_changeinfo}>
        <h1>내 정보 수정</h1>
      </div>
      <div className="mypage-box02" onClick={go_to_orderstate}>
        <h1>주문 현황</h1>
      </div>
      <div className="mypage-box03">
        <div className="mypage-card01" onClick={go_to_orderlist}>
          <h1>지난 주문 내역</h1>
        </div>
        <div className="mypage-card02" onClick={go_to_mycard}>
          <h1>내 카드</h1>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
