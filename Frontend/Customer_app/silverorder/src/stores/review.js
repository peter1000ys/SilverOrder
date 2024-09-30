import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useReviewStore = create(() => ({
  // 리뷰 작성하기
  sendReviewRequest: async (orderId, content, imgFile, rating) => {
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

  // 내가 작성한 모든 리뷰 불러오기
  fetchAllMyReviews: async () => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.get(`${API_URL}review/myReviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("내 리뷰들 불러오기 실패:", error);
    }
  },

  // 선택한 주문의 리뷰 보기
  fetchSelectedReview: async (orderId) => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.get(
        `${API_URL}review/orderReview/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("선택한 주문의 리뷰 불러오기 실패:", error);
    }
  },
}));

export default useReviewStore;
