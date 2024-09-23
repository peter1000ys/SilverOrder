import { useState, useEffect } from "react";
import "../styles/RegisterCardPage.css";
import usePurchaseStore from "../stores/purchase";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constant";
import useInfoStore from "../stores/infos"; // useInfoStore 가져오기

const RegisterCardPage = () => {
  const { userInfo } = useInfoStore(); // userInfo 가져오기
  const { getAllMyCard, registerCheckedCard } = usePurchaseStore();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // userApiEmail이 존재하지 않으면 mypage로 리디렉션
    if (!userInfo.userApiEmail) {
      navigate(`${baseURL}/mypage`); // mypage로 이동
      return; // 이후 코드 실행하지 않도록 return
    }

    // 카드 정보 불러오기
    const fetchAllMyCards = async () => {
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

    fetchAllMyCards();
  }, [userInfo.userApiEmail, getAllMyCard, navigate]);

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

  // 선택한 카드 간편 결제에 등록하기
  const registerSelectedCard = async () => {
    try {
      if (selectedCards.length === 0) {
        alert("선택된 카드가 없습니다. 카드를 선택해주세요.");
        return;
      }

      const response = await registerCheckedCard(selectedCards);
      if (response) {
        alert("선택한 카드가 간편 결제 카드 목록에 추가되었습니다.");
        setSelectedCards([]); // selectedCard 초기화
        navigate(`${baseURL}/mycard`);
      } else {
        console.error("에러 발생");
      }
    } catch (error) {
      console.error("간편 결제에 등록 실패:", error);
    }
  };

  // 취소 버튼 눌렀을 때 뒤로 가기
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="registerCard-container">
      <h1>카드 등록하기</h1>
      <div className="registerCard-list">
        {cards.length > 0 ? (
          <>
            {cards.map((card, index) => (
              <div key={index} className="registerCard-item">
                <div className="registerCard-item-title">
                  <p>{card.cardName}</p>
                </div>
                <div className="registerCard-item-number">
                  <p>
                    (
                    {card.cardNo
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
                    )}
                    onChange={() => handleCheckboxChange(card)}
                  />
                </div>
              </div>
            ))}
            <div className="registerCard-btns">
              <button
                className="registerCard-clear"
                onClick={registerSelectedCard}
              >
                선택 완료
              </button>
              <button className="registerCard-cancel" onClick={handleCancel}>
                취 소
              </button>
            </div>
          </>
        ) : (
          <p className="registerCard-no-card">
            간편 결제에 추가로 등록 가능한 카드가 존재하지 않습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterCardPage;
