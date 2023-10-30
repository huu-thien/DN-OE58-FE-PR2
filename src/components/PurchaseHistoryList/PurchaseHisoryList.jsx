import PurchaseHistoryItem from './PurchaseHistoryItem';

const PurchaseHisoryList = () => {
  return (
    <table className='min-w-full leading-normal'>
      <thead>
        <tr>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Ngày thanh toán
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Số thẻ
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Tên chủ thẻ
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Tổng tiền
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Trạng thái
          </th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
            Xem chi tiết
          </th>
        </tr>
      </thead>
      <tbody>
        <PurchaseHistoryItem />
        <PurchaseHistoryItem />
        <PurchaseHistoryItem />
        <PurchaseHistoryItem />
      </tbody>
    </table>
  );
};

export default PurchaseHisoryList;
