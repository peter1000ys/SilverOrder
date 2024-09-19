import "../styles/MycardPage.css";

const MycardPage = () => {
  return (
    <div className="mycard-container">
      <div className="mycard-title">
        <h1>내 카드 목록</h1>
      </div>

      <div className="mycard-addcard">
        <img src="/add_card.png" alt="새 카드 추가" />
      </div>
    </div>
  );
};

export default MycardPage;
