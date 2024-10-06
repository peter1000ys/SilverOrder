import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/PlayBox.css";
import play_btn from "../../img/play_btn.png";
import stop_btn from "../../img/stop_btn.png";
import useSoundsearchStore from "../../stores/soundsearch";
import useCartStore from "../../stores/cart";
import { baseURL } from "../../constant";
import Notiflix from "notiflix";

const PlayBox = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [soundFile, setSoundFile] = useState(null); // 녹음 파일 저장 변수
  const [resultData, setResultData] = useState(null); // API 요청 결과 저장 변수
  const mediaRecorderRef = useRef(null); // MediaRecorder 참조 변수
  const audioChunksRef = useRef([]); // 녹음된 데이터 조각을 저장하는 변수

  const { sendAudioToAPI } = useSoundsearchStore();

  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  // API 요청 함수
  const requestSoundsearchResult = async (audioBlob) => {
    try {
      const result = await sendAudioToAPI(audioBlob);
      setResultData(result); // API로부터 받은 결과를 저장
    } catch (error) {
      console.error("결과 요청 실패:", error);
      setResultData(null); // 실패 시에는 결과를 null로 설정
    }
  };

  // 녹음 시작/종료 버튼을 눌렀을 때 호출되는 함수
  const handleRecordClick = async () => {
    if (isRecording) {
      // 녹음 중일 때 -> 녹음 종료
      mediaRecorderRef.current.stop(); // 녹음 종료
      setIsRecording(false); // 녹음 상태 false로 변경
    } else {
      // 녹음 중이 아닐 때 -> 녹음 시작
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      // 데이터가 들어올 때마다 audioChunksRef에 저장
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // 녹음이 종료되면 soundFile 변수에 Blob 파일로 저장하고 API 요청
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setSoundFile(audioBlob); // 녹음된 파일을 state에 저장
        audioChunksRef.current = []; // 다음 녹음을 위해 배열 초기화

        // 녹음이 끝나면 API로 보내기
        await requestSoundsearchResult(audioBlob);
      };

      mediaRecorderRef.current.start(); // 녹음 시작
      setIsRecording(true); // 녹음 상태 true로 변경
    }
  };

  // 옵션 선택 없이 기본으로 장바구니에 추가
  const handleAddToCart = ({ category, productId, name, price, options }) => {
    // productId, name, price, options를 사용하여 새로운 item 객체 생성
    const item = { category, productId, name, price, options };
    // 장바구니에 제품 추가
    addToCart(item);
    Notiflix.Notify.success("장바구니에 상품이 담겼습니다.");
  };

  // 옵션 선택하러 가기
  const go_to_optionpage = ({ category, productId, name, price, options }) => {
    // productId, name, price, options를 사용하여 새로운 item 객체 생성
    const item = { category, productId, name, price, options };
    navigate(`${baseURL}/choiceoption`, { state: { item } });
  };

  return (
    <div className="playbox-search-container">
      {soundFile ? (
        <div className="playbox-result-container">
          {resultData ? (
            <>
              <p className="playbox-result-info">{resultData.qa_result}</p>

              <div className="playbox-result-box">
                <p>{resultData.menuList[0].menuName}</p>
                <button
                  className="playbox-addcart-normal-btn"
                  onClick={() =>
                    handleAddToCart({
                      category: resultData.menuList[0].menuCategoryName,
                      productId: resultData.menuList[0].menuId,
                      name: resultData.menuList[0].menuName,
                      price: resultData.menuList[0].menuPrice,
                      options: null,
                    })
                  }
                >
                  기본
                </button>
                <button
                  className="playbox-addcart-option-btn"
                  onClick={() =>
                    go_to_optionpage({
                      category: resultData.menuList[0].menuCategoryName,
                      productId: resultData.menuList[0].menuId,
                      name: resultData.menuList[0].menuName,
                      price: resultData.menuList[0].menuPrice,
                      options: null,
                    })
                  }
                >
                  옵션 추가
                </button>
              </div>
            </>
          ) : (
            <p className="playbox-result-loading-text">
              결과를 처리 중입니다...
            </p>
          )}

          {/* 녹음된 파일을 재생할 수 있는 오디오 플레이어 추가(녹음 성공여부 테스트용)
          <audio controls src={URL.createObjectURL(soundFile)} /> */}
        </div>
      ) : (
        <div className="playbox-search-container">
          <button className="playbox-record-btn" onClick={handleRecordClick}>
            <img
              src={isRecording ? stop_btn : play_btn}
              alt={isRecording ? "녹음 종료" : "녹음 시작"}
              className="record-btn-icon"
            />
          </button>
          <p className="playbox-record-info">
            {isRecording
              ? "설명이 끝나셨다면 위의 버튼을 눌러주세요."
              : "원하는 메뉴에 대해 말씀해주세요."}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayBox;
