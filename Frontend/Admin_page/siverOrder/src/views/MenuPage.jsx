import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import '../styles/MenuPage.css';
import MenuList from '../components/Menu/MenuList.jsx';
import AddMenu from '../components/Menu/AddMenu.jsx';
import MenuDetail from '../components/Menu/MenuDetail.jsx';
import SelectCategory from '../components/Menu/SelectCategory.jsx';
import OptionCategory from '../components/Menu/OptionCategory.jsx';
import MenuCategory from '../components/Menu/MenuCategory.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuPage = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [activeComponent, setActiveComponent] = useState('');

    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
        setActiveComponent('');
    };

    const handleCategoryClick = () => {
        setActiveComponent('selectCategory');
    };

    const handleNewMenuClick = () => {
        setActiveComponent('newMenu');
    };

    const handleOptionSelect = () => {
        setActiveComponent('optionCategory');
    };

    const handleMenuSelectCategory = () => {
        setActiveComponent('menuCategory');
    };

    const handleCancel = () => {
        setActiveComponent('');
    };

    const handleSubmit = () => {
        // Add logic to handle submission here
        setActiveComponent('');
    };

    return (
        <div className="menu-page">
            <Navbar />
            <div className="menu-content">
                <MenuList onMenuSelect={handleMenuSelect} />
                <div className="menu-detail-container">
                    {selectedMenu && activeComponent === '' && (
                        <MenuDetail menu={selectedMenu} />
                    )}
                    {activeComponent === 'selectCategory' && (
                        <SelectCategory 
                            onOptionSelect={handleOptionSelect} 
                            onMenuSelect={handleMenuSelectCategory} 
                        />
                    )}
                    {activeComponent === 'optionCategory' && (
                        <OptionCategory onCancel={handleCancel} onSubmit={handleSubmit} />
                    )}
                    {activeComponent === 'menuCategory' && (
                        <MenuCategory onCancel={handleCancel} onSubmit={handleSubmit} />
                    )}
                    {activeComponent === 'newMenu' && <AddMenu />}
                </div>
                <div className="menu-actions">
                    <button onClick={handleCategoryClick}>카테고리 추가</button>
                    <button onClick={handleNewMenuClick}>상품 추가</button>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
