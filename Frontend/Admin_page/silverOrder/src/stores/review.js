import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";
import Notiflix from "notiflix";

const API_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useReviewStore = create((set, get) => ({
  reviews: [],

  fetchReviews: async (storeId) => {
    const { token, userInfo } = useInfoStore.getState();

    if (!token) {
      Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}review/list/${userInfo.storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        set({ reviews: response.data });
        Notiflix.Notify.success("리뷰 목록을 성공적으로 불러왔습니다.");
      } else {
        Notiflix.Notify.failure("리뷰 목록 조회에 실패했습니다.");
      }
    } catch (error) {
      Notiflix.Notify.failure("리뷰 목록 조회에 실패했습니다.");
    }
  },

  createComment: async (userReviewId, content) => {
    const { token } = useInfoStore.getState();

    if (!token) {
      Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
      return;
    }

    try {
      const newComment = {
        userReviewId,
        content,
      };

      const response = await axios.post(`${API_URL}review/ownerRegist`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Notiflix.Notify.success("댓글이 성공적으로 등록되었습니다.");
      } else {
        Notiflix.Notify.failure("댓글 등록에 실패했습니다.");
      }
    } catch (error) {
      Notiflix.Notify.failure("댓글 등록 중 오류가 발생했습니다.");
    }
  },
}));

export default useReviewStore;
