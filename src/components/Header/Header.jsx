import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Divider, Avatar, TextField, MenuItem, Menu, Button } from '@mui/material';
import { useState } from 'react';
import CartDrawer from '../CartDrawer/CartDrawer';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className='z-10 sticky top-0 left-0 right-0'>
      <div className='bg-white shadow-md  px-6 lg:px-0'>
        <div className='flex h-[70px] max-w-7xl w-full mx-auto items-center justify-between sm:h-[80px] '>
          <Link to='/' className='hidden md:block'>
            <img src='https://canifa.com/assets/images/logo.svg' alt='logo' className='w-[200] h-auto' />
          </Link>
          <div className='hidden lg:flex gap-3  '>
            <Button>
              <Link to='/' className='font-bold text-md'>
                Siêu hội vocher
              </Link>
            </Button>
            <div>
              <Button>
                <Link to='/products' className='font-bold text-md'>
                  Sản phẩm
                </Link>
              </Button>
            </div>
            <Button>
              <Link to='/cart' className='font-bold text-md'>
                Blog
              </Link>
            </Button>
          </div>
          <div className='relative w-full xs:w-[50%] md:max-w-[300px] '>
            <TextField id='search-input' label='Search' variant='outlined' size='small' fullWidth />
            <IconButton sx={{ position: 'absolute', right: '5px' }}>
              <SearchIcon />
            </IconButton>
          </div>
          <div className='flex gap-2 lg:gap-6 items-center'>
            <div className='flex items-center flex-col'>
              <div
                className='p-2 cursor-pointer'
                id='account-button'
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <IconButton>
                  <Avatar sx={{ width: 24, height: 24 }} />
                </IconButton>
              </div>
              <Menu
                id='account-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'account-button'
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to='/register' className='r-8'>
                    Đăng kí
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to='/login' className='r-4'>
                    Đăng nhập
                  </Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <Link to='/login' className='r-4'>
                    Trung tâm trợ giúp
                  </Link>
                </MenuItem>
              </Menu>
            </div>
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
