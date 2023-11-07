import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FormatPrice } from 'src/utils/formatPrice';

import { deleteCartItem, minusQuantity, plusQuantity } from 'src/redux/reducer/cartSlice';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { id, idProduct, color, size, quantity: quantityCartItem } = props.cartItem;

  const productItem = products.filter((product) => product.id === idProduct);

  const handleDeleteCartItem = () => {
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    dispatch(deleteCartItem(idProduct));
  };

  const handlePlus = () => {
    dispatch(plusQuantity({ id: id, quantity: 1 }));
  };
  const handleMinus = () => {
    dispatch(minusQuantity({ id: id, quantity: 1 }));
  };
  return (
    <>
      <div className='flex py-4'>
        <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
          <img
            src={productItem[0]?.images[0]}
            alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='ml-4 flex flex-1 flex-col'>
          <div>
            <div className='flex justify-between text-base font-medium text-gray-900'>
              <h3 className='pr-4'>
                <p>{productItem[0]?.nameProduct}</p>
              </h3>
              <div className="flex gap-1">
                <span>{FormatPrice(productItem[0]?.originalPrice * (1 - productItem[0]?.percentSale))}</span>
                <span>đ</span>
              </div>
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
            <IconButton aria-label='delete' onClick={handleDeleteCartItem}>
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
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
