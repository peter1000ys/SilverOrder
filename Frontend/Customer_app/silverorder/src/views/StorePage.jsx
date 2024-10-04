import "../styles/StorePage.css";
import { useNavigate } from "react-router-dom";
import MenuList from "../components/MenuCard/MenuList";
import mike from "../img/mike.png";
import { baseURL } from "../constant";

const StorePage = () => {
  const navigate = useNavigate();

  const go_to_sound_search = () => {
    navigate(`${baseURL}/soundsearch`);
  };

  return (
    <div className="main-container">
      <div className="store-title">
        <h1>M커피 SSAFY점</h1>
      </div>
      <div className="SST-search-btn" onClick={go_to_sound_search}>
        <img className="SST-search-img" src={mike} alt="음성인식 버튼" />
      </div>
      <MenuList />
    </div>
  );
};

export default StorePage;
