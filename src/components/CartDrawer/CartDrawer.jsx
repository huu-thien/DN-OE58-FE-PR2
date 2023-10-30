import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CartItem from '../CartItem';
import { Drawer, Badge, Box } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';


const CartDrawer = () => {
  // Cart
  const [state, setState] = useState({
    right: false
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className='flex items-center flex-col'>
      <div>
        <Badge badgeContent={1} color='primary'>
          <IconButton onClick={toggleDrawer('right', true)}>
            <AddShoppingCartIcon color='primary' />
          </IconButton>
        </Badge>
        <Drawer
          sx={{ position: 'relative' }}
          anchor='right'
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
          <Box sx={{ width: 500, p: 4, overflowY: 'auto' }}>
            <div className='flex items-center justify-between pb-6'>
              <h4 className='text-xl font-bold text-cyan-700'> Giỏ hàng</h4>
              <IconButton onClick={toggleDrawer('right', false)}>
                <ChevronRightIcon sx={{ color: 'rgb(14, 116 ,144)' }} />
              </IconButton>
            </div>
            <div className="flex justify-end pb-4">
              <Button sx={{borderColor: "red", color: 'red'}} size="small" variant='outlined'>Xóa tất cả giỏ hàng</Button>
            </div>
            <div className='mb-48'>
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
            </div>
          </Box>
          <div className='border-t border-gray-200 px-4 py-6 sm:px-6 absolute bottom-0 left-0 right-0 bg-white'>
            <div className='flex justify-between text-base font-medium text-gray-900'>
              <p>Giá trị đơn hàng</p>
              <p>$262.00</p>
            </div>
            <p className='mt-0.5 text-sm text-gray-500'>Vận chuyển và thuế được tính khi thanh toán</p>
            <div className='mt-6'>
              <Link
                to='/checkout'
                onClick={toggleDrawer('right', false)}
                className='w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
              >
                Thanh toán
              </Link>
            </div>
            <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
              <button
                type='button'
                className='font-medium text-indigo-600 hover:text-indigo-500'
                onClick={toggleDrawer('right', false)}
              >
                Tiếp tục mua hàng
                <span aria-hidden='true'> &rarr;</span>
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default CartDrawer;
