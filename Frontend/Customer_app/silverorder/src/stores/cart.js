import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [], // 장바구니 항목

      // 항목 추가
      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),

      // 항목 삭제
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      // 장바구니 초기화
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" } // localStorage에 저장될 키 이름
  )
);

export default useCartStore;
