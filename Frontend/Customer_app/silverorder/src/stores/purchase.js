import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const usePurchaseStore = create(() => ({
  // 이메일 인증 (금융 api email, key 받아와서 DB에 저장하기)
  requestFinanceAPI: async (email) => {
    const { token, getUserInfo } = useInfoStore.getState();

    const data = {
      userApiEmail: email,
    };

    try {
      const response = await axios.post(`${API_URL}user/me/connect`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // 요청이 성공하면 데이터 저장 또는 필요한 로직 실행
      console.log("API 응답:", response.data);

      // getUserInfo 함수 호출하여 사용자 정보 갱신
      await getUserInfo();
    } catch (error) {
      // 에러 핸들링
      console.error("API 요청 에러:", error);
    }
  },

  // 금융권 카드 조회
  getAllMyCard: async () => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.get(`${API_URL}payment/cardList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("금융권 카드 조회 결과:", response.data);
      return response.data;
    } catch (error) {
      console.log("에러:", error);
    }
  },

  // 간편 결제 카드 등록
  registerCheckedCard: async (selectedCards) => {
    const { token } = useInfoStore.getState();
    console.log(selectedCards);

    try {
      const response = await axios.post(
        `${API_URL}payment/cardRegist`,
        selectedCards,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("간편 결제 카드 등록 결과:", response.data);
      return true;
    } catch (error) {
      console.log("에러:", error);
    }
  },

  // 간편 결제 카드 조회
  getRegisteredMyCard: async () => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.get(`${API_URL}payment/myCardList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("간편 결제 카드 조회 결과:", response.data);
      return response.data;
    } catch (error) {
      console.log("에러:", error);
    }
  },

  // 결제 API
  sendPurchaseRequest: async (purchaseInfo) => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.post(
        `${API_URL}order/transaction`,
        purchaseInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("결제 결과:", response.data);
      return response.data;
    } catch (error) {
      console.log("에러:", error);
    }
  },
}));

export default usePurchaseStore;
