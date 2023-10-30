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

import BlogPage from './pages/BlogPage';

import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { saveLogin } from './redux/reducer/authSlice';

function App() {
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem('user');
  let user = null;
  if (userLocal !== null) {
    user = JSON.parse(userLocal);
    dispatch(saveLogin(user));
  }
  return (
    <>
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
          <Route path={ROUTES.BLOG_PAGE} element={<BlogPage />} />
        </Route>
      </Routes>
      <ToastContainer
        style={{ fontSize: '13px', width: `255px` }}
        // transition={Flip}
        position='top-center'
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}

export default App;
