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

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        try {
            const formData = new FormData();

            
            formData.append('storeId', newMenu.storeId);
            formData.append('menuCategoryId', newMenu.menuCategoryId);
            formData.append('menuName', newMenu.menuName);
            formData.append('simpleName', newMenu.simpleName);
            formData.append('menuDesc', newMenu.menuDesc);
            formData.append('menuStatus', newMenu.menuStatus);
            formData.append('menuPrice', newMenu.menuPrice);
            formData.append('recommend', newMenu.recommend);
            formData.append('menuThumb', newMenu.menuThumb);

            
            newMenu.useOptionCategory.forEach((optionId, index) => {
                formData.append(`useOptionCategory[${index}]`, optionId);
            });

            const response = await axios.post(
                API_URL + `menu/regist`,
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            Notiflix.Notify.success("메뉴 추가 완료");
            await get().fetchMenus();
        } catch (error) {
            Notiflix.Notify.failure("메뉴 추가 실패");
        }
    },


    updateMenu: async (menuId, formData) => {
        const { token } = useInfoStore.getState();
        
        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }
    
        try {
            const response = await axios.patch(API_URL + `menu/update/${menuId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            Notiflix.Notify.success("메뉴 수정 완료");
            await get().fetchMenus();
        } catch (error) {
            Notiflix.Notify.failure("메뉴 수정 실패");
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
            console.log("메뉴 옵션 조회에 실패했습니다.");
        }
    },
    updateMenuCategory: async (menuCategoryId, updatedCategory) => {
        const { token } = useInfoStore.getState();

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        try {
            await axios.patch(
                `${API_URL}menu/category/${menuCategoryId}`,
                updatedCategory,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(updatedCategory);
            await get().fetchCategories();
            Notiflix.Notify.success("카테고리 수정 완료");
        } catch (error) {
            Notiflix.Notify.failure("카테고리 수정에 실패했습니다.");
        }
    },
    
    updateMenuStatus: async (menuId, menuStatus) => {  // 새로운 함수 추가
        const { token } = useInfoStore.getState();
        
        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
        }

        try {
            const response = await axios.patch(
                `${API_URL}menu/change-status`, 
                { menuId, menuStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            Notiflix.Notify.success("메뉴 상태가 업데이트되었습니다.");
            await get().fetchMenus(); // 상태 변경 후 메뉴 목록을 다시 불러옵니다.
        } catch (error) {
            Notiflix.Notify.failure("메뉴 상태 업데이트에 실패했습니다.");
        }
    },
    

}));

export default useMenuStore;
