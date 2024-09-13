import { Route, Routes, Navigate } from "react-router-dom";
import useInfoStore from "../stores/infos";

// 로그인 페이지
import LoginPage from "../views/LoginPage.jsx";

// 회원 가입 페이지
import Signup from "../views/Signup.jsx";

// 메뉴 페이지
import MenuPage from "../views/MenuPage.jsx"

// 주문 페이지
import OrderPage from "../views/OrderPage.jsx";

// 리뷰 페이지
import ReviewPage from "../views/ReviewPage.jsx";

// 대시보드 페이지
import DashboardPage from "../views/DashboardPage.jsx";

import AddMenu from "../components/Menu/AddMenu.jsx";

const PageRoutes = () => {

    const { isLogin } = useInfoStore();

    return (
        <Routes>
            {/* 로그인 */}
            <Route path="/login" element={<LoginPage />} />
            {/* 회원가입 */}
            <Route path="/signup" element={<Signup />} />

            {/* 로그인 상태 확인 및 리다이렉트 */}
            {!isLogin && (
                <>
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}

            {isLogin && (
                <>
                    {/* 주문 페이지 */}
                    <Route path="/order" element={<OrderPage />} />
                    {/* 메뉴 페이지 */}
                    <Route path="/menu" element={<MenuPage />} />
                    {/*리뷰 페이지 */}
                    <Route path="/review" element={<ReviewPage />} />
                    {/* 대시보드 페이지 */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    {/* 메뉴 추가 페이지 */}
                    <Route path="/menu/AddMenu" element={<AddMenu />}/>
                </>
            )}
        </Routes>
    )
}

export default PageRoutes;