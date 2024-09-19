import { create } from "zustand";
import axios from "axios";
import useInfoStore from "./infos";
import Notiflix from "notiflix";

const API_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useOptionStore = create((set, get) => ({
    options: [],

    fetchOptions: async () => {
        const { token, storeId } = useInfoStore.getState();

        if (!token) {
            Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
            return;
          }

          try {
            const response = await axios.get(API_URL + `option/category/${storeId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            const optionData = response.data.map((option) => ({
              ...option,
            }));
      
            set({ options: optionData });
          } catch (error) {
            Notiflix.Notify.failure("옵션 목록 조회에 실패했습니다.");
          }
        
    },
    createOption: async (newOption) => {
      const { token } = useInfoStore.getState();
      const { options } = get();

      if (!token) {
        Notiflix.Notify.failure("제대로 로그인이 되었는지 확인 부탁드립니다.");
        return;
      }

    // 이미 추가된 옵션인지 확인
    if (options.some((option) => option.optionCategoryTitle === newOption.optionCategoryTitle)) {
      Notiflix.Notify.failure("이미 등록된 옵션입니다.");
      return;
    }
    try {
      await axios.post(
        API_URL + `option/category`,
        { newOption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  옵션 목록 갱신
      await get().fetchOptions();
      Notiflix.Notify.success("옵션 추가 완료");
    } catch (error) {
      Notiflix.Notify.failure("옵션 추가 실패");
    }
    },
}));

export default useOptionStore;