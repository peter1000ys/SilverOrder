import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useMenuStore = create((set) => ({
  menuList: [], // 메뉴 리스트 상태

  // 메뉴 리스트 불러오는 API
  fetchMenulistAPI: async () => {
    const { loginedStore, token } = useInfoStore.getState();

    try {
      const response = await axios.get(`${API_URL}menu/${loginedStore}/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      set({ menuList: response.data });
    } catch (error) {
      console.error("메뉴 정보 불러오기 실패:", error);
    }
  },

  optionList: [], // 선택한 메뉴의 옵션들

  // 선택한 메뉴의 옵션 불러오는 API
  fetchSelectedMenuOption: async (menuId) => {
    const { token } = useInfoStore.getState();

    try {
      const response = await axios.get(`${API_URL}menu/detail/${menuId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      set({ optionList: response.data });
    } catch (error) {
      console.error("선택한 메뉴 옵션 불러오기 실패:", error);
    }
  },
}));

export default useMenuStore;
