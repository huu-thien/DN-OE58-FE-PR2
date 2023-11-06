import { useState } from 'react';
import PropTypes from 'prop-types';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useSelector } from 'react-redux';
import ImageAdminDefault from 'src/assets/admin-default.png';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import BarChartIcon from '@mui/icons-material/BarChart';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon}>
      <p>{title}</p>
      <Link to={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const admin = useSelector((state) => state.auth.user);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        '& .pro-sidebar-layout': { backgroundColor: '#f7f7f7' },
        '& .pro-sidebar': {},
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
          color: '#333'
        },
        '& .pro-inner-item': {
          color: '#333',
          padding: '5px 35px 5px 20px !important'
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important'
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important'
        },
        minHeight: '705px'
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0'
            }}
          >
            {!isCollapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <p className='font-bold text-cyan-700'>ADMIN</p>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width={100}
                  height={100}
                  src={admin.imageUrl ? admin.imageUrl : ImageAdminDefault}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign='center'>
                <p className='pt-2 font-bold text-cyan-700'>{admin.fullName}</p>
              </Box>
            </Box>
          )}

          {/* Menu Item */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/admin'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <p className='py-2 px-4 text-sm font-bold text-cyan-700'>Manage</p>
            <Item
              title='Quản lý tài khoản'
              to='/admin-manage-accounts'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Quản lý sản phẩm'
              to='/admin-manage-products'
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Quản lý doanh thu'
              to='admin-manage-revenues'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <p className='py-2 px-4 text-sm font-bold text-cyan-700'>Chart</p>
            <Item
              title='Biểu đồ danh mục'
              to='admin-chart-category'
              icon={<PieChartOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Loại sản phẩm'
              to='admin-chart-type'
              icon={<BarChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired
};
export default AdminSidebar;
