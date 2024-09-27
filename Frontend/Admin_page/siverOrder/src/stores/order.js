import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";
import Notiflix from "notiflix";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useOrderStore = create((set, get) => ({
  orders: [],

  // Function to fetch orders (already present in your store)
  fetchOrders: async () => {
    const { token, userInfo } = useInfoStore.getState();

    if (!token) {
      Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
      return;
    }

    try {
      const response = await axios.get(API_URL + `order/storeOrder/${userInfo.storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orderData = response.data.map((order) => ({
        ...order,
      }));

      set({ orders: orderData });
    } catch (error) {
      Notiflix.Notify.failure("주문 목록 조회에 실패했습니다.");
    }
  },


  changeOrderStatus: async (orderId, orderStatus) => {
    const { token } = useInfoStore.getState();

    if (!token) {
      Notiflix.Notify.failure("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axios.patch(
        API_URL + "order/change-status", 
        {
          orderId: orderId,
          orderStatus: orderStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      if (response.status === 200) {
        const updatedOrders = get().orders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: orderStatus } : order
        );
        set({ orders: updatedOrders });
        Notiflix.Notify.success("주문 상태가 성공적으로 변경되었습니다.");
      } else {
        Notiflix.Notify.failure("주문 상태 변경에 실패했습니다.");
      }
    } catch (error) {
      Notiflix.Notify.failure("서버와의 통신 중 오류가 발생했습니다.");
    }
  },
}));

export default useOrderStore;
