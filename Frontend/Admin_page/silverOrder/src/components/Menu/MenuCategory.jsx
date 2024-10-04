import React, { useState, useEffect } from 'react';
import './Category.css';
import useInfoStore from '../../stores/infos';
import useMenuStore from '../../stores/menu';

const MenuCategory = ({ onCancel, onSubmit }) => {
  const { userInfo } = useInfoStore();  // myInfo에서 userInfo를 가져옴
  const { createMenuCategory, fetchCategories } = useMenuStore();  // createMenuCategory와 fetchCategories 함수 가져오기
  const [menuCategoryName, setMenuCategoryName] = useState('');  // 카테고리 이름 상태 관리

  // 페이지 접속 시 fetchCategories 호출
  useEffect(() => {
    fetchCategories();  // 카테고리 목록 불러오기
  }, [fetchCategories]);  // 의존성 배열에 fetchCategories 추가

  const handleFormSubmit = () => {
    const newCategory = {
      storeId: userInfo.storeId,  // storeId를 userInfo에서 가져옴
      menuCategoryName: menuCategoryName,  // 사용자가 입력한 카테고리 이름
    };

    createMenuCategory(newCategory);  // 카테고리 생성 함수 호출
    onSubmit();  // 모달을 닫는 함수
  };

  const handleCancel = () => {
    onCancel();  // 모달을 닫는 함수
    window.location.reload();  // 취소 후 페이지 새로고침
  };

  return (
    <div className="menu-category">
      <h2>메뉴 카테고리 추가</h2>
      <label>카테고리 이름</label>
      <input
        type="text"
        value={menuCategoryName}
        onChange={(e) => setMenuCategoryName(e.target.value)}  // 입력 필드 업데이트
        placeholder="카테고리 이름을 입력하세요"
        required
      />
      <div className="action-buttons">
        <button className="cancel" onClick={handleCancel}>취소</button>
        <button className="submit" onClick={handleFormSubmit}>추가</button>
      </div>
    </div>
  );
};

export default MenuCategory;
