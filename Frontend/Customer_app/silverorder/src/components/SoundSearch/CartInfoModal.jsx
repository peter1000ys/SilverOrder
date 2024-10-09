import "./styles/CartInfoModal.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cart";
import { baseURL } from "../../constant";

const CartInfoModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCartStore();

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
    <div className="cartmodal-overlay">
      <div className="cartmodal-container">
        <div className="cartmodal-upside">
          <button className="cartmodal-close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="cartmodal-menu">
          {cart.length === 0 ? (
            // 장바구니에 상품이 없을 경우
            <p id="cartmodal-item-none">장바구니에 담긴 상품이 없습니다.</p>
          ) : (
            <>
              <div className="cartmodal-menu-list">
                {/* 각 메뉴별 정보 */}
                {cart.map((item) => (
                  <div key={item.cartId} className="cartmodal-item">
                    <div className="cartmodal-item-btn">
                      <button
                        className="cartmodal-item-delete"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        X
                      </button>
                    </div>
                    <div className="cartmodal-item-info">
                      <p id="cartmodal-item-title">{item.name}</p>
                      <p id="cartmodal-item-options">
                        {item.options === null || item.options.length === 0
                          ? "옵션: X"
                          : `옵션: ${item.options
                              .map((option) => option.optionName)
                              .join(", ")}`}
                      </p>
                      <p id="cartmodal-item-price">{item.price}원</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 전체 가격 표시 */}
              <div className="cartmodal-total-price">
                <h3>
                  총 가격: <span>{allPrice}</span>원
                </h3>
              </div>

              {/* 결제 버튼 */}
              <button
                className="cartmodal-menu-purchase"
                onClick={go_to_purchase}
              >
                결 제 하 기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartInfoModal;
