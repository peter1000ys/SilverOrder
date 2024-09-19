import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useInfoStore from "./infos";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/silverorder/";

const usePurchaseStore = create(
  persist((set, get) => ({
    // 이메일 인증 (금융 api email, key 받아와서 DB에 저장하기)
    requestFinanceAPI: async (email) => {
      const { token } = useInfoStore.getState();

      const data = {
        userApiEmail: email,
      };
    },
  }))
);

export default usePurchaseStore;
