import "../styles/PurchasePage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constant";
import { useLocation } from "react-router-dom";
import useInfoStore from "../stores/infos";
import usePurchaseStore from "../stores/purchase";
import useCartStore from "../stores/cart";
import useWebSocketStore from "../stores/websocket";
import Notiflix from "notiflix";
import { TextField } from '@mui/material';


const PurchasePage = () => {
  const location = useLocation();
  const { purchaseInfo } = location.state || {}; // 전달된 purchaseInfo를 받아옴

  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState(""); // 요청 사항을 관리하는 state
  const [selectedCard, setSelectedCard] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0); // carousel의 현재 인덱스를 관리하는 state
  const [cards, setCards] = useState([]); // 카드 데이터를 저장할 state
  const [isFirstRender, setIsFirstRender] = useState(true); //최초 랜더링 여부

  const { getRegisteredMyCard, sendPurchaseRequest } = usePurchaseStore();
  const { loginedStore } = useInfoStore();

  const { clearCart } = useCartStore();

  const { subscribeToOrder } = useWebSocketStore();

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

  // 추천 카드 결제 Confirm useEffect
  useEffect(() => {
    if (selectedCard && selectedCard !== highestDiscountCard) {
      // 선택된 카드가 다를 경우에만 업데이트
      setSelectedCard(highestDiscountCard);
    }

    if (
      highestDiscountCard &&
      highestDiscountCard.cardName &&
      isFirstRender &&
      purchaseInfo
    ) {
      // 추천 결제 프롬프트
      Notiflix.Confirm.prompt(
        `${highestDiscountCard.cardName}`,
        "요청사항 입력",
        "",
        "최대 할인 결제",
        "아니오",
        (clientRequest) => {
          // 결제 버튼 클릭 시
          recommendPayMoney(clientRequest);
        },
        () => {
        },
        {
          titleColor: "#1428a0",
          titleFontSize: "28px",
          titleMaxLength: 100,
          messageColor: "#1e1e1e",
          messageFontSize: "20px",
          buttonsFontSize: "25px",
          okButtonColor: "#f8f8f8",
          okButtonBackground: "#1428a0",
        }
      );

      // 최초 렌더링 후 상태 업데이트
      setIsFirstRender(false);
    }
  }, [highestDiscountCard, selectedCard, isFirstRender, purchaseInfo]); // highestDiscountCard와 selectedCard를 의존성 배열에 추가

  useEffect(() => {
    // 선택한 옵션에 따라 selectedCard를 설정
    if (cards.length > 0) {
      setSelectedCard(cards[carouselIndex]);
    }
  }, [carouselIndex, cards]);

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
  const payMoney = async () => {
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
            Notiflix.Notify.success(
              `결제 성공! 주문 번호는 ${response.orderId}번입니다.`
            );
            subscribeToOrder(response.orderId);
            clearCart();
            navigate(`${baseURL}/orderstate`);
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

  // 결제 요청 보내기
  const recommendPayMoney = async (clientRequest) => {
    if (purchaseInfo && highestDiscountCard) {
      // 선택한 카드의 paymentId를 purchaseInfo에 추가
      const updatedPurchaseInfo = {
        ...purchaseInfo,
        storeId: loginedStore,
        paymentId: highestDiscountCard.paymentId, // 선택한 카드의 paymentId를 추가
        require: clientRequest, // 입력된 요청 사항 추가
      };

      console.log(updatedPurchaseInfo);

      const checkPurchaseResult = async () => {
        try {
          const response = await sendPurchaseRequest(updatedPurchaseInfo);
          if (response) {
            Notiflix.Notify.success(
              `결제 성공! 주문 번호는 ${response.orderId}번입니다.`
            );
            subscribeToOrder(response.orderId);
            clearCart();
            navigate(`${baseURL}/orderstate`);
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
        <TextField
            placeholder='없음.'
            multiline
            margin="none"
            fullWidth
            size="medium"
            value={requestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
        />
      </div>

      {/* 내 카드 모두 보여주기 (Carousel) */}
      {cards.length > 0 && (
        <div className="purchase-allcard-list">
          <div className="purchase-allcard-title">
            <p>카드 선택하기</p>
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
