import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import '../styles/MenuPage.css';
import MenuList from '../components/Menu/MenuList.jsx';
import MenuDetail from '../components/Menu/MenuDetail.jsx';
import SelectCategory from '../components/Menu/SelectCategory.jsx';
import OptionCategory from '../components/Menu/OptionCategory.jsx';
import MenuCategory from '../components/Menu/MenuCategory.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuPage = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [activeComponent, setActiveComponent] = useState('');
    const [showOptionModal, setShowOptionModal] = useState(false);
    const navigate = useNavigate();

    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
        setActiveComponent('');
    };

    const handleCategoryClick = () => {
        setActiveComponent('selectCategory');
    };

    const handleCategoryEditClick = () => {
        navigate('/silverorder/admin/menu/category/edit');
    };

    const handleNewMenuClick = () => {
        navigate('/silverorder/admin/menu/AddMenu');
    };

    const handleOptionSelect = () => {
        setShowOptionModal(true);
    };

    const handleMenuSelectCategory = () => {
        setActiveComponent('menuCategory');
    };

    const handleCancel = () => {
        setShowOptionModal(false);
    };

    const handleSubmit = () => {
        setShowOptionModal(false);
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
                    {activeComponent === 'menuCategory' && (
                        <MenuCategory onCancel={handleCancel} onSubmit={handleSubmit} />
                    )}
                </div>
                <div className="menu-actions">
                    <button onClick={handleCategoryEditClick}>카테고리 수정</button>
                    <button onClick={handleCategoryClick}>카테고리 추가</button>
                    <button onClick={handleNewMenuClick}>상품 추가</button>
                </div>
            </div>

            
            <div className={`modal fade ${showOptionModal ? 'show' : ''}`} style={{ display: showOptionModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">옵션 카테고리 추가</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleCancel}></button>
                        </div>
                        <div className="modal-body">
                            <OptionCategory onCancel={handleCancel} onSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>

            
            {showOptionModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default MenuPage;
