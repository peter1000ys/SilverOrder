import { useState, useEffect } from "react";
import useMenuStore from "../../stores/menu"; // Zustand 스토어 가져오기
import "./Styles/MenuList.css";
import MenuInfo from "./MenuInfo";

const MenuList = () => {
  const { fetchMenulistAPI, menuList } = useMenuStore();

  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태
  const [filteredData, setFilteredData] = useState(menuList); // 필터링된 데이터를 저장하는 상태
  const [searchTerm, setSearchTerm] = useState(""); // 입력된 검색어를 저장하는 상태
  const [isSearching, setIsSearching] = useState(false); // 현재 검색 중인지 여부를 나타내는 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 메뉴 데이터를 가져옴
    const fetchData = async () => {
      await fetchMenulistAPI(); // API 호출이 완료될 때까지 대기
    };
    fetchData();
  }, [fetchMenulistAPI]); // fetchMenulistAPI가 변경될 때마다 실행

  useEffect(() => {
    // menuList가 변경될 때마다 필터링된 데이터 설정
    setFilteredData(menuList);
  }, [menuList]); // menuList가 변경될 때마다 실행

  // "커피" 카테고리로 필터링하는 함수
  const showCoffees = () => {
    if (selectedCategory === "커피") {
      setSelectedCategory(null); // 동일한 카테고리 선택 시 선택 해제
      setFilteredData(menuList); // 전체 메뉴로 초기화
    } else {
      setSelectedCategory("커피");
      const coffees = menuList.filter(
        (product) => product.menuCategoryName === "커피"
      );
      setFilteredData(coffees);
      setIsSearching(false); // 카테고리 필터링 시 검색 상태 해제
    }
  };

  // "커피" 카테고리로 필터링하는 함수
  const showTeas = () => {
    if (selectedCategory === "차") {
      setSelectedCategory(null); // 동일한 카테고리 선택 시 선택 해제
      setFilteredData(menuList); // 전체 메뉴로 초기화
    } else {
      setSelectedCategory("차");
      const teas = menuList.filter(
        (product) => product.menuCategoryName === "차"
      );
      setFilteredData(teas);
      setIsSearching(false); // 카테고리 필터링 시 검색 상태 해제
    }
  };

  // "디저트" 카테고리로 필터링하는 함수
  const showDesserts = () => {
    if (selectedCategory === "디저트") {
      setSelectedCategory(null); // 동일한 카테고리 선택 시 선택 해제
      setFilteredData(menuList); // 전체 메뉴로 초기화
    } else {
      setSelectedCategory("디저트");
      const desserts = menuList.filter(
        (product) => product.menuCategoryName === "디저트"
      );
      setFilteredData(desserts);
      setIsSearching(false); // 카테고리 필터링 시 검색 상태 해제
    }
  };

  // 검색어를 이용해 메뉴를 필터링하는 함수
  const searchMenu = () => {
    const searchResults = menuList.filter((product) =>
      product.menuName.includes(searchTerm)
    );
    setFilteredData(searchResults);
    setIsSearching(true); // 검색 상태를 활성화
    setSelectedCategory(null); // 검색 시 카테고리 선택을 해제
    setSearchTerm(""); // 검색 후 입력 필드를 초기화
  };

  // 검색 상태를 초기화하는 함수
  const resetSearch = () => {
    setSearchTerm(""); // 검색어 초기화
    setSelectedCategory(null); // 카테고리 선택 초기화
    setFilteredData(menuList); // 전체 메뉴를 다시 보여줌
    setIsSearching(false); // 검색 상태 해제
  };

  // Enter 키를 누르면 검색을 수행하는 함수
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
            onKeyDown={handleKeyDown} // Enter 키를 처리
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

      {/* 검색 중일 때 카테고리 버튼을 숨김 */}
      {!isSearching && (
        <div className="menu-category-choose">
          {/* 카테고리 선택에 따라 스타일이 변경되도록 className 설정 */}
          <button
            className={`menu-category-btn01 ${
              selectedCategory === "커피" ? "active" : ""
            }`}
            onClick={showCoffees}
          >
            커피
          </button>
          <button
            className={`menu-category-btn02 ${
              selectedCategory === "차" ? "active" : ""
            }`}
            onClick={showTeas}
          >
            차
          </button>
          <button
            className={`menu-category-btn03 ${
              selectedCategory === "디저트" ? "active" : ""
            }`}
            onClick={showDesserts}
          >
            디저트
          </button>
        </div>
      )}

      {/* 필터링된 데이터를 MenuInfo 컴포넌트에 전달 */}
      <MenuInfo data={{ products: filteredData }} />
    </div>
  );
};

export default MenuList;
