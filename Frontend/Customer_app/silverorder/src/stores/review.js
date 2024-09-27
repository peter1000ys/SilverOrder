import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useReviewStore = create(() => ({
  // 리뷰 작성하기
  sendReviewRequest: async (orderId, content, imgFile, rating) => {
    // 매개변수 이름 수정
    const { token } = useInfoStore.getState();

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("content", content);
    formData.append("rating", rating);
    // 여기에서 imgFile을 추가합니다
    if (imgFile) {
      formData.append("reviewThumb", imgFile); // imgFile로 변경
    }

    try {
      const response = await axios.post(
        `${API_URL}review/userRegist`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      return true;
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
      return false; // 실패 시 false 반환
    }
  },
}));

export default useReviewStore;
