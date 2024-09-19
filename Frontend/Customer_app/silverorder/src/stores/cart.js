import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      cartIdCounter: 0, // 고유 ID를 생성하기 위한 카운터

      // 항목 추가
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, { ...item, cartId: state.cartIdCounter }],
          cartIdCounter: state.cartIdCounter + 1,
        })),

      // 항목 삭제
      removeFromCart: (cartId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartId !== cartId),
        })),

      // 장바구니 초기화
      clearCart: () => set({ cart: [], cartIdCounter: 0 }),
    }),
    { name: "cart-storage" } // localStorage에 저장될 키 이름
  )
);

export default useCartStore;
