import PropTypes from 'prop-types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/routes/routeConfig';
import { FormatPrice } from 'src/utils/formatPrice';

const CardProduct = ({ product }) => {
  const navigate = useNavigate();

  const handleRedirectToProductDetail = () => {
    navigate(generatePath(ROUTES.PRODUCT_DETAIL_PAGE, { id: product.id }));
  };

  return (
    <div className='card flex flex-col justify-center items-center'>
      <div className='card__img'>
        <img onClick={handleRedirectToProductDetail} className='cursor-pointer' src={product?.images[0]} alt='img' />
      </div>
      <div className='card__content flex flex-col justify-center  gap-[4px] mt-2 w-[80%]'>
        <p
          onClick={handleRedirectToProductDetail}
          className='card__title overflow-hidden text-ellipsis line-clamp-2 text-[#333f48] cursor-pointer'
        >
          {product?.nameProduct}
        </p>
        <p className='card__price-sale font-bold'>
          {FormatPrice(product?.originalPrice * (1 - product?.percentSale))} đ
        </p>
        <div className='flex justify-start items-center gap-[10px]'>
          <span className={`card__price-original line-through ${product?.percentSale ? '' : 'hidden'}`}>
            {FormatPrice(product?.originalPrice)} đ
          </span>
          <span className={`card__price-sale-percent text-[red] ${product?.percentSale ? '' : 'hidden'}`}>
            {product?.percentSale * 100} %
          </span>
        </div>
      </div>
    </div>
  );
};

CardProduct.propTypes = {
  product: PropTypes.object
};

export default CardProduct;
