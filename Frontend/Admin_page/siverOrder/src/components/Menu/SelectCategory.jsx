import React from 'react';
import './SelectCategory.css';

const SelectCategory = ({ onOptionSelect, onMenuSelect }) => {
  return (
    <div className="select-category">
      <button onClick={onOptionSelect}>옵션</button>
      <div>or</div>
      <button onClick={onMenuSelect}>메뉴</button>
    </div>
  );
};

export default SelectCategory;
