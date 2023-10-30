import { Box, IconButton, TextField } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { saveLogout } from 'src/redux/reducer/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminTopbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
    toast
      .promise(resolveAfter2Sec, {
        pending: 'Đang đăng xuất !',
        success: 'Đăng xuất thành công !'
      })
      .then(() => {
        dispatch(saveLogout());
        localStorage.removeItem('user');
        navigate('/login');
      });
  };

  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      {/* Search bar */}
      <Box display='flex' borderRadius='3px' sx={{ position: 'relative' }}>
        <TextField label='Search' variant='outlined' size='small' />
        <IconButton type='button' sx={{ p: 1, position: 'absolute', right: 4, top: 0 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display='flex'>
        <Link to='/'>
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon sx={{ color: '#f44336' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AdminTopbar;
