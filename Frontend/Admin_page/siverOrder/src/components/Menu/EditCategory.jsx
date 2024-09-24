import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import useMenuStore from '../../stores/menu';
import useOptionStore from '../../stores/option';
import './EditCategory.css'; 

const EditCategory = () => {
  const { menuCategories, fetchCategories } = useMenuStore();
  const { options, fetchOptions } = useOptionStore();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState('category'); 

  useEffect(() => {
    fetchCategories();
    fetchOptions();
  }, [fetchCategories, fetchOptions]);

  
  const handleEditClick = (item, type) => {
    if (type === 'category') {
      navigate('/silverorder/admin/menu/category/edit/menu', { state: { category: item } });
    } else if (type === 'option') {
      navigate('/silverorder/admin/menu/category/edit/option', { state: { option: item } });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="edit-category-container">
        <h1 className="edit-category-title">카테고리 및 옵션 수정</h1>

        {/* Select whether to show categories or options */}
        <div className="selection-toggle">
          <button
            className={selectedType === 'category' ? 'selected' : ''}
            onClick={() => setSelectedType('category')}
          >
            카테고리 보기
          </button>
          <button
            className={selectedType === 'option' ? 'selected' : ''}
            onClick={() => setSelectedType('option')}
          >
            옵션 보기
          </button>
        </div>

        {/* Conditional rendering for category or option */}
        {selectedType === 'category' && (
          <div className="category-list">
            <h3>카테고리 목록</h3>
            <ul>
              {menuCategories.map((category) => (
                <li key={category.menuCategoryId} className="list-item">
                  <span>{category.menuCategoryName}</span>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(category, 'category')}
                  >
                    수정
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedType === 'option' && (
          <div className="option-list">
            <h3>옵션 목록</h3>
            <ul>
              {options.map((option) => (
                <li key={option.optionCategoryId} className="list-item">
                  <span>{option.optionCategoryTitle}</span>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(option, 'option')}
                  >
                    수정
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCategory;
