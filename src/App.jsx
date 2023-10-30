import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ROUTES } from './routes/routeConfig';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';

import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER_PAGE} element={<RegisterPage />} />
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.CART_PAGE} element={<CartPage />} />
        <Route path={ROUTES.PRODUCT_PAGE} element={<ProductPage />} />
        <Route path={ROUTES.PRODUCT_DETAIL_PAGE} element={<ProductDetailPage />} />
        <Route path={ROUTES.CHECK_OUT_PAGE} element={<CheckoutPage />} />
        <Route path={ROUTES.CHECK_OUT_SUCCESS_PAGE} element={<CheckoutSuccessPage />} />
        <Route path={ROUTES.USER_PURCHASE_HISTORY_PAGE} element={<PurchaseHistoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
