import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CardProduct from '../CardProduct/CardProduct';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setNewPage } from 'src/redux/reducer/productSlice';
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, q, pagination, params } = useSelector((state) => state.product);

  const urlParams = new URLSearchParams(window.location.search);
  const searchParamURL = searchParams.get('q');
  const currentPageParamURL = parseInt(searchParams.get('_page'));

  useEffect(() => {
    dispatch(
      fetchProducts({
        ...params,
        q: q || searchParamURL,
        _page: pagination._page || currentPageParamURL,
        _limit: pagination._limit
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination._page, q]);

  const handleChangeSortPrice = (event) => {
    setSortPrice(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    urlParams.set('_page', `${value}`);
    setSearchParams(urlParams.toString());
    dispatch(setNewPage(value));
  };

  const renderProducts = (products) => {
    return products?.map((product) => {
      return <CardProduct key={product.id} product={product} />;
    });
  };

  return (
    <div className='flex flex-col gap-[20px] my-4'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-[30px] flex-wrap'>
          <div className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'>
            Nam
          </div>
          <div className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'>
            Nữ
          </div>
          <div className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'>
            Bé trai
          </div>
          <div className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'>
            Bé gái
          </div>
        </div>
        <Box>
          <FormControl fullWidth>
            <InputLabel id='filter-sort-price'>Sắp xếp theo</InputLabel>
            <Select
              className='h-[50px] min-w-[180px]'
              labelId='filter-sort-price'
              id='selected-sort-price-grp'
              value={sortPrice}
              label='sort-price'
              onChange={handleChangeSortPrice}
            >
              <MenuItem value={'asc'}>Giá tăng dần</MenuItem>
              <MenuItem value={'desc'}>Giá giảm dần</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      {/* product list */}
      <div className='product-list grid items-start grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[20px] gap-y-[40px]'>
        {renderProducts(products)}
      </div>
      {/* end product list */}

      {/* pagination */}
      <Stack spacing={2} className='flex justify-center items-center my-6'>
        <Pagination
          count={Math.floor(pagination._total / pagination._limit) + 1}
          page={page || currentPageParamURL}
          onChange={handleChangePage}
        />
      </Stack>
      {/* end pagination */}
    </div>
  );
};

export default ProductList;
