import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import useMenuStore from '../../stores/menu';
import useInfoStore from '../../stores/infos';
import './EditCategory.css';

const EditMenuCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useInfoStore();
  const { category } = location.state;  
  const [categoryName, setCategoryName] = useState(category.menuCategoryName); 

  const { updateMenuCategory } = useMenuStore(); 

  const handleSave = async () => {
    const updatedCategory = {
      storeId: userInfo.storeId,  
      menuCategoryName: categoryName,  
    };

   
    await updateMenuCategory(category.menuCategoryId, updatedCategory);

    
    navigate('/silverorder/admin/menu/category/edit');
  };

  return (
    <div>
      <Navbar />
      <div className="edit-category-container">
        <h1 className="edit-category-title">카테고리 수정</h1>
        <div className="form-group">
          <label htmlFor="categoryName">카테고리 이름</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <button className="save-button" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default EditMenuCategory;
