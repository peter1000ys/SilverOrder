import "../styles/StorePage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuList from "../components/MenuCard/MenuList";
import mic from "../img/mic.png";
import { baseURL } from "../constant";
import useInfoStore from "../stores/infos";

const StorePage = () => {
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState();
  const { fetchStoreName } = useInfoStore();

  const go_to_sound_search = () => {
    navigate(`${baseURL}/soundsearch`);
  };

  useEffect(() => {
    const requestStoreName = async () => {
      try {
        const response = await fetchStoreName();
        setStoreName(response);
      } catch (error) {
        console.error(error);
      }
    };

    requestStoreName();
  });

  return (
    <div className="main-container">
      <div className="store-title">
        <h1>{storeName}</h1>
      </div>
      <div className="SST-search-btn" onClick={go_to_sound_search}>
        <img className="SST-search-img" src={mic} alt="음성인식 버튼" />
      </div>
      <MenuList />
    </div>
  );
};

export default StorePage;
