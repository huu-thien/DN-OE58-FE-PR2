import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getListUsers, postRegisterUser } from 'src/services/authService';
import { toast } from 'react-toastify';
import { saveLogin } from 'src/redux/reducer/authSlice';

const ButtonLoginGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useGoogleLogin({
    // https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=
    onSuccess: async (data) => {
      // fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenResponse.access_token}`)
      const infoUser = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`
      )
        .then((response) => response.json())
        .then((infoUserObj) => {
          return infoUserObj;
        })
        .catch((err) => console.error(err));

      try {
        const response = await getListUsers();
        if (response && response.status === 200) {
          const listUsers = response.data;
          const userLogin = listUsers.find((user) => user.email === infoUser.email);
          if (userLogin) {
            const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
            toast
              .promise(resolveAfter2Sec, {
                pending: 'Đang đăng nhập !',
                success: 'Đăng nhập thành công !'
              })
              .then(() => {
                localStorage.setItem('user', JSON.stringify(userLogin));
                dispatch(saveLogin(userLogin));
                navigate('/');
              });
          } else {
            const dataRegister = {
              fullName: infoUser.name,
              username: infoUser.email,
              email: infoUser.email,
              password: 'User@123',
              role: 'user',
              imageUrl: infoUser.picture
            };
            const responseRegister = await postRegisterUser(dataRegister);
            if (responseRegister && responseRegister.status === 201) {
              const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
              toast
                .promise(resolveAfter2Sec, {
                  pending: 'Đang tạo tài khoản !',
                  success: 'Đăng kí tài khoản thành công'
                })
                .then(() => {
                  navigate('/');
                  localStorage.setItem('user', JSON.stringify(responseRegister.data));
                  dispatch(saveLogin(responseRegister.data));
                });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  return (
    <Button
      onClick={() => login()}
      variant='outlined'
      sx={{
        height: '50px',
        mt: '20px '
      }}
      fullWidth
      startIcon={<GoogleIcon />}
    >
      Đăng nhập với Google
    </Button>
  );
};

export default ButtonLoginGoogle;
