import React, { useEffect, useState } from 'react';
import './MenuList.css';
import useMenuStore from '../../stores/menu';  

const MenuList = ({ onMenuSelect }) => {
  const { menus, fetchMenus } = useMenuStore();  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const menusPerPage = 3; 

  useEffect(() => {
    const loadMenus = async () => {
      try {
        await fetchMenus();  
        setLoading(false);   
      } catch (err) {
        setError('메뉴 목록을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    loadMenus(); 
  }, [fetchMenus]); 


  const categories = [...new Set(menus.map(menu => menu.menuCategoryName))];


  const filteredMenus = selectedCategory
    ? menus.filter(menu => menu.menuCategoryName === selectedCategory)
    : menus;


  const indexOfLastMenu = currentPage * menusPerPage;
  const indexOfFirstMenu = indexOfLastMenu - menusPerPage;
  const currentMenu = filteredMenus.slice(indexOfFirstMenu, indexOfLastMenu);
  const totalPages = Math.ceil(filteredMenus.length / menusPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };


  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="menu-list">
      <div className="category-toggle">
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">전체</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-grid">
        {currentMenu.length > 0 ? (
          currentMenu.map((menu) => (
            <div
              key={menu.menuId}
              className="menu-item"
              onClick={() => onMenuSelect(menu)}
            >
              <img src={menu.menuThumb} alt={menu.menuName} />
              <h3>{menu.menuName}</h3>
              <p>{menu.menuDesc}</p>
              <p>가격: {menu.menuPrice}원</p>
            </div>
          ))
        ) : (
          <p>해당 카테고리에 메뉴가 없습니다.</p>
        )}
      </div>


      <div className="pagination-c">
        <button onClick={prevPage} disabled={currentPage === 1}>이전</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>다음</button>
      </div>
    </div>
  );
};

export default MenuList;
