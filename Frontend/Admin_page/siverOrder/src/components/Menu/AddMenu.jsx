import React, { useState } from 'react';

const AddMenu = () => {
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');

  const handleMenuSubmit = () => {
    alert(`새 메뉴 추가: ${menuName}, 설명: ${menuDescription}`);
    setMenuName('');
    setMenuDescription('');
  };

  return (
    <div className="new-menu-form">
      <h3>새 상품 추가</h3>
      <input
        type="text"
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)}
        placeholder="메뉴 이름"
      />
      <textarea
        value={menuDescription}
        onChange={(e) => setMenuDescription(e.target.value)}
        placeholder="메뉴 설명"
      />
      <button onClick={handleMenuSubmit}>추가</button>
    </div>
  );
};

export default AddMenu;
