import { Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CheckoutSuccessPage = () => {
  return (
    <div className='px-5 md:px-10 pb-5 md:pb-0 bg-gradient bg-no-repeat'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='pt-10'>
          <div className='grid items-center max-[991px]:justify-items-start grid-cols-1 md:grid-cols-2 gap-8 '>
          <div className=''>
                <h1 className='font-bold text-cyan-700 mb-8 text-4xl md:text-4xl text-center'>Thanh toán thành công 👘</h1>
                <Alert sx={{ mb: 4 }} severity='success'>
                  Quá trình giao hàng có thể mất từ 3 - 6 ngày !
                </Alert>
                <Alert sx={{ mb: 4 }} severity='success'>
                  Hãy liên lạc với chúng tôi nếu có bất kì thắc mắc nào !
                </Alert>
                <Alert sx={{ mb: 4 }} severity='success'>
                  Quay lại và trải nghiệm dịch vụ tuyệt vời mà chúng tôi mang đến !
                </Alert>
                <Button sx={{ height: '60px' }} fullWidth variant='outlined' size='large' startIcon={<ArrowBackIcon />}>
                  <Link to='/purchase-history'>Xem lịch sử mua hảng</Link>
                </Button>
              </div>
            <div className='max-[991px]:mx-auto max-[991px]:max-w-[720px]'>
              <img
                src='https://marketplace.canva.com/EAEjWzCYDDo/1/0/1600w/canva-simple-congratulations-your-work-is-done-perfectly-notification-instagram-post-chmgays-KUU.jpg'
                alt='banner-authenticate'
                className='inline-block max-w-full rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
