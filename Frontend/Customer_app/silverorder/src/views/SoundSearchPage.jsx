import "../styles/SoundSearchPage.css";
import PlayBox from "../components/SoundSearch/PlayBox";

const SoundSearchPage = () => {
  return (
    <div className="soundsearch-container">
      <div className="soundsearch-title">
        <h1>메뉴 찾기</h1>
      </div>

      <PlayBox />
    </div>
  );
};

export default SoundSearchPage;
