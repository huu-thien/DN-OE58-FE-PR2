import { TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOneProduct, patchEditProduct } from 'src/services/adminService';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const listSize = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'];
const listColors = [
  'red',
  'blue',
  'yellow',
  'green',
  'orange',
  'purple',
  'pink',
  'brown',
  'gray',
  'black',
  'white',
  'cyan',
  'purpleCharcoal'
];

const AdminEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nameProduct, setNameProduct] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [percentSale, setPercentSale] = useState('');
  const [description, setDescription] = useState('');

  const [productFor, setProductFor] = useState('');
  const [typeProduct, setTypeProduct] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  useEffect(() => {
    getOneProduct(id)
      .then((response) => {
        const product = response.data;
        setNameProduct(product.nameProduct);
        setOriginalPrice(product.originalPrice);
        setPercentSale(product.percentSale);
        setDescription(product.description);

        setProductFor(product.productFor);
        setTypeProduct(product.typeProduct);
        setSizes(product.sizes);
        setColors(product.colors);

        setImage1(product.images[0]);
        setImage2(product.images[1]);
        setImage3(product.images[2]);
        setImage4(product.images[3]);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productEdit = {
        nameProduct,
        originalPrice: Number(originalPrice),
        percentSale: Number(percentSale),
        description,
        productFor,
        typeProduct,
        sizes,
        colors,
        images: [image1, image2, image3, image4]
      };
      const response = await patchEditProduct(productEdit, id);
      if (response && response.status === 200) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang chỉnh sửa sản phẩm !',
            success: 'Chỉnh sửa sản phẩm thành công !'
          })
          .then(() => {
            navigate('/admin-manage-products');
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/admin-manage-products' className='hover:underline hover:text-cyan-600 pl-4'>
          Quản lý sản phẩm
        </Link>
        <p color=''>Chỉnh sửa sản phẩm</p>
      </Breadcrumbs>
      <section className='py-1 bg-blueGray-50'>
        <div className='w-full lg:w-8/12 px-4 mx-auto mt-6'>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='text-center flex justify-between'>
                <h6 className='text-blueGray-700 text-xl font-bold'>ID Sản phẩm : {id}</h6>
              </div>
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
              <form onSubmit={(e) => handleSubmit(e)}>
                <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>Thông tin sản phẩm</h6>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='nameProduct'
                      label='Tên sản phẩm'
                      variant='outlined'
                      value={nameProduct}
                      onChange={(e) => setNameProduct(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='originalPrice'
                      label='Giá gốc (vnd)'
                      variant='outlined'
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='percentSale'
                      label='Giảm giá (0-1)'
                      variant='outlined'
                      value={percentSale}
                      onChange={(e) => setPercentSale(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='description'
                      label='Mô tả sản phẩm'
                      variant='outlined'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <InputLabel id='select-category'>Danh mục</InputLabel>
                    <Select
                      labelId='select-category'
                      id='productFor'
                      label='Category'
                      value={productFor}
                      onChange={(event) => {
                        setProductFor(event.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value='man'>Nam</MenuItem>
                      <MenuItem value='woman'>Nữ</MenuItem>
                      <MenuItem value='childrenBoy'>Bé trai</MenuItem>
                      <MenuItem value='childrenGirl'>Bé gái</MenuItem>
                    </Select>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <InputLabel id='select-type'>Loại sản phẩm</InputLabel>
                    <Select
                      labelId='select-type'
                      id='typeProduct'
                      label='Loại sản phẩm'
                      value={typeProduct}
                      onChange={(event) => {
                        setTypeProduct(event.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value='Áo'>Áo</MenuItem>
                      <MenuItem value='Quẩn'>Quần</MenuItem>
                      <MenuItem value='Váy'>Váy</MenuItem>
                      <MenuItem value='Đồ bộ'>Đồ bộ</MenuItem>
                    </Select>
                  </div>
                  <div className='w-full lg:w-6/12 px-4 mt-4'>
                    <InputLabel id='demo-multiple-size-label'>Size</InputLabel>
                    <Select
                      labelId='demo-multiple-size-label'
                      id='demo-multiple-size'
                      multiple
                      value={sizes}
                      onChange={(event) => {
                        const {
                          target: { value }
                        } = event;
                        setSizes(typeof value === 'string' ? value.split(',') : value);
                      }}
                      input={<OutlinedInput id='select-multiple-size' label='Chip' />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                      fullWidth
                    >
                      {listSize.map((sizeItem) => (
                        <MenuItem key={sizeItem} value={sizeItem}>
                          <Checkbox checked={sizes.indexOf(sizeItem) > -1} />
                          <ListItemText primary={sizeItem} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className='w-full lg:w-6/12 px-4 mt-4'>
                    <InputLabel id='demo-multiple-color-label'>Màu</InputLabel>
                    <Select
                      labelId='demo-multiple-color-label'
                      id='demo-multiple-color'
                      multiple
                      value={colors}
                      onChange={(event) => {
                        const {
                          target: { value }
                        } = event;
                        setColors(typeof value === 'string' ? value.split(',') : value);
                      }}
                      input={<OutlinedInput id='select-multiple-size' label='Chip' />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                      fullWidth
                    >
                      {listColors.map((colorItem) => (
                        <MenuItem key={colorItem} value={colorItem}>
                          <Checkbox checked={colors.indexOf(colorItem) > -1} />
                          <ListItemText primary={colorItem} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <hr className='mt-6 border-b-1 border-blueGray-300' />

                <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>Ảnh sản phẩm</h6>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-12/12 px-4'>
                    <TextField
                      sx={{
                        width: `100%`,
                        marginBottom: '20px'
                      }}
                      id='image1'
                      label='Link Ảnh 1'
                      variant='outlined'
                      value={image1}
                      onChange={(e) => setImage1(e.target.value)}
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
                      id='image2'
                      label='Link Ảnh 2'
                      variant='outlined'
                      value={image2}
                      onChange={(e) => setImage2(e.target.value)}
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
                      id='image3'
                      label='Link Ảnh 3'
                      variant='outlined'
                      value={image3}
                      onChange={(e) => setImage3(e.target.value)}
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
                      id='image4'
                      label='Link Ảnh 4'
                      variant='outlined'
                      value={image4}
                      onChange={(e) => setImage4(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '
                >
                  Lưu sản phẩm
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminEditProduct;
