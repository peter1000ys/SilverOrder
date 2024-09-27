import "../styles/CartPage.css";
import useCartStore from "../stores/cart";
import { useMemo } from "react"; // 성능 최적화를 위해 사용
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constant";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  // 카테고리별 상품 개수를 계산하는 함수
  const getCategoryCounts = useMemo(() => {
    const counts = {};
    cart.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [cart]);

  // 전체 가격을 계산하는 함수
  const allPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  // cart에 담긴 메뉴들 결제하기 위해 정보 전달 & 페이지 이동
  const go_to_purchase = () => {
    // 결제 페이지에 전달해야 할 정보
    const purchaseInfo = {
      totalPrice: allPrice,
      menuList: cart.map((item) => ({
        menuId: item.productId,
        menuAmount: 1,
        menuPrice: item.price,
        optionList: item.options,
      })),
    };

    console.log(purchaseInfo);

    // purchaseInfo를 전달하면서 결제 페이지로 이동
    navigate(`${baseURL}/purchase`, { state: { purchaseInfo } });
  };

  return (
    <div className="cart-container">
      <div className="cart-title">
        <h1>내 장바구니</h1>
      </div>

      <div className="cart-menu">
        {cart.length === 0 ? (
          // 장바구니에 상품이 없을 경우
          <p id="cart-item-none">장바구니에 담긴 상품이 없습니다.</p>
        ) : (
          <div className="cart-menu-list">
            {/* 카테고리별 상품 개수 표시 */}
            <div className="cart-category-counts">
              {Object.entries(getCategoryCounts).map(([category, count]) => (
                <p key={category}>{`${category}: ${count}개`}</p>
              ))}
            </div>

            {/* 각 메뉴별 정보 */}
            {cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                <div className="cart-item-btn">
                  <button
                    className="cart-item-delete"
                    onClick={() => removeFromCart(item.cartId)}
                  >
                    X
                  </button>
                </div>
                <div className="cart-item-info">
                  <p id="cart-item-title">{item.name}</p>
                  <p id="cart-item-options">
                    {item.options === null || item.options.length === 0
                      ? "옵션: X"
                      : `옵션: ${item.options
                          .map((option) => option.optionName)
                          .join(", ")}`}
                  </p>
                  <p id="cart-item-price">{item.price}원</p>
                </div>
              </div>
            ))}

            {/* 전체 가격 표시 */}
            <div className="cart-total-price">
              <h3>
                총 가격: <span>{allPrice}</span>원
              </h3>
            </div>

            {/* 장바구니 비우기 버튼 */}
            <button className="cart-menu-clear" onClick={clearCart}>
              장바구니 비우기
            </button>

            {/* 결제 버튼 */}
            <button className="cart-menu-purchase" onClick={go_to_purchase}>
              결 제 하 기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
