import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { getListOrder } from 'src/services/adminService';
import { useEffect } from 'react';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const AdminManageRevenue = () => {
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    getListAccountFromDB();
  }, []);
  const getListAccountFromDB = async () => {
    try {
      const response = await getListOrder();
      console.log(response);
      if (response && response.status === 200) {
        setListOrder(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'createdAt',
      headerName: 'Ngày thanh toán',
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'cardHolder',
      headerName: 'Tên khách hàng',
      flex: 1
    },
    {
      field: 'cardNumber',
      headerName: 'Số thẻ',
      align: 'left',
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      align: 'left',
      flex: 1
    },
    {
      field: 'totalBill',
      headerName: 'Tổng tiền',
      type: 'number',
      headerAlign: 'left',
      flex: 1,
      align: 'left'
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Chip
            label={status === 'pending' ? 'Đang chờ' : 'Thành công'}
            sx={
              status === 'pending'
                ? { backgroundColor: '#fff4ea', color: '#ffb26c' }
                : { backgroundColor: '#deeeec', color: '#12ae9b' }
            }
          />
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
              to={`/purchase-detail/${id}`}
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 focus:outline-none'
            >
              Xem chi tiết
            </Link>
          </>
        );
      }
    }
  ];

  return (
    <div className='p-4'>
      <h2 className='font-bold uppercase text-red-500'>Quản lý doanh thu</h2>
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
          rows={listOrder}
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

export default AdminManageRevenue;
