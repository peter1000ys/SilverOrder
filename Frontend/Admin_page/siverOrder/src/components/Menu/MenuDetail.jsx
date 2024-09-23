import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMenuStore from '../../stores/menu';  // Import the store
import './MenuDetail.css';

const MenuDetail = ({ menu }) => {
  const navigate = useNavigate();
  const { fetchMenuOptions, menuOptions } = useMenuStore();  // Destructure menuOptions and fetchMenuOptions from the store
  const [optionsLoaded, setOptionsLoaded] = useState(false); // To check if options are loaded

  useEffect(() => {
    const loadOptions = async () => {
      await fetchMenuOptions(menu.menuId); // Fetch options based on the menuId
      setOptionsLoaded(true);  // Set the flag once options are loaded
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
        <h2>{menu.menuName}</h2> {/* Updated to use the correct menu name from API */}
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
                <td>{menu.menuCategoryName}</td> {/* Use the actual category from API */}
              </tr>
              <tr>
                <td>금액:</td>
                <td>{menu.menuPrice.toLocaleString()} 원</td> {/* Display formatted price */}
              </tr>
              <tr className="menu-description">
                <td>설명:</td>
                <td>{menu.menuDesc}</td> {/* Use the description from API */}
              </tr>
              <tr className="menu-option">
                <td>옵션:</td>
                <td>
                  {optionsLoaded
                    ? menuOptions.length > 0
                      ? menuOptions
                          .map(option => option.optionCategoryTitle)
                          .join(', ')  // Show optionCategoryTitle of each option
                      : '옵션 없음'
                    : '옵션 로딩 중...'}  {/* Show loading message if options are being fetched */}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="cancel" onClick={() => navigate('/silverorder/admin/menu')}>
              취소
            </button> {/* Go back to the menu list */}
            <button className="accept" onClick={handleEditClick}>
              수정
            </button> {/* Edit the current menu */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
