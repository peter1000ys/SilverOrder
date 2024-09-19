import React, { useState } from 'react';
import './MenuList.css';

const MenuList = ({ onMenuSelect }) => {
  // Menus with categories
  const menus = [
    {
      id: 1,
      name: '코코넛 커피 스무디',
      description: '맛있는 코코넛 커피 스무디입니다.',
      image: '/shinemusket_juice.webp',
      category: '음료',
    },
    {
      id: 2,
      name: '레드오렌지주스',
      description: '신선한 레드오렌지 주스입니다.',
      image: '/shinemusket_juice.webp',
      category: '음료',
    },
    {
      id: 3,
      name: '샤인머스켓주스',
      description: '달콤한 샤인머스켓 주스입니다.',
      image: '/shinemusket_juice.webp',
      category: '음료',
    },
    {
      id: 4,
      name: '딸기 케이크',
      description: '신선한 딸기 케이크입니다.',
      image: '/basic.png',
      category: '디저트',
    },
    {
      id: 5,
      name: '초코 브라우니',
      description: '맛있는 초코 브라우니입니다.',
      image: '/basic.png',
      category: '디저트',
    },
    {
      id: 6,
      name: '블루베리 치즈케이크',
      description: '달콤한 블루베리 치즈케이크입니다.',
      image: '/basic.png',
      category: '디저트',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('음료'); // Default category
  const menusPerPage = 3; // Show 3 items per page

  // Filter menus based on the selected category
  const filteredMenus = menus.filter(menu => menu.category === selectedCategory);

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

  return (
    <div className="menu-list">
      {/* Category dropdown */}
      <div className="category-toggle">
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="음료">음료</option>
          <option value="디저트">디저트</option>
        </select>
      </div>

      {/* Menu items */}
      <div className="menu-grid">
        {currentMenu.map((menu) => (
          <div
            key={menu.id}
            className="menu-item"
            onClick={() => onMenuSelect(menu)}
          >
            <img src={menu.image} alt={menu.name} />
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-c">
        <button onClick={prevPage} disabled={currentPage === 1}>이전</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>다음</button>
      </div>
    </div>
  );
};

export default MenuList;
