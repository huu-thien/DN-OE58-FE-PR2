import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  actClearFilter,
  actSetCategory,
  actSetColor,
  actSetFilterPrice,
  actSetSize
} from 'src/redux/reducer/productSlice';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

const SideBar = ({ setSelectedProductFor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const colorParamURL = searchParams.get('colors_like');
  const [color, setColor] = useState(colorParamURL || '');
  const [priceRange, setPriceRange] = useState('');
  const urlParams = new URLSearchParams(window.location.search);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const priceGteParamURL = searchParams.get('originalPrice_gte');
  const priceLteParamURL = searchParams.get('originalPrice_lte');

  useEffect(() => {
    if (priceGteParamURL == null && priceLteParamURL == '200000') {
      setPriceRange('< 200.000');
    }
    if (priceGteParamURL == '200000' && priceLteParamURL == '500000') {
      setPriceRange('200.000 - 500.000');
    }
    if (priceGteParamURL == '500000' && priceLteParamURL == '1000000') {
      setPriceRange('500.000 - 1.000.000');
    }
    if (priceGteParamURL == '1000000' && priceLteParamURL == null) {
      setPriceRange('> 1.000.000');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeColor = (event) => {
    setColor(event.target.value);
    urlParams.set('colors_like', `${event.target.value}`);
    setSearchParams(urlParams.toString());
    dispatch(actSetColor(event.target.value));
  };

  const handleChangePriceRange = (event) => {
    setPriceRange(event.target.value);
    switch (event.target.value) {
      case '< 200.000':
        urlParams.delete('originalPrice_gte');
        urlParams.set('originalPrice_lte', 200000);
        setSearchParams(urlParams.toString());
        break;
      case '200.000 - 500.000':
        urlParams.set('originalPrice_gte', 200000);
        urlParams.set('originalPrice_lte', 500000);
        urlParams.sort();
        setSearchParams(urlParams.toString());
        break;
      case '500.000 - 1.000.000':
        urlParams.set('originalPrice_gte', 500000);
        urlParams.set('originalPrice_lte', 1000000);
        urlParams.sort();
        setSearchParams(urlParams.toString());
        break;
      case '> 1.000.000':
        urlParams.set('originalPrice_gte', 1000000);
        urlParams.delete('originalPrice_lte');
        setSearchParams(urlParams.toString());
        break;
      default:
        break;
    }
    dispatch(actSetFilterPrice(event.target.value));
  };

  const handleGetCategory = (e) => {
    urlParams.set('typeProduct', `${e.target.innerText}`);
    setSearchParams(urlParams.toString());
    dispatch(actSetCategory(e.target.innerText));
    setSelectedCategory(`${e.target.innerText}`);
  };

  const handleGetSize = (e) => {
    urlParams.set('sizes_like', `${e.target.innerText}`);
    setSearchParams(urlParams.toString());
    dispatch(actSetSize(e.target.innerText));
    setSelectedSize(e.target.innerText);
  };

  const handleClearFilter = () => {
    navigate('/products');
    dispatch(actClearFilter());
    setColor('');
    setPriceRange('');
    setSelectedCategory(null);
    setSelectedSize(null);
    setSelectedProductFor(null);
  };

  return (
    <div className='side-bar mt-16'>
      {/* categories */}
      <div className='side-bar__categories border-b-2 border-solid border-[#efefef] py-4'>
        <div className='flex items-center justify-between my-4'>
          <p className='font-bold text-[#333f48] text-[16px]'>Danh mục</p>
          <IconButton sx={{ color: '#ef4444' }} onClick={handleClearFilter}>
            <FilterAltOffIcon className='cursor-pointer' />
          </IconButton>
        </div>
        <div className='flex flex-col gap-[4px]'>
          <p
            onClick={handleGetCategory}
            className={`cursor-pointer w-[60px] ${
              selectedCategory === 'Áo' ? 'text-red-500 font-bold' : 'text-black'
            } hover:text-red-500`}
          >
            Áo
          </p>
          <p
            onClick={handleGetCategory}
            className={`cursor-pointer w-[60px] ${
              selectedCategory === 'Quần' ? 'text-red-500 font-bold' : 'text-black'
            } hover:text-red-500`}
          >
            Quần
          </p>
          <p
            onClick={handleGetCategory}
            className={`cursor-pointer w-[60px] ${
              selectedCategory === 'Váy' ? 'text-red-500 font-bold' : 'text-black'
            } hover:text-red-500`}
          >
            Váy
          </p>
          <p
            onClick={handleGetCategory}
            className={`cursor-pointer w-[60px] ${
              selectedCategory === 'Đồ bộ' ? 'text-red-500 font-bold' : 'text-black'
            } hover:text-red-500`}
          >
            Đồ bộ
          </p>
        </div>
      </div>
      {/*end  categories */}

      {/* size */}
      <div className='side-bar__sizes border-b-2 border-solid border-[#efefef]  py-4'>
        <div className='my-4'>
          <p className='font-bold text-[#333f48] text-[16px] cursor-pointer'>Kích cỡ</p>
        </div>
        <div className='flex flex-wrap justify-start gap-[10px]'>
          <div
            onClick={handleGetSize}
            className={`border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer px-8 py-2 ${
              selectedSize === 'S' ? 'text-red-500 font-bold' : 'text-black'
            }`}
          >
            S
          </div>
          <div
            onClick={handleGetSize}
            className={`border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer px-8 py-2 ${
              selectedSize === 'M' ? 'text-red-500 font-bold' : 'text-black'
            }`}
          >
            M
          </div>
          <div
            onClick={handleGetSize}
            className={`border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer px-8 py-2 ${
              selectedSize === 'L' ? 'text-red-500 font-bold' : 'text-black'
            }`}
          >
            L
          </div>
          <div
            onClick={handleGetSize}
            className={`border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer px-8 py-2 ${
              selectedSize === 'XL' ? 'text-red-500 font-bold' : 'text-black'
            }`}
          >
            XL
          </div>
          <div
            onClick={handleGetSize}
            className={`border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer px-8 py-2 ${
              selectedSize === 'XXL' ? 'text-red-500 font-bold' : 'text-black'
            }`}
          >
            XXL
          </div>
          <div
            onClick={handleGetSize}
            className={`border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer px-8 py-2 ${
              selectedSize === 'XXXL' ? 'text-red-500 font-bold' : 'text-black'
            }`}
          >
            XXXL
          </div>
        </div>
      </div>
      {/* end size */}

      {/* color */}
      <div className='side-bar__colors border-b-2 border-solid border-[#efefef] py-4'>
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
                <MenuItem value={'Grey'}>Grey</MenuItem>
                <MenuItem value={'Pink'}>Pink</MenuItem>
                <MenuItem value={'Orange'}>Orange</MenuItem>
                <MenuItem value={'Yellow'}>Yellow</MenuItem>
                <MenuItem value={'Purple'}>Purple</MenuItem>
                <MenuItem value={'purpleCharcoal'}>Purple Charcoal</MenuItem>
                <MenuItem value={'Red'}>Red</MenuItem>
                <MenuItem value={'Green'}>Green</MenuItem>
                <MenuItem value={'Brown'}>Brown</MenuItem>
                <MenuItem value={'Cyan'}>Cyan</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      {/* end color */}

      {/* price */}
      <div className='side-bar__price-range border-b-2 border-solid border-[#efefef]  py-4'>
        <div className='my-4'>
          <p className='font-bold text-[#333f48] text-[16px]'>Khoảng giá</p>
        </div>
        <div>
          <Box>
            <FormControl fullWidth>
              <InputLabel id='filter-price-range'>Khoảng giá</InputLabel>
              <Select
                labelId='filter-price-range'
                id='selected-price-range-grp'
                value={priceRange}
                label='priceRange'
                onChange={handleChangePriceRange}
              >
                <MenuItem value={'< 200.000'}>Dưới 200.000đ</MenuItem>
                <MenuItem value={'200.000 - 500.000'}>200.000đ - 500.000đ</MenuItem>
                <MenuItem value={'500.000 - 1.000.000'}>500.000đ - 1.000.000đ</MenuItem>
                <MenuItem value={'> 1.000.000'}>Trên 1.000.000đ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      {/* end price */}
    </div>
  );
};
SideBar.propTypes = {
  setSelectedProductFor: PropTypes.func.isRequired
};

export default SideBar;
