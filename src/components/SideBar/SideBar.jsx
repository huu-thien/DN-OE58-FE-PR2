import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
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

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState('');
  const [priceRange, setPriceRange] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);

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
        urlParams.delete('originalPrice_gte');
        urlParams.set('originalPrice_lte', 1000000);
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
  };

  const handleGetSize = (e) => {
    urlParams.set('sizes_like', `${e.target.innerText}`);
    setSearchParams(urlParams.toString());
    dispatch(actSetSize(e.target.innerText));
  };

  const handleClearFilter = () => {
    navigate('/products');
    dispatch(actClearFilter());
  };

  return (
    <div className='side-bar mt-16'>
      {/* categories */}
      <div className='side-bar__categories border-b-2 border-solid border-[#efefef] py-4'>
        <div className='flex items-center justify-between my-4'>
          <p className='font-bold text-[#333f48] text-[16px]'>Danh mục</p>

          <FilterAltOffIcon onClick={handleClearFilter} className='cursor-pointer' />
        </div>
        <div className='flex flex-col gap-[4px]'>
          <p onClick={handleGetCategory} className='cursor-pointer w-[60px] hover:text-[red]'>
            Áo
          </p>
          <p onClick={handleGetCategory} className='cursor-pointer w-[60px] hover:text-[red]'>
            Quần
          </p>
          <p onClick={handleGetCategory} className='cursor-pointer w-[60px] hover:text-[red]'>
            Váy
          </p>
          <p onClick={handleGetCategory} className='cursor-pointer w-[60px] hover:text-[red]'>
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
            className='border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer'
          >
            S
          </div>
          <div
            onClick={handleGetSize}
            className='border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer'
          >
            M
          </div>
          <div
            onClick={handleGetSize}
            className='border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer'
          >
            L
          </div>
          <div
            onClick={handleGetSize}
            className='border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer'
          >
            XL
          </div>
          <div
            onClick={handleGetSize}
            className='border-solid border-2 border-[#efefef] max-w-[30px] w-full flex justify-center items-center cursor-pointer'
          >
            XXL
          </div>
          <div
            onClick={handleGetSize}
            className='border-solid border-2 border-[#efefef] max-w-[50px] flex justify-center items-center cursor-pointer'
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

export default SideBar;
