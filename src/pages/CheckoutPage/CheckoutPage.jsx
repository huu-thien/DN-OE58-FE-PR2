import * as yup from 'yup';
import CartItem from 'src/components/CartItem';
import ExpressDelivery from 'src/assets/express.jpg';
import NormalDelivery from 'src/assets/normal.jpg';
import { Button, Breadcrumbs } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { FormatPrice } from 'src/utils/formatPrice';
import { getCurrentDateTime } from 'src/helpers/getCurrentTime';
import { postCreateOrder } from 'src/services/checkoutService';
import { toast } from 'react-toastify';
import { clearCart } from 'src/redux/reducer/cartSlice';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const [methodShipping, setMethodShipping] = useState(false);
  const [feeShipings, setFeeShipings] = useState(20000);
  const priceProduct = carts.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.price * (1 - cartItem.percentSale) * cartItem.quantity;
  }, 0);

  const totalBill = priceProduct + feeShipings;

  const handleChangeMethodShipping = () => {
    setMethodShipping(!methodShipping);
    if (methodShipping) {
      setFeeShipings(20000);
    } else {
      setFeeShipings(80000);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const orderData = {
        ...values,
        idUser: user.id,
        totalBill,
        createdAt: getCurrentDateTime(),
        listProduct: carts,
        status: 'success'
      };
      const response = await postCreateOrder(orderData);
      if (response && response.status === 201) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang xử lý thanh toán !',
            success: 'Thanh toán thành công !'
          })
          .then(() => {
            navigate('/checkout-success');
            dispatch(clearCart());
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const cardNumberRegex = /\d{4}-\d{4}-\d{4}/;
  const initialValues = {
    email: user.email || '',
    cardHolder: user.fullName || '',
    cardNumber: '',
    billingAddress: user.address || '',
    phone: user.phone || ''
  };
  const phoneNumberRegex = /^\d{10}$/;

  const PaymentSchema = yup.object().shape({
    email: yup.string().matches(emailRegex, 'Email không hợp lệ').required('Email là bắt buộc'),
    cardHolder: yup.string().min(3, 'Tối thiểu 3 kí tự').max(50, 'Tối đa 50 kí tự').required('Tên chủ thẻ là bắt buộc'),
    cardNumber: yup
      .string()
      .matches(cardNumberRegex, 'Số tài khoản phải đúng định dạng xxxx-xxxx-xxxx')
      .required('Số tài khoản là bắt buộc'),
    billingAddress: yup
      .string()
      .min(3, 'Tối thiểu 3 kí tự')
      .max(400, 'Tối đa 400 kí tự')
      .required('Địa chỉ nhận hàng là bắt buộc'),
    phone: yup.string().matches(phoneNumberRegex, 'Số điện thoại không hợp lệ')
  });

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/' className='hover:underline hover:text-cyan-600'>
          Trang chủ
        </Link>
        <p color=''>Thanh toán giỏ hảng</p>
      </Breadcrumbs>
      <div className='flex flex-col items-center border-b bgWhite py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
        <p className='text-2xl font-bold text-cyan-700'>Thanh toán dễ dàng với CANIFA</p>
        <div className='mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base '>
          <div className='relative'>
            <ul className='relative flex w-full items-center justify-between space-x-2 sm:space-x-4'>
              <li className='flex items-center space-x-3 textLeft sm:space-x-4'>
                <a
                  className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700'
                  href='#'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                </a>
                <span className='font-semibold text-cyan-700'>Cửa hàng</span>
              </li>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
              <li className='flex items-center space-x-3 textLeft sm:space-x-4'>
                <a
                  className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold textWhite ring ring-cyan-500 ring-offset-2'
                  href='#'
                >
                  2
                </a>
                <span className='font-semibold text-cyan-700'>Thanh toán</span>
              </li>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
              <li className='flex items-center space-x-3 textLeft sm:space-x-4'>
                <a
                  className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold textWhite'
                  href='#'
                >
                  3
                </a>
                <span className='font-semibold text-cyan-700'>Hoàn tất</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
        <div className='px-4 pt-8'>
          <p className='text-xl font-medium'>Chi tiết giỏ hàng</p>
          <p className='text-gray-400'>Kiểm tra hàng và chọn phương thức vận chuyển phù hợp</p>
          <div className='mt-8 space-y-3 roundedLg border bgWhite px-2 py-4 sm:px-6'>
            {carts.map((cartItem, index) => (
              <CartItem key={index} cartItem={cartItem} />
            ))}
          </div>
          <p className='mt-8 textLg font-medium'>Phương thức vận chuyển</p>
          <form className='mt-5 grid gap-6'>
            <div className='relative'>
              <input
                className='peer hidden'
                id='radio_1'
                type='radio'
                name='radio'
                checked={!methodShipping}
                onChange={handleChangeMethodShipping}
              />
              <span className='peer-checked:border-[#1976d2] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bgWhite'></span>
              <label
                className='peer-checked:border-2 peer-checked:border-[#1976d2] peer-checked:bg-gray-50 flex cursor-pointer select-none roundedLg border border-gray-300 p-4'
                htmlFor='radio_1'
              >
                <img className='w-14 object-contain' src={NormalDelivery} alt='' />
                <div className='ml-5'>
                  <span className='mt-2 font-semibold'>Bình thường</span>
                  <p className='text-slate-500 text-sm leading-6'>Khoảng: 4-6 ngày</p>
                </div>
              </label>
            </div>
            <div className='relative'>
              <input
                className='peer hidden'
                id='radio_2'
                type='radio'
                name='radio'
                checked={methodShipping}
                onChange={handleChangeMethodShipping}
              />
              <span className='peer-checked:border-[#1976d2] absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300'></span>
              <label
                className='peer-checked:border-2 peer-checked:border-[#1976d2] peer-checked:bg-gray-50 flex cursor-pointer select-none roundedLg border border-gray-300 p-4'
                htmlFor='radio_2'
              >
                <img className='w-14 object-contain' src={ExpressDelivery} alt='' />
                <div className='ml-5'>
                  <span className='mt-2 font-semibold'>Siêu nhanh</span>
                  <p className='text-slate-500 text-sm leading-6'>Khoảng: 2-3 ngày</p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
          <p className='text-xl font-medium'>Chi tiết thanh toán</p>
          <p className='text-gray-400'>Hoàn tất đơn đặt hàng của bạn bằng cách cung cấp chi tiết thanh toán của bạn</p>
          <div className='py-4'>
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={PaymentSchema}>
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} name='form-login' method='post'>
                  <div className='relative'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='email'
                      label='Email'
                      variant='outlined'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </div>
                  <div className='relative'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='cardHolder'
                      label='Tên chủ thẻ'
                      variant='outlined'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cardHolder}
                      error={!!touched.cardHolder && !!errors.cardHolder}
                      helperText={touched.cardHolder && errors.cardHolder}
                    />
                  </div>
                  <div className='relative'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='cardNumber'
                      label='Số tài khoản'
                      variant='outlined'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cardNumber}
                      error={!!touched.cardNumber && !!errors.cardNumber}
                      helperText={touched.cardNumber && errors.cardNumber}
                    />
                  </div>
                  <div className='relative'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='billingAddress'
                      label='Địa chỉ nhận hàng'
                      variant='outlined'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.billingAddress}
                      error={!!touched.billingAddress && !!errors.billingAddress}
                      helperText={touched.billingAddress && errors.billingAddress}
                    />
                  </div>
                  <div className='relative'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='phone'
                      label='Số điện thoại'
                      variant='outlined'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </div>
                  <div className='mt-6 border-t border-b py-2'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900'>Giá tiền</p>
                      <p className='font-semibold text-gray-900'>{FormatPrice(priceProduct)} đ</p>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-gray-900'>Vận chuyển</p>
                      <p className='font-semibold text-gray-900'>{FormatPrice(feeShipings)} đ</p>
                    </div>
                  </div>
                  <div className='mt-6 flex items-center justify-between'>
                    <p className='text-sm font-medium text-gray-900'>Tổng</p>
                    <p className='text-2xl font-semibold text-gray-900'>{FormatPrice(totalBill)} đ</p>
                  </div>
                  <Button type='submit' variant='contained' fullWidth sx={{ my: 4 }} size='large'>
                    Thanh toán
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
