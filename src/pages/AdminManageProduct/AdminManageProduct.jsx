import { Box, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { deleteOneProduct, getListProduct } from 'src/services/adminService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminManageProduct = () => {
  const [listProducts, setListAccounts] = useState([]);
  useEffect(() => {
    getListAccountFromDB();
  }, []);
  const getListAccountFromDB = async () => {
    try {
      const response = await getListProduct();
      if (response && response.status === 200) {
        setListAccounts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveProduct = async (id) => {
    try {
      const response = await deleteOneProduct(id);
      if (response && response.status === 200) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang xóa sản phẩm !',
            success: 'Xóa sản phẩm thành công !'
          })
          .then(async () => {
            getListAccountFromDB();
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'nameProduct',
      headerName: 'Tên sản phẩm',
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'originalPrice',
      headerName: 'Giá gốc',
      type: 'number',
      headerAlign: 'left',
      flex: 1,
      align: 'left'
    },
    {
      field: 'percentSale',
      headerName: 'Giảm giá',
      flex: 1,
      renderCell: ({ row: { percentSale } }) => {
        return <span>{percentSale * 100}%</span>;
      }
    },
    {
      field: 'typeProduct',
      headerName: 'Loại sản phẩm',
      flex: 1
    },
    {
      field: 'productFor',
      headerName: 'Danh mục',
      align: 'left',
      renderCell: ({ row: { productFor } }) => {
        return (
          <>
            <span>{productFor === 'man' && `Nam`}</span>
            <span>{productFor === 'woman' && `Nữ`}</span>
            <span>{productFor === 'childrenGirl' && `Bé gái`}</span>
            <span>{productFor === 'childrenBoy' && `Bé trai`}</span>
          </>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      align: 'left',
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <>
            <Link
              to={`/admin-manage-products/edit/${id}`}
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 focus:outline-none'
            >
              Chỉnh sửa
            </Link>
            <button
              type='button'
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mr-2'
              onClick={() => handleRemoveProduct(id)}
            >
              Xóa
            </button>
          </>
        );
      }
    }
  ];

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold uppercase text-red-500'>Quản lý sản phẩm</h2>
        <Button variant='contained'>
          <Link to='/admin-manage-products/add'>Thêm sản phẩm</Link>
        </Button>
      </div>
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .name-column--cell': {
            // color: colors.greenAccent[300]
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(226,35,26,0.1)',
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            // backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: 'rgba(226,35,26,0.1)'
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `#da291c !important`,
            marginBottom: 2
          }
        }}
      >
        <DataGrid
          rows={listProducts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          // disableRowSelectionOnClick
          // pageSizeOptions={[2]}
        />
      </Box>
    </div>
  );
};

export default AdminManageProduct;
