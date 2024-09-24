import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './AddMenu.css';
import useInfoStore  from '../../stores/infos';
import useMenuStore from '../../stores/menu';
import useOptionStore from '../../stores/option';

const AddMenu = () => {
    const { userInfo } = useInfoStore();  // storeId를 가져오기 위해
    const { menuCategories, fetchCategories, createMenu } = useMenuStore();
    const { options, fetchOptions } = useOptionStore();

    const [menuName, setMenuName] = useState('');
    const [shortName, setShortName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [recommendation, setRecommendation] = useState(1); // Default to "추천"
    const [menuImage, setMenuImage] = useState(null);

    // Option Management
    const [availableOptions, setAvailableOptions] = useState([]); // Example option list
    const [selectedOption, setSelectedOption] = useState(1); // Default selected option
    const [addedOptions, setAddedOptions] = useState([]);

    // Menu Category Management
    const [availableCategories, setAvailableCategories] = useState([]); // Example category list
    const [selectedCategory, setSelectedCategory] = useState(1); // Default category

    useEffect(() => {
        const loadData = async () => {
            await fetchCategories();  // 메뉴 카테고리 데이터를 불러옴
            await fetchOptions();     // 옵션 데이터를 불러옴
        };
    
        loadData();  // 데이터를 불러오는 함수 호출
    }, [fetchCategories, fetchOptions]);  // 첫 마운트 시에만 호출
    
    // 데이터를 불러온 후 availableCategories와 availableOptions가 업데이트되는 시점에 로그를 출력
    useEffect(() => {
        if (menuCategories.length > 0 || options.length > 0) {
            setAvailableCategories(menuCategories);
            setAvailableOptions(options);
            
            // 데이터가 설정된 후 로그 출력
            console.log('Categories:', menuCategories);
            console.log('Options:', options);
        }
    }, [menuCategories, options]);
    
    

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
        // 선택된 옵션이 이미 추가된 옵션 목록에 없으면 추가
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
         // 메뉴 등록을 위한 데이터 준비
         const newMenu = {
            storeId: userInfo.storeId,
            menuCategoryId: selectedCategory,  // 선택한 카테고리 ID
            menuName: menuName,
            simpleName: shortName,
            menuDesc: description,
            menuStatus: 'MENU_READY',  // 상태 기본 값 설정
            menuPrice: parseInt(price, 10),
            recommend: recommendation,
            useOptionCategory: addedOptions.map(option => option.optionCategoryId),  // Only send optionCategoryId
            menuThumb: menuImage ? menuImage.name : ''  // 이미지 파일 이름
        };
    
        console.log("Submitting menu data:", newMenu);  // 전송 전 데이터 확인
    
        // 메뉴 생성 API 호출
        await createMenu(newMenu);
    
        // 등록 후 메뉴 페이지로 리다이렉트
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="options">옵션 선택</label>
                        <div className="option-selector">
                            <select id="options" value={selectedOption} onChange={handleOptionChange}>
                                {availableOptions.map((option) => (
                                    <option key={option.optionCategoryId} value={option.optionCategoryId}>
                                        {option.optionCategoryTitle}  {/* 옵션의 제목을 표시 */}
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
                                <li key={option.optionCategoryId}>
                                    {option.optionCategoryTitle} {/* 옵션의 이름을 표시 */}
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
