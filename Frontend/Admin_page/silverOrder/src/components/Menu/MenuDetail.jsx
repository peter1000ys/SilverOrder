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
    if (!menu.menuId) {
        Notiflix.Notify.failure("메뉴 ID가 없습니다. 다시 시도해 주세요.");
        return;
    }
    navigate('/silverorder/admin/menu/Edit', { state: { menuId: menu.menuId, menu } });
  };


  return (
    <div className="menu-detail">
      <div className="menu-header">
        <h5>메뉴 상세 정보</h5>
        <h5>{menu.menuName}</h5> 
      </div>

      <div className="menu-detail-content">
        <div className="menu-info">
          <table>
            <tbody>
              <tr>
                <td>메뉴 상태: {menu.menuStatus}</td>

              </tr>
              <tr>
                <td>분류: {menu.menuCategoryName}</td>

              </tr>
              <tr>
                <td>금액: {menu.menuPrice.toLocaleString()} 원</td>

              </tr>
              <tr className="menu-description">
                <td>설명:  {menu.menuDesc}</td>

              </tr>
              <tr className="menu-option">
                <td>옵션:
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
