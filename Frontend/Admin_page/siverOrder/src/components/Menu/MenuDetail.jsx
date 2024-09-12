import React from 'react';
import './MenuDetail.css';

const MenuDetail = ({ menu }) => {
  return (
    <div>
      <h2>{menu.name}</h2>
      <img src={menu.image} alt={menu.name} />
      <p>{menu.description}</p>
    </div>
  );
};

export default MenuDetail;
