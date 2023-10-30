import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import DecorateImage from 'src/assets/decorate.webp';

const LoginedSection = () => {
  return (
    <div className='px-5 md:px-10'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div className=''>
            <h1 className='font-bold text-cyan-700 mb-8 text-2xl text-center'>Bạn đang ở trong phiên đăng nhập 👘</h1>
            <div className='flex items-center gap-2 flex-col'>
              <Alert sx={{ mb: 2 }} severity='info' className='text-center'>
                Hãy đi đến trang sản phẩm để khám phá !
              </Alert>
              <Link
                to='/products'
                className='w-full flex items-center justify-center rounded-md border border-transparent bg-[#da291c] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#eb574c]'
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className=''>
            <img src={DecorateImage} alt='image' className='mx-auto inline-block h-300px  object-cover rounded-2xl' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginedSection;
