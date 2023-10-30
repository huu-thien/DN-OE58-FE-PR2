
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import PurchaseHisoryList from 'src/components/PurchaseHistoryList';

const PurchaseHistoryPage = () => {
  return (
    <div className='bg-white p- 8 rounded-md w-full'>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/' className='hover:underline hover:text-cyan-600'>
          Trang chủ
        </Link>
        <p color=''>Lịch sử thanh toán</p>
      </Breadcrumbs>
      <div>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <PurchaseHisoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
