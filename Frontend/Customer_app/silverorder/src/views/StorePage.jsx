import "../styles/StorePage.css";
import MenuList from "../components/MenuCard/MenuList";

const StorePage = () => {
  return (
    <div className="main-container">
      <div className="store-title">
        <h1>M커피 SSAFY점</h1>
      </div>
      <div className="SST-search-btn">
        <img className="SST-search-img" src="/mike.png" alt="음성인식 버튼" />
      </div>
      <MenuList />
    </div>
  );
};

export default StorePage;
