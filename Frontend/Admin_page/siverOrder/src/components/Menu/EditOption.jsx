import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import useOptionStore from '../../stores/option';
import useInfoStore from '../../stores/infos';
import './EditOption.css'; 

const EditOption = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { option } = location.state;
  const { userInfo } = useInfoStore();

  const { updateOptionCategory, fetchOptionDetail, optionDetails } = useOptionStore(); // Access zustand functions

  const [optionCategoryTitle, setOptionCategoryTitle] = useState(option.optionCategoryTitle);
  const [optionType, setOptionType] = useState(option.optionType);
  const [options, setOptions] = useState(option.optionDtoList || []);  // Default to an empty array if undefined

  // Fetch the latest option details when component mounts
  useEffect(() => {
    const loadOptionDetails = async () => {
      if (option.optionCategoryId) {
        await fetchOptionDetail(option.optionCategoryId);
      }
    };
    
    loadOptionDetails();
  }, [fetchOptionDetail, option.optionCategoryId]);

  // Update options state when new option details are fetched
  useEffect(() => {
    if (optionDetails && optionDetails.optionDtoList) {
      setOptions(optionDetails.optionDtoList);
    }
  }, [optionDetails]);

  const handleSave = async () => {
    // Ensure all options have a valid optionId
    const validOptions = options.map((opt) => ({
      ...opt,
      optionId: opt.optionId || null,  // Ensure optionId is present or handle null IDs
    }));
  
    const updatedOptionCategory = {
      storeId: userInfo.storeId,
      optionCategoryTitle,
      optionType,
      optionDtoList: validOptions, // This will hold the list of options to update
    };
  
    try {
      // Call zustand action to update the option category
      await updateOptionCategory(option.optionCategoryId, updatedOptionCategory);
      console.log("Submitting option data:", updatedOptionCategory);
      // After saving, navigate back to the option list or menu page
      navigate('/silverorder/admin/menu/category/edit');
    } catch (error) {
      console.error("Error updating option:", error);
    }
  };

  // Handle option name or price changes
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = options.map((opt, i) =>
      i === index ? { ...opt, [field]: value } : opt
    );
    setOptions(updatedOptions);
  };

  return (
    <div>
      <Navbar />
      <div className="edit-option-container">
        <h1 className="edit-option-title">옵션 수정</h1>

        {/* Option Category Title */}
        <div className="form-group">
          <label htmlFor="optionCategoryTitle">옵션 카테고리 이름</label>
          <input
            type="text"
            id="optionCategoryTitle"
            value={optionCategoryTitle}
            onChange={(e) => setOptionCategoryTitle(e.target.value)}
          />
        </div>

        {/* Options List */}
        <div className="options-list">
          <h3>옵션 목록</h3>
          {options && options.length > 0 ? (
            options.map((opt, index) => (
              <div key={opt.optionId} className="form-group option-item">
                <label>옵션 {index + 1}</label>
                <input
                  type="text"
                  value={opt.optionName}
                  onChange={(e) => handleOptionChange(index, 'optionName', e.target.value)}
                  placeholder="옵션 이름"
                />
                <input
                  type="number"
                  value={opt.optionPrice}
                  onChange={(e) => handleOptionChange(index, 'optionPrice', e.target.value)}
                  placeholder="옵션 가격"
                />
              </div>
            ))
          ) : (
            <p>옵션이 없습니다.</p>
          )}
        </div>

        {/* Save Button */}
        <button className="save-button" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default EditOption;
