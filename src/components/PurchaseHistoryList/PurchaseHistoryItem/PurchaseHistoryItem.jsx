const PurchaseHistoryItem = () => {
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>1//11/2023 12:00</td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>4433-33221</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>Nguyen Huu Thien</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>2.000.000 vnd</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span aria-hidden className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
          <span className='relative'>Thành công</span>
        </span>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='underline hover:text-cyan-600 cursor-pointer'>Chi tiết</p>
      </td>
    </tr>
  );
};

export default PurchaseHistoryItem;
