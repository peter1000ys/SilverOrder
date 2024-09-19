import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useCartStore from "./cart";

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
        userBirth: null,
        userRole: null,
        userApiEmail: null,
      },

      // 회원가입
      sendRegisterRequest: async (userEmail, userPassword, userBirth) => {
        const data = {
          userEmail,
          userPassword,
          userBirth,
        };
        try {
          const response = await axios.post(
            API_URL + "auth/register/general",
            data
          );
          if (response.status === 201) {
            console.log("회원가입 성공");
            return true;
          } else {
            console.log("회원가입 실패");
          }
        } catch (e) {
          return false;
        }
      },

      // 로그인
      sendLoginRequest: async (userEmail, password) => {
        const data = { userEmail, password };
        try {
          const response = await axios.post(API_URL + "auth/login", data);
          if (response.status === 200) {
            set({
              token: response.data.token,
              isLogin: true,
              userInfo: {
                userId: response.data.userId,
                userEmail: response.data.userEmail,
                userBirth: response.data.userBirth,
                userRole: response.data.userRole,
                userApiEmail: response.data.userApiEmail,
              },
            });
            return true;
          } else {
            console.log("로그인 에러");
          }
        } catch (e) {
          return false;
        }
      },

      // 로그아웃
      logout: (navigate) => {
        const { clearCart } = useCartStore.getState(); // 장바구니 초기화 함수 호출
        clearCart(); // 로그아웃 시 장바구니가 초기화되도록

        set({ isLogin: false, token: null });
        navigate("/signin");
      },
    }),
    {
      name: "info-storage",
    }
  )
);

export default useInfoStore;
