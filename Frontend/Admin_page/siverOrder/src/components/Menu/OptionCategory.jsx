import React, { useState } from 'react';
import './Category.css';
import useInfoStore from '../../stores/infos';
import useOptionStore from '../../stores/option';

const OptionCategory = ({ onCancel }) => {
    const [optionCategoryTitle, setOptionCategoryTitle] = useState(''); 
    const [optionType, setOptionType] = useState('OPTION_RADIO');
    const [optionName, setOptionName] = useState('');
    const [optionPrice, setOptionPrice] = useState('');
    const [optionDtoList, setOptionDtoList] = useState([]);
    const { userInfo } = useInfoStore();
    const { createOption } = useOptionStore();  // createOption 함수 불러오기

    const handleAddOption = () => {
        if (optionName && optionPrice) {
            const newOption = { optionName, optionPrice: Number(optionPrice) };
            setOptionDtoList([...optionDtoList, newOption]);
            setOptionName('');
            setOptionPrice('');
        }
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...optionDtoList];
        updatedOptions.splice(index, 1);
        setOptionDtoList(updatedOptions);
    };

    const handleFormSubmit = () => {
        const data = {
            storeId: userInfo.storeId,
            optionCategoryTitle,
            optionType,
            optionDtoList
        };
        console.log(data);
        // createOption 함수 호출
        createOption(data);
    };

    return (
        <div className="option-category">

            <div className="form-group">
                <label>옵션 카테고리 이름</label>
                <input
                    type="text"
                    value={optionCategoryTitle}
                    onChange={(e) => setOptionCategoryTitle(e.target.value)}
                    placeholder="옵션 카테고리 이름 입력"
                    required
                />
            </div>

            <div className="form-group">
                <label>옵션 이름</label>
                <input
                    type="text"
                    value={optionName}
                    onChange={(e) => setOptionName(e.target.value)}
                    placeholder="옵션 이름 입력"
                    required
                />
            </div>

            <div className="form-group">
                <label>옵션 가격</label>
                <input
                    type="number"
                    value={optionPrice}
                    onChange={(e) => setOptionPrice(e.target.value)}
                    placeholder="옵션 가격 입력"
                    required
                />
            </div>

            <button type="button" className="add-option-button" onClick={handleAddOption}>
                세부 옵션 추가
            </button>

            <h3>추가된 세부 옵션</h3>
            <ul className="added-options-list">
                {optionDtoList.map((option, index) => (
                    <li key={index}>
                        {option.optionName} - {option.optionPrice}원
                        <button
                            type="button"
                            className="remove-option-button"
                            onClick={() => handleRemoveOption(index)}
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>

            <div className="action-buttons">
                <button className="cancel" onClick={onCancel}>취소</button>
                <button className="submit" onClick={handleFormSubmit}>옵션 카테고리 추가</button>
            </div>
        </div>
    );
};

export default OptionCategory;
