import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";
import Notiflix from "notiflix";

const API_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useMenuStore = create((set, get) => ({
    menus: [],
    menuCategories: [],
    menuOptions: [],  // To store menu options

    fetchMenus: async () => {
        const { token, userInfo } = useInfoStore.getState();

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        try {
            const response = await axios.get(API_URL + `menu/${userInfo.storeId}/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const menuData = response.data.map((menu) => ({
                ...menu,
            }));
            set({ menus: menuData });
        } catch (error) {
            Notiflix.Notify.failure("메뉴 목록 조회에 실패했습니다.");
        }
    },

    createMenuCategory: async (newCategory) => {
        const { token } = useInfoStore.getState();
        const { menuCategories } = get();

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        if (menuCategories.some((category) => category.menuCategoryName === newCategory.menuCategoryName)) {
            Notiflix.Notify.failure("이미 등록된 카테고리입니다.");
            return;
        }

        try {
            await axios.post(
              API_URL + `menu/category`,
              newCategory,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            await get().fetchCategories();
            Notiflix.Notify.success("카테고리 추가 완료");
        } catch (error) {
            Notiflix.Notify.failure("카테고리 추가 실패");
        }
    },

    fetchCategories: async () => {
        const { token, userInfo } = useInfoStore.getState();

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        try {
            const response = await axios.get(API_URL + `menu/category/${userInfo.storeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const categoryData = response.data.map((category) => ({
                ...category,
            }));
            set({ menuCategories: categoryData });
        } catch (error) {
            Notiflix.Notify.failure("카테고리 조회에 실패했습니다.");
        }
    },

    createMenu: async (newMenu) => {
        const { token } = useInfoStore.getState();
        const { menus } = get();

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        if (menus.some((menu) => menu.menuName === newMenu.menuName)) {
            Notiflix.Notify.failure("이미 등록된 메뉴입니다.");
            return;
        }

        try {
            await axios.post(
                API_URL + `menu/regist`,
                newMenu,
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                }
            );
            await get().fetchMenus();
            Notiflix.Notify.success("메뉴 추가 완료");
        } catch (error) {
            Notiflix.Notify.failure("메뉴 추가 실패");
        }
    },

    fetchMenuOptions: async (menuId) => {
        const { token } = useInfoStore.getState();

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        try {
            const response = await axios.get(API_URL + `menu/detail/${menuId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const menuOptionsData = response.data.map((option) => ({
                ...option,
            }));

            set({ menuOptions: menuOptionsData });
            Notiflix.Notify.success("메뉴 옵션 조회 완료");
        } catch (error) {
            Notiflix.Notify.failure("메뉴 옵션 조회에 실패했습니다.");
        }
    },
}));

export default useMenuStore;
