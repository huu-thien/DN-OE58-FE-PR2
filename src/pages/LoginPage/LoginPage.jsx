import { useState } from 'react';
import { Button, Divider, IconButton, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { initialValues, LoginSchema } from 'src/helpers/LoginValidate';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import AuthenticateImage from 'src/assets/authenticate-img.webp';

const Loginpage = () => {
  // set show password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className='mx-auto w-full max-w-7xl'>
      <div className='py-5'>
        <div className='grid items-center max-[991px]:justify-items-start grid-cols-1 md:grid-cols-2 gap-8 '>
          <div className='max-[991px]:mx-auto max-[991px]:max-w-[720px]'>
            <img src={AuthenticateImage} alt='banner-authenticate' className='inline-block max-w-full rounded-lg' />
          </div>
          <div className='p-6 max-[991px]:w-full rounded-2xl shadow-2xl'>
            <div className='text-center'>
              <Button variant='outlined' size='small' startIcon={<ArrowBackIcon />}>
                <Link to='/' className=' text-blue-700'>
                  Về trang chủ
                </Link>
              </Button>
              <h3 className='mt-6 text-blue-800 font-bold text-2xl md:text-3xl'>Đăng nhập với Canifa 👘</h3>
              <div className='mx-auto mt-4 max-w-[480px] mb-5 md:mb-6 lg:mb-8 '>
                <div className='text-sm  text-cyan-700'>
                  Bạn chưa có tài khoản ? &nbsp;
                  <Link to='/register' className='underline text-blue-700 cursor-pointer'>
                    Đăng kí ngay
                  </Link>
                </div>
              </div>
              <div className='mx-auto w-full max-w-[400px]'>
                <div className='mx-auto max-w-[400px] text-left mb-4'>
                  <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={LoginSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                      <form onSubmit={handleSubmit} name='form-login' method='post'>
                        <div className='relative'>
                          <TextField
                            sx={{
                              fontFamily: 'Lexend',
                              width: `100%`,
                              marginBottom: '20px'
                            }}
                            id='username'
                            label='Username or Email'
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
                        <Button
                          sx={{
                            width: '100%',
                            height: '50px'
                          }}
                          variant='contained'
                          size='large'
                          type='submit'
                        >
                          Login
                        </Button>
                      </form>
                    )}
                  </Formik>
                  <Divider sx={{ mt: '8px', color: '#ff385c' }} />
                  {/* <ButtonLoginGoogle /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
