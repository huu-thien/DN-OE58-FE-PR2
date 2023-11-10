import { useState } from 'react';
import ProductList from 'src/components/ProductList';
import SideBar from 'src/components/SideBar';

const ProductPage = () => {
  const [selectedProductFor, setSelectedProductFor] = useState(null);

  return (
    <div className='flex justify-between gap-[50px] items-start'>
      <div className='w-[25%]'>
        <SideBar setSelectedProductFor={setSelectedProductFor}/>
      </div>
      <div className='w-[75%]'>
        <ProductList selectedProductFor={selectedProductFor} setSelectedProductFor={setSelectedProductFor}/>
      </div>
    </div>
  );
};

export default ProductPage;
