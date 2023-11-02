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
import { actSetSortPrice, fetchProducts, setNewPage, setProductFor } from 'src/redux/reducer/productSlice';
import { useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sortPrice, setSortPrice] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    q,
    pagination,
    params,
    _sort,
    _order,
    productFor,
    category,
    size,
    color,
    originalPrice_gte,
    originalPrice_lte
  } = useSelector((state) => state.product);

  const urlParams = new URLSearchParams(window.location.search);
  const searchParamURL = searchParams.get('q');
  const sortParamURL = searchParams.get('_sort');
  const orderParamURL = searchParams.get('_order');
  const currentPageParamURL = parseInt(searchParams.get('_page'));
  const categoryParamURL = searchParams.get('typeProduct');
  const sizeParamURL = searchParams.get('sizes_like');
  const colorParamURL = searchParams.get('colors_like');
  const priceGteParamURL = searchParams.get('originalPrice_gte');
  const priceLteParamURL = searchParams.get('originalPrice_lte');

  let productForParamURL;
  const textProductFor = searchParams.get('productFor');
  switch (textProductFor) {
    case 'Nam':
      productForParamURL = 'man';
      break;
    case 'Nữ':
      productForParamURL = 'woman';
      break;
    case 'Bé trai':
      productForParamURL = 'childrenBoy';
      break;
    case 'Bé gái':
      productForParamURL = 'childrenGirl';
      break;
  }

  useEffect(() => {
    dispatch(
      fetchProducts({
        ...params,
        q: q || searchParamURL,
        _sort: _sort || sortParamURL,
        _order: _order || orderParamURL,
        productFor: productFor || productForParamURL,
        typeProduct: category || categoryParamURL,
        sizes_like: size || sizeParamURL,
        colors_like: color || colorParamURL,
        originalPrice_gte: originalPrice_gte || priceGteParamURL,
        originalPrice_lte: originalPrice_lte || priceLteParamURL,
        _page: currentPageParamURL || pagination._page,
        _limit: pagination._limit
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination._page, q, _sort, _order, productFor, category, size, color, originalPrice_gte, originalPrice_lte]);

  const handleChangeSortPrice = (event) => {
    setSortPrice(event.target.value);
    urlParams.set('_sort', 'originalPrice');
    urlParams.set('_order', `${event.target.value}`);
    setSearchParams(urlParams.toString());
    dispatch(actSetSortPrice(event.target.value));
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    urlParams.set('_page', `${value}`);
    setSearchParams(urlParams.toString());
    dispatch(setNewPage(value));
  };

  const handleGetProductFor = (e) => {
    urlParams.set('productFor', `${e.target.outerText}`);
    setSearchParams(urlParams.toString());
    dispatch(setProductFor(e.target.outerText));
  };

  const renderProducts = (products) => {
    return products?.map((product) => {
      return <CardProduct key={product.id} product={product} />;
    });
  };

  return (
    <div className='flex flex-col gap-[20px] my-4'>
      <div className='flex justify-between items-center'>
        <ul className='flex gap-[30px] flex-wrap'>
          <li
            onClick={handleGetProductFor}
            className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'
          >
            Nam
          </li>
          <li
            onClick={handleGetProductFor}
            className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'
          >
            Nữ
          </li>
          <li
            onClick={handleGetProductFor}
            className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'
          >
            Bé trai
          </li>
          <li
            onClick={handleGetProductFor}
            className='border-solid border-2 rounded-full px-6 py-2 cursor-pointer border-[#d3d3d3] min-w-[40px]'
          >
            Bé gái
          </li>
        </ul>
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
          count={
            (pagination._total / pagination._limit) % 1 === 0
              ? pagination._total / pagination._limit
              : Math.floor(pagination._total / pagination._limit) + 1
          }
          page={currentPageParamURL || page}
          onChange={handleChangePage}
        />
      </Stack>
      {/* end pagination */}
    </div>
  );
};

export default ProductList;
