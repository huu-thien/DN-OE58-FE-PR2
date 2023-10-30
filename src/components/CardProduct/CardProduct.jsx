const CardProduct = () => {
  return (
    <div className='card flex flex-col justify-center items-center'>
      <div className='card__img'>
        <img
          className='cursor-pointer'
          src='https://canifa.com/img/1000/1500/resize/1/l/1ls22w017-sg480-130-1-ghep.webp'
          alt='img'
        />
      </div>
      <div className='card__content flex flex-col justify-center  gap-[4px] mt-2 w-[80%]'>
        <p className='card__title overflow-hidden text-ellipsis line-clamp-1 text-[#333f48] cursor-pointer'>
          Bộ mặc nhà bé gái cotton áo dài tay quần dài
        </p>
        <p className='card__price-sale font-bold'>199.000 đ</p>
        <div className='flex justify-start items-center gap-[10px]'>
          <span className='card__price-original line-through'>299.000 đ</span>
          <span className='card__price-sale-percent text-[red]'>-33%</span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
