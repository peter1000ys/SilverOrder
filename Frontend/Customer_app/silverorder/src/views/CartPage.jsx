import "../styles/CartPage.css";
import useCartStore from "../stores/cart";

const CartPage = () => {
  // zustand에서 cart 상태를 가져오기
  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <div>
      <p>장바구니 페이지</p>

      {/* 장바구니 항목이 없을 때의 메시지 */}
      {cart.length === 0 ? (
        <p>장바구니에 담긴 상품이 없습니다.</p>
      ) : (
        <div>
          {/* 장바구니 항목을 반복해서 출력 */}
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>
                {item.name} - {item.price}원
              </p>

              {/* 옵션 정보 출력 */}
              <p>
                {item.options === null
                  ? "추가 옵션 X"
                  : `옵션: ${item.options}`}
              </p>

              {/* 항목 삭제 버튼 */}
              <button onClick={() => removeFromCart(item.id)}>삭제</button>
            </div>
          ))}

          {/* 장바구니 비우기 버튼 */}
          <button onClick={clearCart}>장바구니 비우기</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
