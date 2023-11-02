import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { initialValues, RegisterSchema } from 'src/helpers/RegisterValidate';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticateImage from 'src/assets/authenticate-img.webp';
import { getListUsers, postRegisterUser } from 'src/services/authService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoginedSection from 'src/components/LoginedSection';

const RegisterPage = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await getListUsers();
      if (response && response.status === 200) {
        const listUsers = response.data;
        const isExistEmail = listUsers.find((user) => user.email === values.email);
        if (isExistEmail) {
          toast.error('Email đã tồn tại !');
          return;
        }
        const isExistUsername = listUsers.find((user) => user.username === values.username);
        if (isExistUsername) {
          toast.error('Tên đăng nhập đã tồn tại !');
          return;
        }
        const dataRegister = {
          fullName: values.fullName,
          username: values.username,
          email: values.email,
          password: values.password
        };
        const responseRegister = await postRegisterUser(dataRegister);

        if (responseRegister && responseRegister.status === 201) {
          const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
          toast
            .promise(resolveAfter2Sec, {
              pending: 'Đang tạo tài khoản !',
              success: 'Đăng kí tài khoản thành công !'
            })
            .then(() => {
              navigate('/login');
            });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mx-auto w-full max-w-7xl'>
      <div className='py-5'>
        {user ? (
          <LoginedSection />
        ) : (
          <div className='grid items-center max-[991px]:justify-items-start grid-cols-1 md:grid-cols-2 gap-8 '>
            <div className='p-6 max-[991px]:w-full rounded-2xl shadow-2xl'>
              <div className='text-center'>
                <Button variant='outlined' size='small' startIcon={<ArrowBackIcon />}>
                  <Link to='/' className=' text-blue-700'>
                    Về trang chủ
                  </Link>
                </Button>
                <h3 className='mt-6 text-blue-800 font-bold text-2xl md:text-3xl'>Đăng kí tài khoản với Canifa 👘</h3>
                <div className='mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8 '>
                  <div className='text-sm  text-cyan-700'>
                    Bạn đã có tài khoản ? &nbsp;
                    <Link to='/login' className='underline text-blue-700 cursor-pointer'>
                      Đăng nhập ngay
                    </Link>
                  </div>
                </div>
                <div className='mx-auto w-full max-w-[400px]'>
                  <div className='mx-auto max-w-[400px] text-left mb-4'>
                    <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={RegisterSchema}>
                      {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit} name='form-register' method='post'>
                          <div className='relative'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='fullName'
                              label='Full Name'
                              variant='standard'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.fullName}
                              error={!!touched.fullName && !!errors.fullName}
                              helperText={touched.fullName && errors.fullName}
                            />
                          </div>
                          <div className='relative'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='email'
                              label='Email'
                              variant='standard'
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
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='username'
                              label='Username'
                              variant='standard'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.username}
                              error={!!touched.username && !!errors.username}
                              helperText={touched.username && errors.username}
                            />
                          </div>
                          <div className='relative mb-2'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='password'
                              type={showPassword ? 'text' : 'password'}
                              label='Password'
                              variant='standard'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password}
                              error={!!touched.password && !!errors.password}
                              helperText={touched.password && errors.password}
                            />
                            <IconButton
                              sx={{
                                position: 'absolute',
                                right: '0',
                                top: '10px'
                              }}
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </div>
                          <div className='relative mb-2'>
                            <TextField
                              sx={{
                                fontFamily: 'Lexend',
                                width: `100%`,
                                marginBottom: '20px'
                              }}
                              id='confirmPassword'
                              type={showConfirmPassword ? 'text' : 'password'}
                              label='Confirm Password'
                              variant='standard'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.confirmPassword}
                              error={!!touched.confirmPassword && !!errors.confirmPassword}
                              helperText={touched.confirmPassword && errors.confirmPassword}
                            />
                            <IconButton
                              sx={{
                                position: 'absolute',
                                right: '0',
                                top: '10px'
                              }}
                              aria-label='toggle confirm password visibility'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </div>

                          <Button
                            sx={{
                              height: '50px'
                            }}
                            className='w-full'
                            variant='contained'
                            size='large'
                            type='submit'
                          >
                            Register
                          </Button>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
            <div className='max-[991px]:mx-auto max-[991px]:max-w-[720px]'>
              <img src={AuthenticateImage} alt='banner-authenticate' className='inline-block max-w-full rounded-lg' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
