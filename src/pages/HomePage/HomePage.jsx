import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardProduct from 'src/components/CardProduct/CardProduct';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} next-arrow absolute top-[35%] right-4 z-50 opacity-0`}
      style={{ ...style, display: 'block', background: '#d0d0d0' }}
      onClick={onClick}
    />
  );
};
NextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} prev-arrow absolute top-[35%] left-4 z-50 opacity-0`}
      style={{ ...style, display: 'block', background: '#d0d0d0' }}
      onClick={onClick}
    />
  );
};
PrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

const HomePage = () => {
  const { products } = useSelector((state) => state.product);

  const productsClone = [...products];
  const productsSale = productsClone.filter((product) => product.percentSale !== 0);
  const productsMan = productsClone.filter((product) => product.productFor === 'man').slice(0, 4);
  const productsWoman = productsClone.filter((product) => product.productFor === 'woman').slice(0, 4);
  const productsChild = productsClone
    .filter((product) => product.productFor === 'childrenGirl' || product.productFor === 'childrenBoy')
    .slice(0, 4);

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  const settingsProduct = {
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const renderProductsSale = (products) => {
    return products.map((product) => {
      return (
        <div key={product.id}>
          <CardProduct product={product} />
        </div>
      );
    });
  };

  const renderProductsMan = (products) => {
    return products.map((product) => {
      return (
        <div key={product.id}>
          <CardProduct product={product} />
        </div>
      );
    });
  };

  const renderProductsWoMan = (products) => {
    return products.map((product) => {
      return (
        <div key={product.id}>
          <CardProduct product={product} />
        </div>
      );
    });
  };

  const renderProductsChildren = (products) => {
    return products.map((product) => {
      return (
        <div key={product.id}>
          <CardProduct product={product} />
        </div>
      );
    });
  };

  return (
    <div className='container flex justify-center items-center'>
      <div className='w-full'>
        {/* carousel */}
        <div className='home__carousel absolute w-full top-0 left-0 mt-[120px]'>
          <div>
            <Slider {...settings}>
              <div>
                <img
                  className='h-[450px] w-full'
                  src='https://media.canifa.com/Simiconnector/BannerSlider/s/h/shvc-top-banner_desktop.webp'
                  alt='carousel_1'
                />
              </div>
              <div>
                <img
                  className='h-[450px] w-full'
                  src='https://media.canifa.com/Simiconnector/BannerSlider/g/i/giasocmoingay_top_banner_desktop.webp'
                  alt='carousel_2'
                />
              </div>
              <div>
                <img
                  className='h-[450px] w-full'
                  src='https://media.canifa.com/Simiconnector/BannerSlider/b/s/bst-academy-top-banner-desktop.webp'
                  alt='carousel_3'
                />
              </div>
              <div>
                <img
                  className='h-[450px] w-full'
                  src='https://media.canifa.com/Simiconnector/BannerSlider/w/o/wolfoo-homepage-desktop_2880x960_2.webp'
                  alt='carousel_4'
                />
              </div>
            </Slider>
          </div>
        </div>
        {/* end carousel */}

        <div className='home__block-service flex justify-between mt-[470px]'>
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

        {/* sale product */}
        <div className='home__product-sale mt-8'>
          <div className='product-sale__title flex justify-between items-center mb-6'>
            <p className='uppercase font-[600] text-xl'>Sản phẩm giảm giá!</p>
            <div className='cursor-pointer'>
              <span>Xem thêm</span>
              <span className='text-[red] font-bold ms-2'>{`>>`}</span>
            </div>
          </div>

          <div className='product-sale__list'>
            <div className='container-slick relative'>
              <Slider {...settingsProduct}>{renderProductsSale(productsSale)}</Slider>
            </div>
          </div>
        </div>
        {/* end sale product */}

        {/* promotion */}
        <div className='mt-8'>
          <div className='mb-6'>
            <p className='uppercase font-[600] text-xl'>Ưu đãi độc quyền</p>
          </div>
          <div className='flex justify-between items-center gap-[10px]'>
            <div>
              <img
                className='max-w-[400px] w-full'
                src='https://media.canifa.com/Simiconnector/promotion_onoff/1/_/1.-sieuhoivoucher_banner-uu-dai_voucher-public.webp'
                alt='promotion_1'
              />
            </div>
            <div>
              <img
                className='max-w-[400px] w-full'
                src='https://media.canifa.com/Simiconnector/promotion_onoff/2/_/2.-sieuhoivoucher_banner-uu-dai_game-online.webp'
                alt='promotion_2'
              />
            </div>
            <div>
              <img
                className='max-w-[400px] w-full'
                src='https://media.canifa.com/Simiconnector/promotion_onoff/s/i/sieuhoivoucher_uu-dai_flash-sale-30.10.webp'
                alt='promotion_3'
              />
            </div>
          </div>
        </div>
        {/* end promotion */}

        {/* new product */}
        <div className='mt-8'>
          <div className='mb-6'>
            <p className='uppercase font-[600] text-xl'>Sản phẩm mới</p>
          </div>
          <div className='flex justify-between items-center gap-[10px]'>
            <div className='cursor-pointer'>
              <img
                className='w-full max-w-[310px]'
                src='https://media.canifa.com/Simiconnector/list_image_tablet1697990595.webp'
                alt='new_product'
              />
            </div>
            <div className='cursor-pointer'>
              <img
                className='w-full max-w-[310px]'
                src='https://media.canifa.com/Simiconnector/list_image_tablet_second1697990596.webp'
                alt='new_product'
              />
            </div>
            <div className='cursor-pointer'>
              <img
                className='w-full max-w-[310px]'
                src='https://media.canifa.com/Simiconnector/list_image_tablet_third1697990596.webp'
                alt='new_product'
              />
            </div>
            <div className='cursor-pointer'>
              <img
                className='w-full max-w-[310px]'
                src='https://media.canifa.com/Simiconnector/list_image_tablet_41697990596.webp'
                alt='new_product'
              />
            </div>
          </div>
        </div>
        {/* end new product */}

        {/* men product */}
        <div className='mt-8'>
          <div className='mb-6 flex justify-between'>
            <p className='uppercase font-[600] text-xl'>Nam</p>
            <p className='cursor-pointer me-2'>Xem thêm</p>
          </div>
          <div className='flex justify-between gap-[10px]'>{renderProductsMan(productsMan)}</div>
        </div>
        {/* end men product */}

        {/* women product */}
        <div className='mt-8'>
          <div className='mb-6 flex items-center justify-between'>
            <p className='uppercase font-[600] text-xl'>Nữ</p>
            <p className='cursor-pointer me-2'>Xem thêm</p>
          </div>
          <div className='flex justify-between gap-[10px]'>{renderProductsWoMan(productsWoman)}</div>
        </div>
        {/* end women product */}

        {/* children product */}
        <div className='mt-8'>
          <div className='mb-6 flex items-center justify-between'>
            <p className='uppercase font-[600] text-xl'>Trẻ em</p>
            <p className='cursor-pointer me-2'>Xem thêm</p>
          </div>
          <div className='flex justify-between gap-[10px]'>{renderProductsChildren(productsChild)}</div>
        </div>
        {/* end children product */}

        {/* canifa life */}
        <div className='mt-8 mb-16'>
          <div className='mb-6 flex items-center justify-between'>
            <p className='uppercase font-[600] text-xl'>CANIFALIFE</p>
            <p className='cursor-pointer me-2'>Xem thêm</p>
          </div>
          <div className='flex justify-between items-center gap-[10px]'>
            <div className='flex flex-col gap-[10px]'>
              <div>
                <img
                  className='w-full max-w-[400px]'
                  src='https://media.canifa.com/mageplaza/blog/post//g/a/game-online-1.webp'
                  alt='life_1'
                />
              </div>
              <div>
                <p className='text-ellipsis overflow-hidden line-clamp-2 font-bold'>
                  ĐỒ ĐẸP, GIÁ HỜI, SẮM SỬA THẢNH THƠI CÙNG SIÊU HỘI VOUCHER NHÀ CANIFA
                </p>
              </div>
              <div>
                <p className='text-[rgba(51,63,72,.5)]'>20:31 24/10/2023</p>
              </div>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <div>
                <img
                  className='w-full max-w-[400px]'
                  src='https://media.canifa.com/mageplaza/blog/post//g/a/game-online-1.webp'
                  alt='life_1'
                />
              </div>
              <div>
                <p className='text-ellipsis overflow-hidden line-clamp-2 font-bold'>
                  ĐỒ ĐẸP, GIÁ HỜI, SẮM SỬA THẢNH THƠI CÙNG SIÊU HỘI VOUCHER NHÀ CANIFA
                </p>
              </div>
              <div>
                <p className='text-[rgba(51,63,72,.5)]'>20:31 24/10/2023</p>
              </div>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <div>
                <img
                  className='w-full max-w-[400px]'
                  src='https://media.canifa.com/mageplaza/blog/post//g/a/game-online-1.webp'
                  alt='life_1'
                />
              </div>
              <div>
                <p className='text-ellipsis overflow-hidden line-clamp-2 font-bold'>
                  ĐỒ ĐẸP, GIÁ HỜI, SẮM SỬA THẢNH THƠI CÙNG SIÊU HỘI VOUCHER NHÀ CANIFA
                </p>
              </div>
              <div>
                <p className='text-[rgba(51,63,72,.5)]'>20:31 24/10/2023</p>
              </div>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <div>
                <img
                  className='w-full max-w-[400px]'
                  src='https://media.canifa.com/mageplaza/blog/post//g/a/game-online-1.webp'
                  alt='life_1'
                />
              </div>
              <div>
                <p className='text-ellipsis overflow-hidden line-clamp-2 font-bold'>
                  ĐỒ ĐẸP, GIÁ HỜI, SẮM SỬA THẢNH THƠI CÙNG SIÊU HỘI VOUCHER NHÀ CANIFA
                </p>
              </div>
              <div>
                <p className='text-[rgba(51,63,72,.5)]'>20:31 24/10/2023</p>
              </div>
            </div>
          </div>
        </div>
        {/* end canifa life */}
      </div>
    </div>
  );
};

export default HomePage;
