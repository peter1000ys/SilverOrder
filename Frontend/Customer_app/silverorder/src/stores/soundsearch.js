import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";
import Notiflix from "notiflix";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useSoundsearchStore = create(() => ({
  // 녹음 파일을 보내서 결과를 받아오는 함수
  sendAudioToAPI: async (audioBlob) => {
    const { loginedStore, token } = useInfoStore.getState();

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    console.log(formData);

    try {
      const response = await axios.post(
        `${API_URL}voice/stt/testing/${loginedStore}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("음성인식 메뉴 검색 실패:", error);
      Notiflix.Notify.failure("메뉴 검색에 실패했습니다.");
    }
  },
}));

export default useSoundsearchStore;
