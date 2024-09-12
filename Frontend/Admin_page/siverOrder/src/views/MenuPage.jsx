import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import '../styles/MenuPage.css';
import MenuList from '../components/Menu/MenuList.jsx';
// import AddMenu from '../components/Menu/AddMenu.jsx';
// import AddCategory from '../components/Menu/AddCategory.jsx';
import MenuDetail from '../components/Menu/MenuDetail.jsx';

const MenuPage = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [activeComponent, setActiveComponent] = useState('');

    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
        setActiveComponent('');
    };

    const handleCategoryClick = () => {
        setActiveComponent('category');
    };
    
    const handleNewMenuClick = () => {
        setActiveComponent('newMenu');
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
                </div>
                {/* {activeComponent === 'category' && <AddCategory />}
                {activeComponent === 'newMenu' && <AddMenu />} */}
                <div className="menu-actions">
                    <button onClick={handleCategoryClick}>카테고리 추가</button>
                    <button onClick={handleNewMenuClick}>상품 추가</button>
                </div>
            </div>
        </div>
    );
}

export default MenuPage;
