import { useState, useEffect } from "react";
import "../styles/RegisterCardPage.css";
import usePurchaseStore from "../stores/purchase";
import { useNavigate } from "react-router-dom";

const RegisterCardPage = () => {
  const { getAllMyCard } = usePurchaseStore();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    // 카드 정보 불러오기
    const fetchCards = async () => {
      try {
        const response = await getAllMyCard();
        if (response) {
          setCards(response.REC);
        } else {
          console.error("에러 발생:", response.Header.responseMessage);
        }
      } catch (error) {
        console.error("카드 불러오기 실패:", error);
      }
    };

    fetchCards();
  }, [getAllMyCard]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (card) => {
    setSelectedCards((prevSelectedCards) => {
      if (
        prevSelectedCards.some(
          (selectedCard) => selectedCard.cardUniqueNo === card.cardUniqueNo
        )
      ) {
        // 이미 선택된 카드라면, 해당 카드를 선택 해제 (제거)
        return prevSelectedCards.filter(
          (selectedCard) => selectedCard.cardUniqueNo !== card.cardUniqueNo
        );
      } else {
        // 선택되지 않은 카드라면, 선택 목록에 추가
        return [...prevSelectedCards, card];
      }
    });
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="registerCard-container">
      <h1>카드 등록하기</h1>
      <div className="registerCard-list">
        {cards.map((card, index) => (
          <div key={index} className="registerCard-item">
            <div className="registerCard-item-title">
              <p>{card.cardName}</p>
            </div>
            <div className="registerCard-item-number">
              <p>
                (
                {card.cardNo
                  .match(/.{1,4}/g) // 4자리씩 잘라서 배열로 변환
                  .map((segment, i) => {
                    if (i === 1 || i === 3) {
                      // 2번째와 4번째는 마스킹 처리
                      return "****";
                    }
                    return segment;
                  })
                  .join(" ")}{" "}
                ){/* 배열을 다시 문자열로 결합 */}
              </p>
            </div>
            <div className="registerCard-item-info">
              <li>{card.cardIssuerName}</li>
              <li>{card.cardDescription}</li>
            </div>
            <div className="registerCard-item-checkbox">
              <label>이 카드 선택하기</label>
              <input
                type="checkbox"
                checked={selectedCards.some(
                  (selectedCard) =>
                    selectedCard.cardUniqueNo === card.cardUniqueNo
                )} // 배열에서 해당 카드가 있는지 확인
                onChange={() => handleCheckboxChange(card)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="registerCard-btns">
        <button className="registerCard-clear">선택 완료</button>
        <button className="registerCard-cancel" onClick={handleCancel}>
          취 소
        </button>
      </div>
    </div>
  );
};

export default RegisterCardPage;
