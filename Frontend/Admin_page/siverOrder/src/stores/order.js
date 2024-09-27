import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";
import Notiflix from "notiflix";

const API_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useOrderStore = create((set, get) => ({
    orders: [],

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


}));


export default useOrderStore;