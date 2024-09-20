import "../styles/OptionChoicePage.css";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import { useState } from "react";
import useCartStore from "../stores/cart"; // Zustand store 불러오기
import { baseURL } from "../constant";

const OptionChoicePage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate

  const { addToCart } = useCartStore(); // Zustand에서 addToCart 함수 가져오기

  // 더미 데이터: 옵션 리스트
  const DummyOptions = {
    optionlist: [
      {
        optionCategoryId: 1,
        optionCategoryTitle: "샷 추가",
        optionType: "OPTION_CHOICE",
        optionDtoList: [
          { optionId: 1, optionName: "기본", optionPrice: 0 },
          { optionId: 2, optionName: "연하게", optionPrice: 0 },
          { optionId: 3, optionName: "샷 1개 추가", optionPrice: 500 },
        ],
      },
      {
        optionCategoryId: 2,
        optionCategoryTitle: "사이즈",
        optionType: "OPTION_CHOICE",
        optionDtoList: [
          { optionId: 4, optionName: "기본", optionPrice: 0 },
          { optionId: 5, optionName: "사이즈 업", optionPrice: 500 },
        ],
      },
      {
        optionCategoryId: 3,
        optionCategoryTitle: "토핑 추가",
        optionType: "OPTION_CHOICE",
        optionDtoList: [
          { optionId: 6, optionName: "토핑 X", optionPrice: 0 },
          { optionId: 7, optionName: "자바칩", optionPrice: 300 },
          { optionId: 9, optionName: "펄", optionPrice: 400 },
          { optionId: 8, optionName: "휘핑크림", optionPrice: 500 },
        ],
      },
    ],
  };

  // 현재 위치에서 아이템 정보 가져오기
  const location = useLocation();
  const { item } = location.state;

  // 선택된 옵션을 상태로 관리
  const [selectedOptions, setSelectedOptions] = useState({});

  // 선택된 옵션을 바탕으로 총 가격 계산하기
  const calculateTotalPrice = () => {
    const basePrice = item.price; // 기본 가격
    const additionalPrice = Object.values(selectedOptions).reduce(
      (sum, option) => sum + (option.optionPrice || 0), // optionPrice가 존재하지 않을 경우 0으로 처리
      0
    );
    return basePrice + additionalPrice; // 총 가격 반환
  };

  // 장바구니에 추가하는 함수
  const handleAddToCart = () => {
    const selectedOptionDetails = Object.values(selectedOptions).map(
      (option) => ({
        optionId: option.optionId, // 선택한 옵션의 ID
        optionName: option.optionName, // 선택한 옵션의 이름
      })
    );

    const totalPrice = calculateTotalPrice(); // 총 가격 계산

    const newItem = {
      category: item.category, // 아이템 카테고리
      productId: item.productId, // 아이템 ID
      name: item.name, // 아이템 이름
      price: totalPrice, // 총 가격
      options: selectedOptionDetails, // 선택된 옵션 정보
    };

    addToCart(newItem); // Zustand store의 addToCart 함수 호출
    navigate(`${baseURL}/shoppingcart`); // 장바구니 페이지로 이동
  };

  return (
    <div>
      <div className="option-menu-title">
        <h1>{item.name}</h1>
      </div>

      {/* 옵션 카테고리별로 옵션 렌더링 */}
      {DummyOptions.optionlist.map((category) => (
        <div key={category.optionCategoryId} className="option-select-box">
          <div className="option-select-title">
            <h2>{category.optionCategoryTitle}</h2>
          </div>
          <div className="options-container">
            {category.optionDtoList.map((option) => (
              <div
                key={option.optionId}
                className={`option-box ${
                  selectedOptions[category.optionCategoryTitle]?.optionId ===
                  option.optionId
                    ? "selected"
                    : ""
                }`} // 선택된 옵션에 클래스 추가
                onClick={() =>
                  setSelectedOptions((prevSelectedOptions) => ({
                    ...prevSelectedOptions, // 기존 선택 유지
                    [category.optionCategoryTitle]: option, // 새로 선택된 옵션 추가
                  }))
                }
              >
                <p>{option.optionName}</p>
                <p>+{option.optionPrice}원</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 총 가격 표시 */}
      <div className="option-totalPrice-box">
        <p>
          총 가격: <span id="option-plus-price">{calculateTotalPrice()}</span>원
        </p>
      </div>

      {/* 장바구니에 담는 버튼 */}
      <div className="option-menu-add">
        <button className="option-menu-addBtn" onClick={handleAddToCart}>
          장바구니에 담기
        </button>
      </div>
    </div>
  );
};

export default OptionChoicePage;
