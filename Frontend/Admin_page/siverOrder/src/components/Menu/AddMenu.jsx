import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './AddMenu.css';

const AddMenu = () => {
    const [menuName, setMenuName] = useState('');
    const [shortName, setShortName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [recommendation, setRecommendation] = useState(1); // Default to "추천"
    const [menuImage, setMenuImage] = useState(null);

    // Option Management
    const [availableOptions] = useState(["매운맛", "사이즈업", "토핑 추가", "치즈 추가", "양념 추가"]); // Example option list
    const [selectedOption, setSelectedOption] = useState('매운맛'); // Default selected option
    const [addedOptions, setAddedOptions] = useState([]);

    // Menu Category Management
    const [availableCategories] = useState(["음료", "디저트"]); // Example category list
    const [selectedCategory, setSelectedCategory] = useState('음료'); // Default category

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setMenuImage(e.target.files[0]);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleAddOption = () => {
        if (!addedOptions.includes(selectedOption)) {
            setAddedOptions([...addedOptions, selectedOption]);
        }
    };

    const handleRemoveOption = (option) => {
        setAddedOptions(addedOptions.filter(opt => opt !== option));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission here (e.g., send data to the server)
        console.log({
            menuName,
            shortName,
            description,
            price,
            recommendation,
            menuImage,
            category: selectedCategory,
            options: addedOptions
        });

        // Redirect to menu page after submission
        navigate('/silverorder/admin/menu');
    };

    return (
      <div>
        <Navbar />
          <div className="add-menu-container">
            <h1 className="add-menu-title">메뉴 추가</h1>
            <form className="add-menu-form" onSubmit={handleSubmit}>
                {/* Left side - menu details */}
                <div className="form-left">
                    <div className="form-group">
                        <label htmlFor="menuName">메뉴 이름</label>
                        <input
                            type="text"
                            id="menuName"
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="shortName">짧은 이름</label>
                        <input
                            type="text"
                            id="shortName"
                            value={shortName}
                            onChange={(e) => setShortName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">메뉴 설명</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">메뉴 가격</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>사장님 추천</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    value={1}
                                    checked={recommendation === 1}
                                    onChange={() => setRecommendation(1)}
                                />
                                추천
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value={0}
                                    checked={recommendation === 0}
                                    onChange={() => setRecommendation(0)}
                                />
                                비추천
                            </label>
                        </div>
                    </div>

                </div>

                {/* Right side - image upload and options */}
                <div className="form-right">
                  {/* Menu Category Selection */}
                  <div className="form-group">
                        <label htmlFor="category">메뉴 카테고리</label>
                        <div className="option-selector">
                        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                            {availableCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        </div>
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="menuImage">메뉴 사진 등록</label>
                        <input
                            type="file"
                            id="menuImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="options">옵션 선택</label>
                        <div className="option-selector">
                            <select id="options" value={selectedOption} onChange={handleOptionChange}>
                                {availableOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="add-option-button" onClick={handleAddOption}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>추가된 옵션</label>
                        <ul className="added-options-list">
                            {addedOptions.map((option, index) => (
                                <li key={index}>
                                    {option}
                                    <button type="button" className="remove-option-button" onClick={() => handleRemoveOption(option)}>
                                        x
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit" className="submit-button">메뉴 등록</button>
                </div>
            </form>
        </div>
      </div>
        
    );
};

export default AddMenu;
