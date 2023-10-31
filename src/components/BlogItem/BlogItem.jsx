const BlogItem = () => {
  return (
    <div className='blog-item flex first-letter justify-center gap-[40px] items-center my-16'>
      <div className='blog-item__image'>
        <img
          className='max-w-[350px]'
          src='https://media.canifa.com/mageplaza/blog/post//2023/04/phong-cach-thoi-trang-vintage-5-1.webp'
          alt='img'
        />
      </div>

      <div className='blog-item__content flex flex-col gap-[10px]'>
        <p className='blog-item__type text-lg'>Tin tức</p>
        <p className='blog-item__title font-bold text-2xl'>Vintage là gì ? Toàn tập về phong cách thời trang Vintage</p>
        <p className='blog-item__description overflow-hidden text-ellipsis line-clamp-3 text-justify'>
          Từ vintage được sử dụng để miêu tả những đồ vật hoặc sản phẩm được sản xuất và phân phối trong một thời kỳ đã
          qua, thường là từ 20 đến 100 năm trước. Các sản phẩm vintage thường mang lại một cảm giác cổ điển, độc đáo và
          đặc biệt đối với người sử dụng hoặc người sưu tập. Các sản phẩm vintage cũng thường được đánh giá cao về mặt
          giá trị vì tính độc đáo, lịch sử và sự hiếm có của chúng.
        </p>
        <p className='blog-item__date text-[#939393]'>02:57 8/6/2023</p>
      </div>
    </div>
  );
};

export default BlogItem;
