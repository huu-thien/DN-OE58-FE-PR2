import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormatPrice } from 'src/utils/formatPrice';
import { deleteCartItem } from 'src/redux/reducer/cartSlice';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { idProduct, color, size, quantity: quantityCartItem } = props.cartItem;

  const productItem = products.filter((product) => product.id === idProduct);

  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem(idProduct));
  };

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
            src={productItem[0].images[0]}
            alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='ml-4 flex flex-1 flex-col'>
          <div>
            <div className='flex justify-between text-base font-medium text-gray-900'>
              <h3>
                <a href='#'>{productItem[0].nameProduct}</a>
              </h3>
              <p className='ml-4'>{FormatPrice(productItem[0].originalPrice * (1 - productItem[0].percentSale))} đ</p>
            </div>
            <p className='mt-1 text-sm text-gray-500'>Size: {size.toUpperCase()}</p>
            <p className='mt-1 text-sm text-gray-500 capitalize'>Color: {color}</p>
          </div>
          <div className='flex flex-1 items-end justify-between text-sm'>
            <div className='flex items-center'>
              <Button variant='outlined' size='small' onClick={handleMinus}>
                <RemoveIcon sx={{ fontSize: 16 }} />
              </Button>
              <span className='text-center w-8 text-cyan-700'>{quantityCartItem}</span>
              <Button variant='outlined' size='small' onClick={handlePlus}>
                <AddIcon sx={{ fontSize: 16 }} />
              </Button>
            </div>
            <button
              type='button'
              onClick={handleDeleteCartItem}
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object
};

export default CartItem;
