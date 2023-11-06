import { TextField } from '@mui/material';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOneAccount, patchEditAccount } from 'src/services/adminService';
import { toast } from 'react-toastify';
import { getListUsers } from 'src/services/authService';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminEditAccount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setfullName] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [role, setRole] = useState('admin');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    getOneAccount(id)
      .then((response) => {
        const account = response.data;
        setUsername(account.username);
        setEmail(account.email);
        setfullName(account.fullName);
        setPassword(account.password);
        setImageUrl(account.imageUrl);
        setRole(account.role);
        setPhone(account.phone);
        setAddress(account.address);
      })
      .catch((error) => console.log(error));
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const listUsers = await getListUsers();
      const isExistEmail = listUsers.data.find((item) => item.email === email && item.id !== Number(id));
      if (isExistEmail) {
        toast.error('Email đã tồn tại !');
        return;
      }
      const isExistUsername = listUsers.data.find((item) => item.username === username && item.id !== Number(id));
      if (isExistUsername) {
        toast.error('Tên đăng nhập đã tồn tại !');
        return;
      }
      const acountEdit = { username, email, password, phone, address, role, imageUrl, fullName };
      const response = await patchEditAccount(acountEdit, id);
      if (response && response.status === 200) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang chỉnh sửa thông tin !',
            success: 'Chỉnh sửa thông tin thành công !'
          })
          .then(() => {
            navigate('/admin-manage-accounts');
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/admin-manage-accounts' className='hover:underline hover:text-cyan-600 pl-4'>
          Quản lý tài khoản
        </Link>
        <p color=''>Chỉnh sửa tài khoản</p>
      </Breadcrumbs>
      <section className='py-1 bg-blueGray-50'>
        <div className='w-full lg:w-8/12 px-4 mx-auto mt-6'>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='text-center flex justify-between'>
                <h6 className='text-blueGray-700 text-xl font-bold'>ID Tài khoản : {id}</h6>
              </div>
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>Thông tin người dùng</h6>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='username'
                      label='Tên đăng nhập'
                      variant='outlined'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='email'
                      label='Email'
                      variant='outlined'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='fullName'
                      label='Tên đầy đủ'
                      variant='outlined'
                      value={fullName}
                      onChange={(e) => setfullName(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='imageUrl'
                      label='Link Avatar'
                      variant='outlined'
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='password'
                      label='Mật khẩu'
                      variant='outlined'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <RadioGroup
                      row
                      aria-labelledby='demo-controlled-radio-buttons-group'
                      name='controlled-radio-buttons-group'
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <FormControlLabel value='admin' control={<Radio />} label='Admin' />
                      <FormControlLabel value='user' control={<Radio />} label='User' />
                    </RadioGroup>
                  </div>
                </div>

                <hr className='mt-6 border-b-1 border-blueGray-300' />

                <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>Thông tin liên lạc</h6>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-12/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='address'
                      label='Địa chỉ'
                      variant='outlined'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-12/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='phone'
                      label='Số điện thoại'
                      variant='outlined'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                >
                  Lưu tài khoản
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminEditAccount;
