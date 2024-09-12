import "../styles/OptionChoicePage.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const OptionChoicePage = () => {
  // 더미 데이터: 옵션 리스트
  const DummyOptions = {
    optionlist: [
      {
        optionCategoryId: 1,
        optionCategoryTitle: "샷 추가",
        optionType: "OPTION_RADIO",
        optionDtoList: [
          { optionId: 1, optionName: "기본", optionPrice: 0 },
          { optionId: 2, optionName: "연하게", optionPrice: 0 },
          { optionId: 3, optionName: "샷 1개 추가", optionPrice: 500 },
        ],
      },
      {
        optionCategoryId: 2,
        optionCategoryTitle: "사이즈",
        optionType: "OPTION_RADIO",
        optionDtoList: [
          { optionId: 4, optionName: "기본", optionPrice: 0 },
          { optionId: 5, optionName: "사이즈 업", optionPrice: 500 },
        ],
      },
      {
        optionCategoryId: 3,
        optionCategoryTitle: "토핑 추가",
        optionType: "OPTION_RADIO",
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

  return (
    <div>
      <h1>{item.name}</h1>
      <p>가격: {item.price}</p>

      {/* 옵션 카테고리별로 옵션 렌더링 */}
      {DummyOptions.optionlist.map((category) => (
        <div key={category.optionCategoryId}>
          <h2>{category.optionCategoryTitle}</h2>
          {category.optionDtoList.map((option) => (
            <div key={option.optionId}>
              <input
                type="radio"
                name={category.optionCategoryTitle}
                id={`option-${option.optionId}`}
                onChange={() =>
                  setSelectedOptions({ [category.optionCategoryTitle]: option })
                }
              />
              <label htmlFor={`option-${option.optionId}`}>
                {option.optionName} (+{option.optionPrice}원)
              </label>
            </div>
          ))}
        </div>
      ))}

      {/* 총 가격 표시 */}
      <div>
        <p>총 가격: {calculateTotalPrice()}</p>
      </div>
    </div>
  );
};

export default OptionChoicePage;
