import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMenuStore from '../../stores/menu';  
import './MenuDetail.css';

const MenuDetail = ({ menu }) => {
  const navigate = useNavigate();
  const { fetchMenuOptions, menuOptions, updateMenuStatus } = useMenuStore();  // updateMenuStatus 추가
  const [optionsLoaded, setOptionsLoaded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(''); // 초기 상태를 빈 문자열로 설정

  useEffect(() => {
    const loadOptions = async () => {
      await fetchMenuOptions(menu.menuId);
      setOptionsLoaded(true);
    };

    loadOptions();
  }, [menu.menuId, fetchMenuOptions]);

  // 메뉴의 상태가 변경될 때마다 selectedStatus 업데이트
  useEffect(() => {
    setSelectedStatus(menu.menuStatus);
  }, [menu.menuStatus]);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value); // 선택된 상태 업데이트
  };

  const handleStatusUpdate = async () => {
    await updateMenuStatus(menu.menuId, selectedStatus);  // API 호출로 상태 업데이트
  };

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
                <td>메뉴 상태:
                  <select value={selectedStatus} onChange={handleStatusChange} style={{ marginLeft: 'calc(20 / 1440 * 100vw)' }}>
                    <option value="MENU_READY">준비 완료</option>
                    <option value="MENU_SOLD_OUT">품절</option>
                    <option value="MENU_DISCONTINUED">중단됨</option>
                  </select>
                </td>
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
                      ? menuOptions.map(option => option.optionCategoryTitle).join(', ')
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
            <button className="accept" onClick={handleStatusUpdate}>
              상태 업데이트
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
