import { Box } from '@mui/material';
import PieChartCategory from 'src/components/PieChartCategory';
const AdminChartCategory = () => {
  return (
    <Box m="20px">
      <p className="uppercase font-bold text-red-500">Biểu đồ doanh thu theo danh mục</p>
      <Box height="75vh">
        <PieChartCategory />
      </Box>
    </Box>
  )
}

export default AdminChartCategory
