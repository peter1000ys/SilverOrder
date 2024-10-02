import { create } from "zustand";
import useInfoStore from "./infos";
import axios from "axios";
import Notiflix from "notiflix";

const API_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useDashboardStore = create((set, get) => ({
    dashboardData: null,
    error: null,
    

    // 대시보드 데이터를 받아오는 함수
    fetchDashboardData: async (storeId) => {
        const { token } = useInfoStore.getState();

        if (!token) {
        Notiflix.Notify.failure("로그인 정보가 필요합니다.");
        return;
        }

        try {
        const response = await axios.get(`${API_URL}store/mySales/${storeId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            },
        });
        console.log(response.data);
        set({ dashboardData: response.data, error: null });
        } catch (error) {
        console.error("대시보드 데이터를 불러오는 데 실패했습니다.", error);
        Notiflix.Notify.failure("대시보드 데이터를 불러오는 데 실패했습니다.");
        set({ error: error.message });
        }
    },

}));


export default useDashboardStore;