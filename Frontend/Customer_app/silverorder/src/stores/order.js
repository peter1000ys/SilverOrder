import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useOrderStore = create(() => ({
  // 가장 최근 주문의 현황 확인하기
  fetchLastOrderInfo: async (orderId) => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.get(
        `${API_URL}order/orderDetail/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("최근 주문 현황 로딩 실패:", error);
    }
  },
}));

export default useOrderStore;
