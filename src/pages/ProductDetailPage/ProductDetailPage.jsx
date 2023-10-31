import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardProduct from 'src/components/CardProduct/CardProduct';

const ProductDetailPage = () => {
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  useEffect(() => {
    setNav1(slider1Ref.current);
    setNav2(slider2Ref.current);
  }, []);

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div className='product-detail__container flex justify-between mt-16'>
        <div className='product-detail__img-grp w-[55%] '>
          {/* img main */}
          <Slider asNavFor={nav2} ref={slider1Ref}>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sn187-xl-1-u.webp' alt='img' />
            </div>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sw001-xl-1-u.webp' alt='img' />
            </div>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sk010-xl-1-u.webp' alt='img' />
            </div>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sn187-xl-3.webp' alt='img' />
            </div>
          </Slider>
          {/* thumbnails img */}
          <Slider asNavFor={nav1} ref={slider2Ref} slidesToShow={3} swipeToSlide={true} focusOnSelect={true}>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sn187-xl-1-u.webp' alt='img' />
            </div>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sw001-xl-1-u.webp' alt='img' />
            </div>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sk010-xl-1-u.webp' alt='img' />
            </div>
            <div>
              <img src='https://canifa.com/img/1000/1500/resize/8/t/8ts23w005-sn187-xl-3.webp' alt='img' />
            </div>
          </Slider>
        </div>

        <div className='product-detail__right-grp w-[40%] '>
          <div>
            <p className='text-xl lg:text-2xl font-[600]'>Áo phông nam cotton dáng rộng có hình in</p>
          </div>
          <div>
            <p className='my-4'>Mã sp: 8TS23W005</p>
          </div>
          <div>
            <p className='font-bold text-lg'>299.000 ₫</p>
          </div>
          {/* color */}
          <div className='product-detail__colors border-b-2 border-solid border-[#efefef] py-4'>
            <div className='my-4'>
              <p className='font-bold text-[#333f48] text-[16px]'>Màu sắc</p>
            </div>
            <div>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id='filter-color'>Màu sắc</InputLabel>
                  <Select
                    labelId='filter-color'
                    id='selected-color-grp'
                    value={color}
                    label='Color'
                    onChange={handleChangeColor}
                  >
                    <MenuItem value={'Black'}>Black</MenuItem>
                    <MenuItem value={'White'}>White</MenuItem>
                    <MenuItem value={'Blue'}>Blue</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          {/* end color */}

          {/* size */}
          <div className='product-detail__sizes border-b-2 border-solid border-[#efefef] py-4'>
            <div className='my-4'>
              <p className='font-bold text-[#333f48] text-[16px] cursor-pointer'>Kích cỡ</p>
            </div>
            <div className='flex flex-wrap justify-start gap-[10px]'>
              <div className='border-solid border-2 border-[#efefef] max-w-[30px] w-full flex justify-center items-center cursor-pointer'>
                S
              </div>
              <div className='border-solid border-2 border-[#efefef] max-w-[30px] w-full flex justify-center items-center cursor-pointer'>
                M
              </div>
              <div className='border-solid border-2 border-[#efefef] max-w-[30px] w-full flex justify-center items-center cursor-pointer'>
                L
              </div>
              <div className='border-solid border-2 border-[#efefef] max-w-[30px] w-full flex justify-center items-center cursor-pointer'>
                XL
              </div>
            </div>
          </div>
          {/* end size */}

          {/* quantity */}
          <div className='border-b-2 border-solid border-[#efefef] py-4'>
            <div className='my-4'>
              <p className='font-bold text-[#333f48] text-[16px] cursor-pointer'>Số lượng</p>
            </div>
            <button onClick={handleDecreaseQuantity} className='border-solid border-2 w-[40px] h-[40px]'>
              -
            </button>
            <input
              type='text'
              value={quantity}
              className='border-solid border-2 w-[40px] h-[40px] text-center'
              onChange={handleChangeQuantity}
            />
            <button onClick={handleIncreaseQuantity} className='border-solid border-2 w-[40px] h-[40px]'>
              +
            </button>
          </div>
          {/* end quantity */}

          {/* btn-add-to-cart */}
          <div className='flex justify-center items-center border-b-2 border-solid border-[#efefef] py-8'>
            <button className='bg-red-500 text-white w-full h-[60px] text-lg font-bold'>Thêm vào giỏ hàng</button>
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
        </div>
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
        <div className='flex gap-[10px] flex-wrap justify-between items-center'>
          <div className='max-w-[180px] md:max-w-[300px]'>
            <CardProduct />
          </div>
          <div className='max-w-[180px] md:max-w-[300px]'>
            <CardProduct />
          </div>
          <div className='max-w-[180px] md:max-w-[300px]'>
            <CardProduct />
          </div>
          <div className='max-w-[180px] md:max-w-[300px]'>
            <CardProduct />
          </div>
        </div>
      </div>
      {/* end related product */}
    </div>
  );
};

export default ProductDetailPage;
