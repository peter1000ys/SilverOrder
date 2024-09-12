import { useState } from "react";
import "./Styles/MenuList.css";
import MenuInfo from "./MenuInfo";

const MenuList = () => {
  const DummyMenu = {
    products: [
      {
        id: 1,
        name: "아메리카노",
        description: "깔끔한 아메리카노",
        price: 1500,
        imageUrl: "/Ice-americano.jpg",
        options: [
          { id: 1, name: "샷 추가", price: 500 },
          { id: 2, name: "얼음 추가", price: 0 },
          { id: 3, name: "사이즈업", price: 500 },
        ],
        category: "음료",
      },
      {
        id: 2,
        name: "카페라떼",
        description: "포근한 카페라떼",
        price: 2500,
        imageUrl: "/Ice-americano.jpg",
        options: [
          { id: 1, name: "샷 추가", price: 500 },
          { id: 2, name: "우유 오트밀로 변경", price: 500 },
        ],
        category: "음료",
      },
      {
        id: 3,
        name: "빅-아메리카노",
        description: "커다랗고 깔끔한 아메리카노",
        price: 3000,
        imageUrl: "/Ice-americano.jpg",
        options: [{ id: 1, name: "샷 추가", price: 500 }],
        category: "음료",
      },
      {
        id: 4,
        name: "초코 케이크",
        description: "부드러운 초코 케이크",
        price: 4500,
        imageUrl: "/Choco_cake.jpg",
        options: [],
        category: "디저트",
      },
    ],
  };

  // 선택된 카테고리를 저장할 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState(DummyMenu.products); // 기본적으로 모든 메뉴를 보여줌

  // "음료" 버튼 클릭 시 필터링 함수
  const showDrinks = () => {
    setSelectedCategory("음료"); // 음료 버튼이 선택되었음을 상태로 저장
    const drinks = DummyMenu.products.filter(
      (product) => product.category === "음료"
    );
    setFilteredData(drinks); // 카테고리가 "음료"인 메뉴만 필터링하여 상태 업데이트
  };

  // "디저트" 버튼 클릭 시 필터링 함수
  const showDesserts = () => {
    setSelectedCategory("디저트"); // 디저트 버튼이 선택되었음을 상태로 저장
    const desserts = DummyMenu.products.filter(
      (product) => product.category === "디저트"
    );
    setFilteredData(desserts); // 카테고리가 "디저트"인 메뉴만 필터링하여 상태 업데이트
  };

  return (
    <div className="menulist-container">
      <div className="menu-category-choose">
        {/* 카테고리에 맞는 메뉴만 보이도록 버튼 클릭 시 필터링, 클릭된 버튼에 따라 스타일이 바뀌도록 className 설정 */}
        <button
          className={`menu-category-btn01 ${
            selectedCategory === "음료" ? "active" : ""
          }`}
          onClick={showDrinks}
        >
          음료
        </button>
        {/* "음료" 카테고리 필터링 버튼 */}
        <button
          className={`menu-category-btn02 ${
            selectedCategory === "디저트" ? "active" : ""
          }`}
          onClick={showDesserts}
        >
          디저트
        </button>
        {/* "디저트" 카테고리 필터링 버튼 */}
      </div>
      {/* 필터링된 데이터를 MenuInfo 컴포넌트에 전달 */}
      <MenuInfo data={{ products: filteredData }} />
    </div>
  );
};

export default MenuList;
