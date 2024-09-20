import { useState } from "react";
import "./Styles/MenuList.css";
import MenuInfo from "./MenuInfo";
import Ice_americano from "../../img/Ice-americano.jpg";
import Choco_cake from "../../img/Choco_cake.jpg";

const MenuList = () => {
  const DummyMenu = {
    products: [
      {
        id: 1,
        name: "아메리카노",
        description: "깔끔한 아메리카노",
        price: 1500,
        imageUrl: { Ice_americano },
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
        imageUrl: { Ice_americano },
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
        imageUrl: { Ice_americano },
        options: [{ id: 1, name: "샷 추가", price: 500 }],
        category: "음료",
      },
      {
        id: 4,
        name: "초코 케이크",
        description: "부드러운 초코 케이크",
        price: 4500,
        imageUrl: { Choco_cake },
        options: [],
        category: "디저트",
      },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState(DummyMenu.products); // 기본적으로 모든 메뉴를 보여줌
  const [searchTerm, setSearchTerm] = useState(""); // 현재 입력한 검색어
  const [isSearching, setIsSearching] = useState(false); // 검색 상태(검색한 결과를 보여주고 있는지)

  // "음료" 버튼 클릭 시 필터링 함수
  const showDrinks = () => {
    setSelectedCategory("음료");
    const drinks = DummyMenu.products.filter(
      (product) => product.category === "음료"
    );
    setFilteredData(drinks);
    setIsSearching(false); // 카테고리 필터링 시 검색 상태 해제
  };

  // "디저트" 버튼 클릭 시 필터링 함수
  const showDesserts = () => {
    setSelectedCategory("디저트");
    const desserts = DummyMenu.products.filter(
      (product) => product.category === "디저트"
    );
    setFilteredData(desserts);
    setIsSearching(false); // 카테고리 필터링 시 검색 상태 해제
  };

  // 검색어로 필터링하는 함수
  const searchMenu = () => {
    const searchResults = DummyMenu.products.filter((product) =>
      product.name.includes(searchTerm)
    );
    setFilteredData(searchResults);
    setIsSearching(true); // 검색 상태 활성화
    setSelectedCategory(null); // 검색 시 카테고리 해제
    setSearchTerm(""); // 검색 후 input 필드 초기화
  };

  // 검색 초기화 함수
  const resetSearch = () => {
    setSearchTerm(""); // 검색어 초기화
    setSelectedCategory(null); // 카테고리 초기화
    setFilteredData(DummyMenu.products); // 모든 메뉴로 초기화
    setIsSearching(false); // 검색 상태 해제
  };

  // 엔터키로 검색 수행하는 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMenu();
    }
  };

  return (
    <div className="menulist-container">
      <div className="menu-search-bar">
        <div className="menu-search-info">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="찾고 싶은 메뉴"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="menu-search-btnBox">
          <button className="menu-search-btn" onClick={searchMenu}>
            찾아보기
          </button>
          <button className="menu-search-clear" onClick={resetSearch}>
            초기화
          </button>
        </div>
      </div>

      {/* isSearching이 true일 때 카테고리 버튼 숨김 */}
      {!isSearching && (
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
      )}
      {/* 필터링된 데이터를 MenuInfo 컴포넌트에 전달 */}
      <MenuInfo data={{ products: filteredData }} />
    </div>
  );
};

export default MenuList;
