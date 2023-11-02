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
import { useDispatch, useSelector } from 'react-redux';
import { saveLogin } from './redux/reducer/authSlice';
import ProfilePage from './pages/ProfilePage';
import { useEffect } from 'react';
import { fetchProducts } from './redux/reducer/productSlice';
import { FormatPrice } from './utils/formatPrice';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageProduct from './pages/AdminManageProduct';
import AdminManageAccount from './pages/AdminManageAccount';
import AdminManageRevenue from './pages/AdminManageRevenue';
import AdminEditAccount from './pages/AdminEditAccount';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminChartCategory from './pages/AdminChartCategory';
import AdminChartTypeProduct from './pages/AdminChartTypeProduct';

function App() {
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem('user');
  const { params } = useSelector((state) => state.product);

  let user = null;

  if (userLocal !== null) {
    user = JSON.parse(userLocal);
    dispatch(saveLogin(user));
  }

  useEffect(() => {
    dispatch(fetchProducts({ ...params }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FormatPrice />
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
          <Route path={ROUTES.USER_PROFILE_PAGE} element={<ProfilePage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD_PAGE} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_MANAGE_PRODUCT_PAGE} element={<AdminManageProduct />} />
          <Route path={ROUTES.ADMIN_MANAGE_ACCOUNT_PAGE} element={<AdminManageAccount />} />
          <Route path={ROUTES.ADMIN_MANAGE_REVENUE_PAGE} element={<AdminManageRevenue />} />
          <Route path={ROUTES.ADMIN_MANAGE_ACCOUNT_EDIT_PAGE} element={<AdminEditAccount />} />
          <Route path={ROUTES.ADMIN_MANAGE_PRODUCT_EDIT_PAGE} element={<AdminEditProduct />} />
          <Route path={ROUTES.ADMIN_MANAGE_PRODUCT_ADD_PAGE} element={<AdminAddProduct />} />
          <Route path={ROUTES.ADMIN_CHART_CATEGORY} element={<AdminChartCategory />} />
          <Route path={ROUTES.ADMIN_BAR_CATEGORY} element={<AdminChartTypeProduct />} />
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
