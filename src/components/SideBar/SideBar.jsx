import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const SideBar = () => {
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleChangeMaterial = (event) => {
    setMaterial(event.target.value);
  };
  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangePriceRange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div className='side-bar mt-16'>
      {/* categories */}
      <div className='side-bar__categories border-b-2 border-solid border-[#efefef] py-4'>
        <div className='my-4'>
          <p className='font-bold text-[#333f48] text-[16px]'>Danh mục</p>
        </div>
        <div className='flex flex-col gap-[4px]'>
          <p className='cursor-pointer hover:text-[red]'>Áo</p>
          <p className='cursor-pointer hover:text-[red]'>Quần</p>
          <p className='cursor-pointer hover:text-[red]'>Bộ quần áo</p>
          <p className='cursor-pointer hover:text-[red]'>Đồ mặc trong</p>
        </div>
      </div>
      {/*end  categories */}

      {/* size */}
      <div className='side-bar__sizes border-b-2 border-solid border-[#efefef]  py-4'>
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
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      {/* end color */}

      {/* material */}
      <div className='side-bar__materials border-b-2 border-solid border-[#efefef] py-4'>
        <div className='my-4'>
          <p className='font-bold text-[#333f48] text-[16px]'>Chất liệu</p>
        </div>
        <div>
          <Box>
            <FormControl fullWidth>
              <InputLabel id='filter-material'>Chất liệu</InputLabel>
              <Select
                labelId='filter-material'
                id='selected-material-grp'
                value={material}
                label='material'
                onChange={handleChangeMaterial}
              >
                <MenuItem value={'Cotton'}>Cotton</MenuItem>
                <MenuItem value={'Len'}>Len</MenuItem>
                <MenuItem value={'Nỉ'}>Nỉ</MenuItem>
                <MenuItem value={'Jean'}>Jean</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      {/* end material */}

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
