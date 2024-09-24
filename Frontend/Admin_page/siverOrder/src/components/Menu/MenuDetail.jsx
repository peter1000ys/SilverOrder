import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMenuStore from '../../stores/menu';  
import './MenuDetail.css';

const MenuDetail = ({ menu }) => {
  const navigate = useNavigate();
  const { fetchMenuOptions, menuOptions } = useMenuStore();  
  const [optionsLoaded, setOptionsLoaded] = useState(false); 

  useEffect(() => {
    const loadOptions = async () => {
      await fetchMenuOptions(menu.menuId); 
      setOptionsLoaded(true); 
    };

    loadOptions();
  }, [menu.menuId, fetchMenuOptions]);

  const handleEditClick = () => {
    navigate('/silverorder/admin/menu/Edit', { state: { menu } });
  };

  return (
    <div className="menu-detail">
      <div className="menu-header">
        <h3>메뉴 상세 정보</h3>
        <h2>{menu.menuName}</h2> 
      </div>

      <div className="menu-detail-content">
        <div className="menu-info">
          <table>
            <tbody>
              <tr>
                <td>이미지:</td>
                <td>
                  <img src={menu.menuThumb} alt={menu.menuName} width="200" />
                </td>
              </tr>
              <tr>
                <td>분류:</td>
                <td>{menu.menuCategoryName}</td> 
              </tr>
              <tr>
                <td>금액:</td>
                <td>{menu.menuPrice.toLocaleString()} 원</td> 
              </tr>
              <tr className="menu-description">
                <td>설명:</td>
                <td>{menu.menuDesc}</td> 
              </tr>
              <tr className="menu-option">
                <td>옵션:</td>
                <td>
                  {optionsLoaded
                    ? menuOptions.length > 0
                      ? menuOptions
                          .map(option => option.optionCategoryTitle)
                          .join(', ')  
                      : '옵션 없음'
                    : '옵션 로딩 중...'} 
                </td>
              </tr>
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="cancel" onClick={() => navigate('/silverorder/admin/menu')}>
              취소
            </button> 
            <button className="accept" onClick={handleEditClick}>
              수정
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
