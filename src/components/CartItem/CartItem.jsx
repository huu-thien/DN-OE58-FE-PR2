import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
const CartItem = () => {
  const [quantity, setQuantity] = useState(1);
  const handlePlus = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <>
      <div className='flex py-4'>
        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
          <img
            src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
            alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='ml-4 flex flex-1 flex-col'>
          <div>
            <div className='flex justify-between text-base font-medium text-gray-900'>
              <h3>
                <a href='#'>Throwback Hip Bag</a>
              </h3>
              <p className='ml-4'>$90.00</p>
            </div>
            <p className='mt-1 text-sm text-gray-500'>Salmon</p>
          </div>
          <div className='flex flex-1 items-end justify-between text-sm'>
            <div className='flex items-center'>
              <Button variant='outlined' size='small' onClick={handleMinus}>
                <RemoveIcon sx={{ fontSize: 16 }} />
              </Button>
              <span className='text-center w-8 text-cyan-700'>{quantity}</span>
              <Button variant='outlined' size='small' onClick={handlePlus}>
                <AddIcon sx={{ fontSize: 16 }} />
              </Button>
            </div>
            <button type='button' className='font-medium text-indigo-600 hover:text-indigo-500'>
              Remove
            </button>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CartItem;
