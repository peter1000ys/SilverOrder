import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Notiflix from "notiflix";

const API_URL = 
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const useInfoStore = create(
    persist(
        (set, get) => ({
            isLogin: false,
            token: null,
            userInfo: {
              userId: 0,
              userEmail: null,
              storeId: 0,
            },

            // 회원 가입
            sendRegisterRequest: async (userEmail, userPassword, userBirth, storeId) => {
                const data = {
                  userEmail,
                  userPassword,
                  userBirth,
                  storeId,
                };
                try {
                  const response = await axios.post(
                    API_URL + "auth/register/admin",
                    data
                  );
                  if (response.status === 201) {
                    Notiflix.Notify.success("회원가입 성공");
                    return true;
                  } else {
                    Notiflix.Notify.failure("회원가입 실패.");
                  }
                } catch (e) {
                  return false;
                }
              },
              
            // 로그인
            sendLoginRequest: async (userEmail, password) => {
              const data = { userEmail, password };
              try {
                const response = await axios.post(
                  API_URL + "auth/login",
                  data
                );
                // console.log(response.data);
                if (response.status === 200) {
                  set((state) => ({
                    token: response.data.token ?? null,
                    isLogin: true,
                    userInfo: {
                      ...state.userInfo,  // 기존 userInfo 값 유지
                      userId: response.data.userId ?? 0,
                      userEmail: response.data.userEmail ?? null,
                    },
                  }));
                  // 로그인 후 storeId 요청
                  await get().sendStoreIdRequest();

                  return true;
                } else {
                  Notiflix.Notify.failure("로그인 에러");
                }
              } catch (e) {
                return false;
              }
            },

            sendStoreIdRequest: async () => {
              try {
                const token = get().token;  // 여기서 상태에서 token 값을 가져옴
                const response = await axios.get(
                  API_URL + "user/me/store",
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,  // 정확한 token 값 사용
                    },
                  }
                );
                console.log(response.data.storeId);
                if (response.status === 200) {
                  set((state) => ({
                    userInfo: {
                      ...state.userInfo,  // 기존 userInfo 값 유지
                      storeId: response.data.storeId ?? 0,  // storeId만 갱신
                    },
                  }));
                  return true;
                } else {
                  Notiflix.Notify.failure("스토어 정보를 불러오는데 실패했습니다.");
                }
              } catch (e) {
                return false;
              }
            },
              
            // 로그아웃
            logout: (navigate) => {
              set({ isLogin: false, token: null });
              navigate("/silverorder/admin/login");
            },

      }),
      {
          name: "info-storage",
      }
  )
);

export default useInfoStore;