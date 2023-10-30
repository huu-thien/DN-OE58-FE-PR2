import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { patchUpdateUser, getListUsers } from 'src/services/authService';
import { toast } from 'react-toastify';
import { setInfoUserUpdate } from 'src/redux/reducer/authSlice';
import * as yup from 'yup';
import { useState } from 'react';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEdit, setIsEdit] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      const listUsers = await getListUsers();
      console.log(listUsers);
      const isExistEmail = listUsers.data.find((item) => item.email === values.email && item.id !== user.id);
      if (isExistEmail) {
        toast.error('Email đã tồn tại !');
        return;
      }
      const isExistUsername = listUsers.data.find((item) => item.username === values.username && item.id !== user.id);
      if (isExistUsername) {
        toast.error('Tên đăng nhập đã tồn tại !');
        return;
      }
      const userLogin = listUsers.data.find((item) => Number(item.id) === Number(user.id));
      const response = await patchUpdateUser(values, user.id);
      if (response && response.status === 200) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang chỉnh sửa thông tin !',
            success: 'Chỉnh sửa thông tin thành công !'
          })
          .then(() => {
            setIsEdit(false);
            dispatch(setInfoUserUpdate({ ...values, id: Number(userLogin.id), role: userLogin.role }));
            localStorage.setItem('user', JSON.stringify({ ...values, id: Number(userLogin.id) }));
          });
      }
    } catch (err) {
      console.log(err);
      toast.error('Chỉnh sửa thất bại !');
    }
  };
  let [email, username, fullName, address, phone, imageUrl] = ['', '', '', '', '', ''];
  if (user) {
    email = user.email;
    username = user.username;
    fullName = user.fullName;
    address = user.address;
    phone = user.phone;
    imageUrl = user.imageUrl;
  }

  const phoneNumberRegex = /^\d{10}$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const initialValues = {
    fullName: fullName ? fullName : '',
    email: email ? email : '',
    username: username ? username : '',
    address: address ? address : '',
    phone: phone ? phone : '',
    imageUrl: imageUrl ? imageUrl : ''
  };
  const ProfileInfoSchema = yup.object().shape({
    fullName: yup.string().min(3, 'Tối thiểu 3 kí tự').max(50, 'Tối đa 50 kí tự').required('Tên đầy đủ là bắt buộc'),
    email: yup.string().matches(emailRegex, 'Email không hợp lệ').required('Email là bắt buộc'),
    username: yup.string().min(3, 'Tối thiểu 3 kí tự').max(50, 'Tối đa 50 kí tự').required('Tên đăng nhập là bắt buộc'),
    address: yup.string().min(15, 'Tối thiểu 15 kí tự'),
    phone: yup.string().matches(phoneNumberRegex, 'Số điện thoại không hợp lệ'),
    imageUrl: yup.string()
  });

  return (
    <div>
      {user ? (
        <div>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link to='/' className='hover:underline hover:text-cyan-600'>
              Trang chủ
            </Link>
            <p color=''>Thông tin tài khoản</p>
          </Breadcrumbs>
          <section className='py-1 bg-blueGray-50'>
            <div className='w-full lg:w-8/12 px-4 mx-auto mt-6'>
              <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
                <div className='rounded-t bg-white mb-0 px-6 py-6'>
                  <div className='text-center flex justify-between'>
                    <h6 className='text-blueGray-700 text-xl font-bold'>Tài khoản của tôi</h6>
                    <Button onClick={() => setIsEdit(true)} variant='outlined'>
                      Chỉnh sửa
                    </Button>
                  </div>
                </div>
                <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleFormSubmit}
                    validationSchema={ProfileInfoSchema}
                  >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                          Thông tin người dùng
                        </h6>
                        <div className='flex flex-wrap'>
                          <div className='w-full lg:w-6/12 px-4'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='username'
                              label='Tên đăng nhập'
                              variant='outlined'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.username}
                              error={!!touched.username && !!errors.username}
                              helperText={touched.username && errors.username}
                              disabled={!isEdit}
                            />
                          </div>
                          <div className='w-full lg:w-6/12 px-4'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
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
                              disabled={!isEdit}
                            />
                          </div>
                          <div className='w-full lg:w-6/12 px-4'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='fullName'
                              label='Tên đầy đủ'
                              variant='outlined'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.fullName}
                              error={!!touched.fullName && !!errors.fullName}
                              helperText={touched.fullName && errors.fullName}
                              disabled={!isEdit}
                            />
                          </div>
                          <div className='w-full lg:w-6/12 px-4'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='imageUrl'
                              label='Link Avatar'
                              variant='outlined'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.imageUrl}
                              error={!!touched.imageUrl && !!errors.imageUrl}
                              helperText={touched.imageUrl && errors.imageUrl}
                              disabled={!isEdit}
                            />
                          </div>
                        </div>

                        <hr className='mt-6 border-b-1 border-blueGray-300' />

                        <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>Thông tin liên lạc</h6>
                        <div className='flex flex-wrap'>
                          <div className='w-full lg:w-12/12 px-4'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='address'
                              label='Địa chỉ'
                              variant='outlined'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.address}
                              error={!!touched.address && !!errors.address}
                              helperText={touched.address && errors.address}
                              disabled={!isEdit}
                            />
                          </div>
                        </div>
                        <div className='flex flex-wrap'>
                          <div className='w-full lg:w-12/12 px-4'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='phone'
                              label='Số điện thoại  '
                              variant='outlined'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.phone}
                              error={!!touched.phone && !!errors.phone}
                              helperText={touched.phone && errors.phone}
                              disabled={!isEdit}
                            />
                          </div>
                        </div>
                        <div>
                          {isEdit && (
                            <button
                              type='submit'
                              className='bg-[#e2231a] text-white active:bg-[#ee453c] font-medium uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 mr-4'
                            >
                              Lưu thông tin
                            </button>
                          )}
                          {isEdit && (
                            <Button
                              variant='outlined'
                              type='reset'
                              size='large'
                              onClick={() => {
                                setIsEdit(false);
                                window.location.reload();
                              }}
                            >
                              Hủy
                            </Button>
                          )}
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p>Eo co</p>
      )}
    </div>
  );
};

export default ProfilePage;
