import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardProduct from 'src/components/CardProduct/CardProduct';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from 'src/redux/reducer/productSlice';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { addCartItem } from 'src/redux/reducer/cartSlice';

const schemaProductDetail = Yup.object().shape({
  color: Yup.string().required('Vui lòng chọn màu'),
  size: Yup.string().required('Vui lòng chọn kích cỡ')
});

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { productDetail, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductDetail(params.id));
  }, []);

  const methods = useForm({
    defaultValues: {
      color: '',
      size: ''
    },
    resolver: yupResolver(schemaProductDetail)
  });
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = methods;

  const onValid = (formValue) => {
    const formProductCart = {
      idProduct: productDetail.id,
      ...formValue,
      quantity: quantity,
      price: productDetail.originalPrice,
      percentSale: productDetail.percentSale
    };
    dispatch(addCartItem(formProductCart));
  };

  const productsClone = [...products];
  const productsRelated = productsClone.filter(
    (product) => product.productFor === productDetail.productFor && product.typeProduct === productDetail.typeProduct
  );
  const productsRelatedRender = productsRelated.slice(0, 4);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  useEffect(() => {
    setNav1(slider1Ref.current);
    setNav2(slider2Ref.current);
  }, []);

  const handleChangeQuantity = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderImages = (images) => {
    return images?.map((img, index) => {
      return (
        <div key={index}>
          <img src={img} alt='img' />
        </div>
      );
    });
  };

  const renderColors = (colors) => {
    return colors?.map((color, index) => {
      return (
        <MenuItem key={index} value={color}>
          {color}
        </MenuItem>
      );
    });
  };

  const renderSizes = (sizes) => {
    return sizes?.map((size, index) => {
      return (
        <MenuItem key={index} className='w-full flex justify-center items-center cursor-pointer uppercase' value={size}>
          {size}
        </MenuItem>
      );
    });
  };

  const renderProductsRelated = (productsRelated) => {
    return productsRelated.map((product, index) => {
      return (
        <div key={index} className='max-w-[180px] md:max-w-[300px]'>
          <CardProduct product={product} />
        </div>
      );
    });
  };

  return (
    <div>
      <div className='product-detail__container flex justify-between mt-16'>
        <div className='product-detail__img-grp w-[55%] '>
          {/* img main */}
          <Slider asNavFor={nav2} ref={slider1Ref}>
            {renderImages(productDetail?.images)}
          </Slider>
          {/* thumbnails img */}
          <Slider asNavFor={nav1} ref={slider2Ref} slidesToShow={3} swipeToSlide={true} focusOnSelect={true}>
            {renderImages(productDetail?.images)}
          </Slider>
        </div>

        <form onSubmit={handleSubmit(onValid)} className='product-detail__right-grp w-[40%] '>
          <div>
            <p className='text-xl lg:text-2xl font-[600]'>{productDetail?.nameProduct}</p>
          </div>
          <div>
            <p className='my-4'>Mã sp: {productDetail?.codeProduct}</p>
          </div>
          <div>
            <p className='font-bold text-lg'>{productDetail?.originalPrice * (1 - productDetail.percentSale)} ₫</p>
          </div>
          <div>
            <span className={`text-lg line-through me-[20px] ${productDetail.percentSale ? '' : 'hidden'}`}>
              {productDetail?.originalPrice} ₫
            </span>
            <span className={`font-[500] text-red-500 text-md ${productDetail.percentSale ? '' : 'hidden'}`}>
              -{productDetail.percentSale * 100} %
            </span>
          </div>
          {/* color */}
          <div className='product-detail__colors border-b-2 border-solid border-[#efefef] py-4'>
            <div className='my-4'>
              <p className='font-bold text-[#333f48] text-[16px]'>Màu sắc</p>
            </div>
            <div>
              <Controller
                control={control}
                name='color'
                render={({ field }) => {
                  return (
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel>Màu sắc</InputLabel>
                        <Select {...field}>{renderColors(productDetail.colors)}</Select>
                      </FormControl>
                    </Box>
                  );
                }}
              />
              {!!errors.color?.message && <i className='text-red-500'>{errors.color?.message}</i>}
            </div>
          </div>
          {/* end color */}

          {/* size */}
          <div className='product-detail__sizes border-b-2 border-solid border-[#efefef] py-4'>
            <div className='my-4'>
              <p className='font-bold text-[#333f48] text-[16px] cursor-pointer'>Kích cỡ</p>
            </div>
            <div>
              <Controller
                control={control}
                name='size'
                render={({ field }) => {
                  return (
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel>Kích cỡ</InputLabel>
                        <Select {...field}>{renderSizes(productDetail?.sizes)}</Select>
                      </FormControl>
                    </Box>
                  );
                }}
              />
              {!!errors.size?.message && <i className='text-red-500'>{errors.size?.message}</i>}
            </div>
          </div>
          {/* end size */}

          {/* quantity */}
          <div className='border-b-2 border-solid border-[#efefef] py-4'>
            <div className='my-4'>
              <p className='font-bold text-[#333f48] text-[16px] cursor-pointer'>Số lượng</p>
            </div>
            <button type='button' onClick={handleDecreaseQuantity} className='border-solid border-2 w-[40px] h-[40px]'>
              -
            </button>
            <input
              type='text'
              value={quantity}
              className='border-solid border-2 w-[40px] h-[40px] text-center'
              onChange={handleChangeQuantity}
            />
            <button type='button' onClick={handleIncreaseQuantity} className='border-solid border-2 w-[40px] h-[40px]'>
              +
            </button>
          </div>
          {/* end quantity */}

          {/* btn-add-to-cart */}
          <div className='flex justify-center items-center border-b-2 border-solid border-[#efefef] py-8'>
            <button type='submit' className='bg-red-500 text-white w-full h-[60px] text-lg font-bold'>
              Thêm vào giỏ hàng
            </button>
          </div>
          {/* end btn-add-to-cart */}

          {/* description */}
          <div className='product-detail__descriptions border-b-2 border-solid border-[#efefef] py-4'>
            <div className='my-4'>
              <p className='font-bold text-[#333f48] text-[16px] cursor-pointer'>Mô tả</p>
            </div>
            <div>
              <p className='text-justify leading-7 overflow-hidden text-ellipsis line-clamp-5'>
                Áo được may từ chất liệu cotton với form relax, có đường cắt rộng rãi, tạo cảm giác thoải mái và tự
                nhiên khi mặc. Hình in ở ngực áo mang phong cách hiện đại, bền, đẹp, không nứt trong quá trình sử dụng.
              </p>
            </div>
          </div>
          {/* end description */}
        </form>
      </div>

      {/* block service */}
      <div className='block-service flex justify-between my-8'>
        <div className='block-service__left flex justify-center items-center gap-[10px]'>
          <div>
            <img
              className='w-full max-w-[100%]'
              src='https://media.canifa.com/Simiconnector/Service/s/e/service1.png'
              alt='COD'
            />
          </div>
          <div>
            <p className='text-bold'>Thanh toán khi nhận hàng (COD)</p>
            <p className='text-[rgba(51,63,72,.5)]'>Giao hàng toàn quốc.</p>
          </div>
        </div>

        <div className='block-service__middle flex justify-center items-center gap-[10px]'>
          <div>
            <img src='https://media.canifa.com/Simiconnector/Service/s/e/service2.png' alt='free_ship' />
          </div>
          <div>
            <p className='text-bold'>Miễn phí giao hàng</p>
            <p className='text-[rgba(51,63,72,.5)]'>Với đơn hàng trên 599.000đ.</p>
          </div>
        </div>

        <div className='block-service__right flex justify-center items-center gap-[10px]'>
          <div>
            <img src='https://media.canifa.com/Simiconnector/Service/s/e/service3.png' alt='img' />
          </div>
          <div>
            <p className='text-bold'>Đổi hàng miễn phí</p>
            <p className='text-[rgba(51,63,72,.5)]'>Trong 30 ngày kể từ ngày mua.</p>
          </div>
        </div>
      </div>
      {/* end block service */}

      {/* related product */}
      <div className='mb-12'>
        <div>
          <p className='font-[600] text-2xl my-4'>Sản phẩm gợi ý</p>
        </div>
        <div className='flex gap-[10px] flex-wrap justify-between'>{renderProductsRelated(productsRelatedRender)}</div>
      </div>
      {/* end related product */}
    </div>
  );
};

export default ProductDetailPage;
