import "../styles/PurchasePage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constant";
import { useLocation } from "react-router-dom";
import useInfoStore from "../stores/infos";
import usePurchaseStore from "../stores/purchase";

const PurchasePage = () => {
  const location = useLocation();
  const { purchaseInfo } = location.state || {}; // 전달된 purchaseInfo를 받아옴

  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState(""); // 요청 사항을 관리하는 state
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // 선택한 옵션을 관리하는 state
  const [carouselIndex, setCarouselIndex] = useState(0); // carousel의 현재 인덱스를 관리하는 state
  const [cards, setCards] = useState([]); // 카드 데이터를 저장할 state

  const { getRegisteredMyCard, sendPurchaseRequest } = usePurchaseStore();
  const { loginedStore } = useInfoStore();

  // 카드 정보를 불러오는 useEffect
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getRegisteredMyCard();
        if (response) {
          setCards(response);
        } else {
          console.error("에러 발생");
        }
      } catch (error) {
        console.error("카드 불러오기 실패:", error);
      }
    };
    fetchCards();
  }, [getRegisteredMyCard]);

  // 가장 높은 할인율을 가진 카드 찾기
  const highestDiscountCard = cards.reduce(
    (prev, current) =>
      prev.discountRate > current.discountRate ? prev : current,
    cards[0] || {}
  );

  useEffect(() => {
    // 선택한 옵션에 따라 selectedCard를 설정
    if (selectedOption === "highest") {
      setSelectedCard(highestDiscountCard);
    } else if (selectedOption === "all" && cards.length > 0) {
      setSelectedCard(cards[carouselIndex]);
    }
  }, [selectedOption, carouselIndex, cards, highestDiscountCard]);

  // 다음 카드로 이동
  const handleNextCard = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // 이전 카드로 이동
  const handlePreviousCard = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  // 결제 요청 보내기
  const payMoney = () => {
    if (purchaseInfo && selectedCard) {
      // 선택한 카드의 paymentId를 purchaseInfo에 추가
      const updatedPurchaseInfo = {
        ...purchaseInfo,
        storeId: loginedStore,
        paymentId: selectedCard.paymentId, // 선택한 카드의 paymentId를 추가
        require: requestDetails, // 입력된 요청 사항 추가
      };

      console.log(updatedPurchaseInfo);

      const checkPurchaseResult = async () => {
        try {
          const response = await sendPurchaseRequest(updatedPurchaseInfo);
          if (response) {
            alert(response);
          } else {
            console.error("에러 발생");
          }
        } catch (error) {
          console.log("결제 중 에러 발생", error);
        }
      };

      checkPurchaseResult();
    }
  };

  const cancelPurchase = () => {
    navigate(`${baseURL}/shoppingcart`);
  };

  return (
    <div className="purchase-container">
      <div className="purchase-requirements-box">
        <p>요청 사항</p>
        <textarea
          className="purchase-requirements-input"
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
          placeholder="없음"
        ></textarea>
      </div>

      {/* 가장 할인율이 높은 카드 1개 보여주기 */}
      {cards.length > 0 && (
        <div className="purchase-highest-discountrate">
          <div className="purchase-highest-label">
            <label>
              <input
                type="radio"
                name="cardOption"
                value="highest"
                checked={selectedOption === "highest"}
                onChange={() => setSelectedOption("highest")}
              />
              할인율이 가장 높은 카드
            </label>
          </div>
          <div className="purchase-highest-card">
            <div className="purchase-highest-card-info">
              <p className="purchase-card-name">
                {highestDiscountCard.cardName}
              </p>
              <p className="purchase-card-number">
                (
                {highestDiscountCard.cardNum
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
              <p className="purchase-card-discountrate">
                할인율: {highestDiscountCard.discountRate}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 내 카드 모두 보여주기 (Carousel) */}
      {cards.length > 0 && (
        <div className="purchase-allcard-list">
          <div className="purchase-allcard-label">
            <label>
              <input
                type="radio"
                name="cardOption"
                value="all"
                checked={selectedOption === "all"}
                onChange={() => setSelectedOption("all")}
              />
              현재 선택한 카드
            </label>
          </div>
          <div className="purchase-allcard-card">
            <div className="purchase-carousel">
              {/* 카드가 2개 이상일 때만 이전 버튼 표시 */}
              {cards.length > 1 && (
                <button onClick={handlePreviousCard}>◀</button>
              )}
              <div className="purchase-allcard-card-info">
                <p className="purchase-card-name">
                  {cards[carouselIndex].cardName}
                </p>
                <p className="purchase-card-number">
                  (
                  {cards[carouselIndex].cardNum
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
                <p className="purchase-card-discountrate">
                  할인율: {cards[carouselIndex].discountRate}%
                </p>
              </div>
              {cards.length > 1 && <button onClick={handleNextCard}>▶</button>}
            </div>
          </div>
        </div>
      )}

      {/* 선택한 카드로 결제하기 */}
      {selectedCard && (
        <div className="purchase-btns-box">
          <button className="purchase-ok-btn" onClick={payMoney}>
            결 제 하 기
          </button>
          <button className="purchase-cancel-btn" onClick={cancelPurchase}>
            장바구니로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default PurchasePage;
