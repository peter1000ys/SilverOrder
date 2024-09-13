import React from 'react';
import './Category.css';

const MenuCategory = ({ onCancel, onSubmit }) => {
  return (
    <div className="menu-category">
      <h2>메뉴</h2>
      <label>카테고리 이름</label>
      <input type="text" />
      <div className="action-buttons">
        <button className="cancel" onClick={onCancel}>취소</button>
        <button className="submit" onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default MenuCategory;
