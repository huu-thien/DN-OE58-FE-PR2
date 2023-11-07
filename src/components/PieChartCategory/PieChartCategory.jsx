import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';
import { getAllOrders } from 'src/services/checkoutService';
import { FormatPrice } from 'src/utils/formatPrice';

const PieChartCategory = () => {
  const [listOrderDB, setListOrderDB] = useState([]);
  useEffect(() => {
    getAllOrdersFromDB();
  }, []);

  const getAllOrdersFromDB = async () => {
    const response = await getAllOrders();
    if (response && response.status === 200) {
      setListOrderDB(response.data);
    }
  };
  const allProductsInOrder = [];
  for (const order of listOrderDB) {
    // Lặp qua từng sản phẩm trong listProduct của đơn đặt hàng
    for (const product of order.listProduct) {
      allProductsInOrder.push(product);
    }
  }
  let renevueMan = 0;
  let renevueWoman = 0;
  let renevueChildrenGirl = 0;
  let renevueChildrenBoy = 0;

  allProductsInOrder.forEach((product) => {
    switch (product.productFor) {
      case 'man':
        renevueMan += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'woman':
        renevueWoman += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'childrenGirl':
        renevueChildrenGirl += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'childrenBoy':
        renevueChildrenBoy += product.price * (1 - product.percentSale) * product.quantity;
        break;
    }
  });
  const mockPieData = [
    {
      id: 'man',
      label: 'man',
      value: renevueMan,
      color: 'hsl(104, 70%, 50%)'
    },
    {
      id: 'woman',
      label: 'woman',
      value: renevueWoman,
      color: 'hsl(162, 70%, 50%)'
    },
    {
      id: 'childrenGirl',
      label: 'childrenGirl',
      value: renevueChildrenGirl,
      color: 'hsl(291, 70%, 50%)'
    },
    {
      id: 'childrenBoy',
      label: 'childrenBoy',
      value: renevueChildrenBoy,
      color: 'hsl(229, 70%, 50%)'
    }
  ];
  return (
    <>
      <p>
        Tổng doanh thu : {FormatPrice(renevueMan + renevueWoman + renevueChildrenGirl + renevueChildrenBoy)} đ
      </p>
      <ResponsivePie
        data={mockPieData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: '#1d7490'
              }
            },
            legend: {
              text: {
                fill: '#1d7490'
              }
            },
            ticks: {
              line: {
                stroke: '#1d7490',
                strokeWidth: 1
              }
            }
          },
          legends: {
            text: {
              fill: '#1d7490'
            }
          },
          tooltip: {
            container: {
              color: '#141b2d'
            }
          }
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-180}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={'#1d7490'}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#1d7490',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#1d7490',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </>
  );
};

export default PieChartCategory;
