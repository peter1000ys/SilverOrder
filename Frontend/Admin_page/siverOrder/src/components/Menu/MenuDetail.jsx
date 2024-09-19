import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuDetail.css';

const MenuDetail = ({ menu }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/menu/Edit', { state: { menu } });
  };
  return (
    <div className="menu-detail">
      <div className="menu-header">
        <h3>이름 </h3>
        <h3>{menu.name}</h3>
      </div>
      <div className="menu-detail-content">
        <div className="menu-info">
          <table>
            <tbody>
              <tr>
                <td>이미지:</td>
                <td>{menu.image}</td>
              </tr>
              <tr>
                <td>분류:</td>
                <td>Juice</td>
              </tr>
              <tr>
                <td>금액:</td>
                <td>6,000 원</td>
              </tr>
              <tr className="menu-description">
                <td>설명:</td>
                <td>{menu.description}</td>
              </tr>
              <tr className='menu-option'>
                <td>옵션:</td>
                <td>ICE</td>
              </tr>
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="cancel">취소</button>
            <button className="accept" onClick={handleEditClick}>수정</button>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default MenuDetail;
