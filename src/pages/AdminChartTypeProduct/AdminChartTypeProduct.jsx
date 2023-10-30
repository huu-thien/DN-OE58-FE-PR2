import { Box } from '@mui/material';
import BarCharttypeProduct from 'src/components/BarChartTypeProduct';
const AdminChartTypeProduct = () => {
  return (
    <Box m='20px'>
      <p className="uppercase font-bold text-red-500">Doanh thu theo loại sản phầm</p>
      <Box height='75vh'>
        <BarCharttypeProduct />
      </Box>
    </Box>
  );
};

export default AdminChartTypeProduct;
