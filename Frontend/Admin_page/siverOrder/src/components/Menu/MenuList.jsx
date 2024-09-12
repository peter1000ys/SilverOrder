import React, { useState } from 'react';
import './MenuList.css';

const MenuList = ({ onMenuSelect }) => {
  const menus = [
    {
      id: 1,
      name: '코코넛 커피 스무디',
      description: '맛있는 코코넛 커피 스무디입니다.',
      image: '/shinemusket_juice.webp',
    },
    {
      id: 2,
      name: '레드오렌지주스',
      description: '신선한 레드오렌지 주스입니다.',
      image: '/shinemusket_juice.webp',
    },
    {
      id: 3,
      name: '샤인머스켓주스',
      description: '달콤한 샤인머스켓 주스입니다.',
      image: '/shinemusket_juice.webp',
    },
    {
      id: 4,
      name: '코코넛 커피 스무디',
      description: '맛있는 코코넛 커피 스무디입니다.',
      image: '/shinemusket_juice.webp',
    },
    {
      id: 5,
      name: '레드오렌지주스',
      description: '신선한 레드오렌지 주스입니다.',
      image: '/shinemusket_juice.webp',
    },
    {
      id: 6,
      name: '샤인머스켓주스',
      description: '달콤한 샤인머스켓 주스입니다.',
      image: '/shinemusket_juice.webp',
    },

  ];

  const [currentPage, setCurrentPage] = useState(1);
  const menusPerPage = 6;

  const indexOfLastMenu = currentPage * menusPerPage;
  const indexOfFirstMenu = indexOfLastMenu - menusPerPage;
  const currentMenu = menus.slice(indexOfFirstMenu, indexOfLastMenu);

  const totalPages = Math.ceil(menus.length / menusPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="menu-list">
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
    </div>
  );
};

export default MenuList;
