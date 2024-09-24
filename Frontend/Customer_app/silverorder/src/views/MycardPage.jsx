import "../styles/MycardPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInfoStore from "../stores/infos";
import add_card from "../img/add_card.png";
import { baseURL } from "../constant";
import usePurchaseStore from "../stores/purchase";

const MycardPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useInfoStore(); // userInfo 가져오기
  const [cards, setCards] = useState([]); // 카드 상태를 빈 배열로 초기화
  const { getRegisteredMyCard } = usePurchaseStore();

  // 카드 추가 버튼 클릭 시 호출되는 함수
  const handleAddCardClick = () => {
    navigate(`${baseURL}/registercard`); // RegisterCardPage로 이동
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 userApiEmail을 확인하여 존재하지 않으면 mypage로 이동
    if (!userInfo.userApiEmail) {
      navigate(`${baseURL}/mypage`); // mypage로 이동
      return; // 이후 코드 실행하지 않도록 return
    }

    // userApiEmail이 존재하는 경우 카드 정보를 불러옵니다.
    const fetchRegisteredMyCards = async () => {
      try {
        const response = await getRegisteredMyCard();
        if (response) {
          setCards(response); // 상태에 카드 정보를 설정합니다.
        } else {
          console.error("에러 발생:", response);
        }
      } catch (error) {
        console.error("카드 불러오기 실패:", error);
      }
    };

    fetchRegisteredMyCards();
  }, [userInfo.userApiEmail, getRegisteredMyCard, navigate]);

  return (
    <div className="mycard-container">
      <div className="mycard-title">
        <h1>내 카드 목록</h1>
      </div>

      {/* cards가 존재할 때에만 mycard-list div 출력 */}
      {cards.length > 0 ? (
        <div className="mycard-list">
          {cards.map((card) => (
            <div key={card.paymentId} className="mycard-item">
              <div className="mycard-item-title">
                <p>{card.cardName}</p>
              </div>
              <div className="mycard-item-number">
                <p>
                  (
                  {card.cardNum
                    .match(/.{1,4}/g)
                    .map((segment, i) => {
                      if (i === 1 || i === 3) {
                        return "****";
                      }
                      return segment;
                    })
                    .join(" ")}{" "}
                  )
                </p>
              </div>
              <div className="mycard-item-info">
                <li>{card.cardIssuerName}</li>
                <li>할인율: {card.discountRate}%</li>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-mycards-message">등록된 카드가 없습니다.</p>
      )}

      <div className="mycard-addcard" onClick={handleAddCardClick}>
        {/* 클릭 시 handleAddCardClick 함수 실행 */}
        <img src={add_card} alt="새 카드 추가" />
      </div>
    </div>
  );
};

export default MycardPage;
