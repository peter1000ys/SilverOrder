import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './AddMenu.css';
import useMenuStore from '../../stores/menu';
import useOptionStore from '../../stores/option';

const EditMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { menu } = location.state;
    const { updateMenu, menuCategories, fetchCategories } = useMenuStore();
    const { options, fetchOptions } = useOptionStore();

    // State variables pre-populated with the menu data
    const [menuName, setMenuName] = useState(menu.menuName || '');
    const [shortName, setShortName] = useState(menu.simpleName || '');
    const [description, setDescription] = useState(menu.menuDesc || '');
    const [price, setPrice] = useState(menu.menuPrice || '');
    const [recommendation, setRecommendation] = useState(menu.recommend || 1);
    const [menuImage, setMenuImage] = useState(menu.menuThumb || null);
    const [addedOptions, setAddedOptions] = useState(menu.useOptionCategory || []);
    const [menuStatus, setMenuStatus] = useState(menu.menuStatus || 'MENU_READY');  // Default to 'MENU_READY'

    // Categories and options
    const [availableOptions, setAvailableOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [availableCategories, setAvailableCategories] = useState([{ id: menu.menuCategoryId, name: menu.menuCategoryName }]);
    const [selectedCategory, setSelectedCategory] = useState(menu.menuCategoryId || '');

    // Fetch options when the component mounts
    useEffect(() => {
        const loadData = async () => {
            await fetchCategories();  // 메뉴 카테고리 데이터를 불러옴
            await fetchOptions();     // 옵션 데이터를 불러옴
        };
    
        loadData();  // 데이터를 불러오는 함수 호출
    }, [fetchCategories, fetchOptions]);

    useEffect(() => {
        if (menuCategories.length > 0 || options.length > 0) {
            setAvailableCategories(menuCategories);
            setAvailableOptions(options);
        }
    }, [menuCategories, options]);

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
        const selected = availableOptions.find(opt => opt.optionCategoryId === parseInt(selectedOption));
        if (selected && !addedOptions.some(option => option.optionCategoryId === selected.optionCategoryId)) {
            setAddedOptions([...addedOptions, selected]);
        }
    };

    const handleRemoveOption = (optionToRemove) => {
        setAddedOptions(addedOptions.filter(option => option.optionCategoryId !== optionToRemove.optionCategoryId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMenu = {
            menuId: menu.menuId,  // Include the menu ID for updating
            menuCategoryId: selectedCategory,
            menuName: menuName,
            simpleName: shortName,
            menuDesc: description,
            menuStatus: menuStatus,  // Use the selected menuStatus
            menuPrice: parseInt(price, 10),
            recommend: recommendation,
            useOptionCategory: addedOptions.map(option => option.optionCategoryId),  // Send only option IDs
            menuThumb: menuImage ? menuImage.name : menu.menuThumb  // If no new image is uploaded, use the existing image
        };

        console.log("Submitting updated menu data:", updatedMenu);

        
        await updateMenu(updatedMenu);

        // Redirect to the menu list after updating
        navigate('/silverorder/admin/menu');
    };

    return (
        <div>
            <Navbar />
            <div className="add-menu-container">
                <h1 className="add-menu-title">메뉴 수정</h1>
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

                        {/* Menu Status Select */}
                        <div className="form-group">
                            <label htmlFor="menuStatus">메뉴 상태</label>
                            <select
                                id="menuStatus"
                                value={menuStatus}
                                onChange={(e) => setMenuStatus(e.target.value)}
                            >
                                <option value="MENU_READY">준비됨</option>
                                <option value="MENU_SOLD_OUT">매진</option>
                                <option value="MENU_DISCONTINUED">판매 중지</option>
                            </select>
                        </div>
                    </div>

                    {/* Right side - image upload and options */}
                    <div className="form-right">
                        <div className="form-group">
                            <label htmlFor="category">메뉴 카테고리</label>
                            <div className="option-selector">
                                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                                    {availableCategories.map((category) => (
                                        <option key={category.menuCategoryId} value={category.menuCategoryId}>
                                            {category.menuCategoryName}
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
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="options">옵션 선택</label>
                            <select id="options" value={selectedOption} onChange={handleOptionChange}>
                                {availableOptions.map((option) => (
                                    <option key={option.optionCategoryId} value={option.optionCategoryId}>
                                        {option.optionCategoryTitle}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="add-option-button" onClick={handleAddOption}>
                                +
                            </button>
                        </div>

                        <div className="form-group">
                            <label>추가된 옵션</label>
                            <ul className="added-options-list">
                                {addedOptions.map((option) => (
                                    <li key={option.optionCategoryId}>
                                        {option.optionCategoryTitle}
                                        <button type="button" className="remove-option-button" onClick={() => handleRemoveOption(option)}>
                                            x
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button type="submit" className="submit-button">메뉴 수정</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMenu;
