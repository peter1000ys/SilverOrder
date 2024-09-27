import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";
import { baseURL } from "../constant";

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

  // 내 지난 주문 내역 확인하기
  fetchBeforeOrderList: async () => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.get(`${API_URL}order/myOrder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("지난 주문 내역:", response.data);
      return response.data;
    } catch (error) {
      console.log("지난 주문 내역 로딩 실패:", error);
    }
  },

  // 주문 내역 상세 조회
  fetchBeforeOrderDetail: async (orderId) => {
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
      console.log("주문 내역 상세:", response.data.menuList);
      return response.data.menuList;
    } catch (error) {
      console.error("주문 내역 상세 로딩 실패:", error);
    }
  },
}));

export default useOrderStore;
