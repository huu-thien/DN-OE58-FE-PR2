import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { deleteOneAccount, getListAccount } from 'src/services/adminService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const AdminManageAccount = () => {
  const [listAccounts, setListAccounts] = useState([]);
  useEffect(() => {
    getListAccountFromDB();
  }, []);
  const getListAccountFromDB = async () => {
    try {
      const response = await getListAccount();
      if (response && response.status === 200) {
        setListAccounts(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveAccount = async (id) => {
    try {
      const response = await deleteOneAccount(id);
      if (response && response.status === 200) {
        const resolveAfter2Sec = new Promise((resolve) => setTimeout(resolve, 1400));
        toast
          .promise(resolveAfter2Sec, {
            pending: 'Đang xóa tài khoản !',
            success: 'Xóa tài khoản thành công !'
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
      field: 'username',
      headerName: 'Tên đăng nhập',
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'fullName',
      headerName: 'Tên đầy đủ',
      type: 'number',
      headerAlign: 'left',
      flex: 1,
      align: 'left',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      flex: 1,

    },
    {
      field: 'role',
      headerName: 'Vai trò',
      align: 'left',
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return <Chip label={role} sx={role === 'admin' ? { backgroundColor: '#fff4ea', color: '#ffb26c' } : {backgroundColor: '#deeeec', color: '#12ae9b'}} />;
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
              to={`/admin-manage-accounts/edit/${id}`}
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 focus:outline-none'
            >
              Chỉnh sửa
            </Link>
            <button
              type='button'
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mr-2'
              onClick={() => handleRemoveAccount(id)}
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
      <h2 className='font-bold uppercase text-red-500'>Quản lý tài khoản</h2>
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
            color: `#da291c !important`
          }
        }}
      >
        <DataGrid
          rows={listAccounts}
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

export default AdminManageAccount;
