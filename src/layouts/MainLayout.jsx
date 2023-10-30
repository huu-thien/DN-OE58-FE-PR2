import Header from 'src/components/Header';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import SubHeader from 'src/components/SubHeader';

const MainLayout = () => {
  return (
    <div>
      <SubHeader />
      <Header />
      <div className='w-full max-w-7xl mx-auto py-6 min-h-[700px]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
