import ProductList from 'src/components/ProductList';
import SideBar from 'src/components/SideBar';

const ProductPage = () => {
  return (
    <div className='flex justify-between gap-[50px] items-start'>
      <div className='w-[25%]'>
        <SideBar />
      </div>
      <div className='w-[75%]'>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
