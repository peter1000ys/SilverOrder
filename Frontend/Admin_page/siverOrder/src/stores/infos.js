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
                    set({
                      token: response.data.token ?? null,
                      isLogin: true,
                      userId: response.data.userId ?? 0,
                      userEmail: response.data.userEmail ?? null,
                      storeId: response.data.storeId ?? 0,
                    });
                    return true;
                  } else {
                    Notiflix.Notify.failure("로그인 에러");
                  }
                } catch (e) {
                  return false;
                }
              },
              
              // 로그아웃
              logout: (navigate) => {
                set({ isLogin: false, token: null });
                navigate("/login");
              },

        }),
        {
            name: "info-storage",
        }
    )
);

export default useInfoStore;