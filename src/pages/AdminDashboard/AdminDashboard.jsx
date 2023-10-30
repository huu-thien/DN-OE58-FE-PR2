import { Box } from '@mui/material';
import BarCharttypeProduct from 'src/components/BarChartTypeProduct';
import PieChartCategory from 'src/components/PieChartCategory';
const AdminDashboard = () => {
  return (
    <Box m='20px' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box gridColumn='span 4' gridRow='span 2'>
        <Box height='500px' width='650px' mt='-20px'>
          <BarCharttypeProduct />
        </Box>
      </Box>
      <Box  width='500px'>
        <Box height='400px'>
          <PieChartCategory />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
