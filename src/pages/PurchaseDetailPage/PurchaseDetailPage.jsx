import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllOrders } from 'src/services/checkoutService';
import { FormatPrice } from 'src/utils/formatPrice';

const PurchaseDetailPage = () => {
  const { id } = useParams();
  const [listOrder, setListOrder] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getListOrders();
  }, []);

  const getListOrders = async () => {
    const response = await getAllOrders();
    const orders = response.data;

    const orderRender = orders?.filter((order) => {
      return order.id === parseInt(id);
    });
    const listOrder = orderRender[0].listProduct;

    setListOrder(listOrder);
    setOrder(orderRender);
  };

  const renderOrder = (listOrder) => {
    return listOrder?.map((order, index) => {
      return (
        <tr key={index}>
          <td className='py-4 text-lg border-solid border-2 border-[#e1e1e1]'>{index + 1}</td>
          <td className='py-4 text-lg border-solid border-2 border-[#e1e1e1] flex justify-center items-center'>
            <img src={order?.img} className='max-w-[40px] max-h-[50px]' alt='img' />
          </td>
          <td className='py-4 text-lg border-solid border-2 border-[#e1e1e1]'>{order?.nameProduct}</td>
          <td className='py-4 text-lg border-solid border-2 border-[#e1e1e1]'>{FormatPrice(order?.price)}</td>
          <td className='py-4 text-lg border-solid border-2 border-[#e1e1e1]'>{order?.quantity}</td>
          <td className='py-4 text-lg border-solid border-2 border-[#e1e1e1]'>
            {FormatPrice(order?.price * order?.quantity)}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className='purchase-container w-full'>
      <div className='mb-8 mt-16'>
        <h1 className='text-2xl font-[600] capitalize'>Chi tiết lịch sử thanh toán</h1>
      </div>

      <div className='flex justify-center'>
        <table className='w-full border-solid border-2 border-[#e1e1e1] border-collapse text-center'>
          <thead>
            <tr>
              <th className='py-4'>STT</th>
              <th className='py-4'>Ảnh</th>
              <th className='py-4'>Tên sản phẩm</th>
              <th className='py-4'>Giá</th>
              <th className='py-4'>Số lượng</th>
              <th className='py-4'>Tổng</th>
            </tr>
          </thead>

          <tbody className='text-lg'>
            {renderOrder(listOrder)}

            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <td className='text-lg font-bold py-4'>{FormatPrice(order[0]?.totalBill)} đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseDetailPage;
