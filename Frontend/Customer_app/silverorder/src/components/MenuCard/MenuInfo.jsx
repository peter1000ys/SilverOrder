import "./Styles/MenuInfo.css"; // CSS 파일을 가져옴

const MenuInfo = ({ data }) => {
  return (
    <div>
      {/* 메뉴 데이터를 순회하며 각 메뉴의 이름과 가격을 출력 */}
      {data.products.map((product) => (
        <div key={product.id} className="menu-item">
          <div className="menu-item-info">
            <img
              className="menu-item-img"
              src={product.imageUrl}
              alt="메뉴 사진"
            />
            <p id="menu-item-name">{product.name}</p>
          </div>
          <div className="menu-item-option-btn">
            <div className="menu-item-normal">
              <p id="menu-item-normal01">기본</p>
              <p id="menu-item-normal02">{product.price}</p>
            </div>
            <div className="menu-item-plus">
              <p id="menu-item-plus01">옵션 추가</p>
              <p id="menu-item-plus02">{product.price} + a</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuInfo;
