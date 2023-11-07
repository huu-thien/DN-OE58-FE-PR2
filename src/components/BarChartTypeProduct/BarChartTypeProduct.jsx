import { ResponsiveBar } from '@nivo/bar';
import { useEffect, useState } from 'react';
import { getAllOrders } from 'src/services/checkoutService';


const BarCharttypeProduct = () => {
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

  const productOfMan = allProductsInOrder.filter((product) => product.productFor === 'man');
  const productOfWoman = allProductsInOrder.filter((product) => product.productFor === 'woman');
  const productOfChildrenGirl = allProductsInOrder.filter((product) => product.productFor === 'childrenGirl');
  const productOfChildrenBoy = allProductsInOrder.filter((product) => product.productFor === 'childrenBoy');

  let manShirt = 0;
  let manTrouser = 0;
  let manDress = 0;
  let manOutfit = 0;
  productOfMan.forEach((product) => {
    switch (product.typeProduct) {
      case 'Áo':
        manShirt += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Quần':
        manTrouser += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Váy':
        manDress += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Đồ bộ':
        manOutfit += product.price * (1 - product.percentSale) * product.quantity;
        break;
    }
  });

  let womanShirt = 0;
  let womanTrouser = 0;
  let womanDress = 0;
  let womanOutfit = 0;
  productOfWoman.forEach((product) => {
    switch (product.typeProduct) {
      case 'Áo':
        womanShirt += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Quần':
        womanTrouser += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Váy':
        womanDress += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Đồ bộ':
        womanOutfit += product.price * (1 - product.percentSale) * product.quantity;
        break;
    }
  });

  let childrenGirlShirt = 0;
  let childrenGirlTrouser = 0;
  let childrenGirlDress = 0;
  let childrenGirlOutfit = 0;
  productOfChildrenGirl.forEach((product) => {
    switch (product.typeProduct) {
      case 'Áo':
        childrenGirlShirt += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Quần':
        childrenGirlTrouser += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Váy':
        childrenGirlDress += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Đồ bộ':
        childrenGirlOutfit += product.price * (1 - product.percentSale) * product.quantity;
        break;
    }
  });

  let childrenBoyShirt = 0;
  let childrenBoyTrouser = 0;
  let childrenBoyDress = 0;
  let childrenBoyOutfit = 0;
  productOfChildrenBoy.forEach((product) => {
    switch (product.typeProduct) {
      case 'Áo':
        childrenBoyShirt += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Quần':
        childrenBoyTrouser += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Váy':
        childrenBoyDress += product.price * (1 - product.percentSale) * product.quantity;
        break;
      case 'Đồ bộ':
        childrenBoyOutfit += product.price * (1 - product.percentSale) * product.quantity;
        break;
    }
  });

  const dataRenevueByTypeProduct = [
    {
      Category: 'Nam',
      shirt: manShirt,
      shirtColor: 'hsl(229, 70%, 50%)',
      trouser: manTrouser,
      trouserColor: 'hsl(296, 70%, 50%)',
      dress: manDress,
      kebabColor: 'hsl(97, 70%, 50%)',
      outfit: manOutfit,
      outfitColor: 'hsl(340, 70%, 50%)'
    },
    {
      Category: 'Nữ',
      shirt: womanShirt,
      shirtColor: 'hsl(307, 70%, 50%)',
      trouser: womanTrouser,
      trouserColor: 'hsl(111, 70%, 50%)',
      dress: womanDress,
      kebabColor: 'hsl(273, 70%, 50%)',
      outfit: womanOutfit,
      outfitColor: 'hsl(275, 70%, 50%)'
    },
    {
      Category: 'Bé trai',
      shirt: childrenBoyShirt,
      shirtColor: 'hsl(72, 70%, 50%)',
      trouser: childrenBoyTrouser,
      trouserColor: 'hsl(96, 70%, 50%)',
      dress: childrenBoyDress,
      kebabColor: 'hsl(106, 70%, 50%)',
      outfit: childrenBoyOutfit,
      outfitColor: 'hsl(256, 70%, 50%)'
    },
    {
      Category: 'Bé gái',
      shirt: childrenGirlShirt,
      shirtColor: 'hsl(257, 70%, 50%)',
      trouser: childrenGirlTrouser,
      trouserColor: 'hsl(326, 70%, 50%)',
      dress: childrenGirlDress,
      kebabColor: 'hsl(110, 70%, 50%)',
      outfit: childrenGirlOutfit,
      outfitColor: 'hsl(9, 70%, 50%)'
    }
  ];

  return (
    <ResponsiveBar
      data={dataRenevueByTypeProduct}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: '#12ae9b'
            }
          },
          legend: {
            text: {
              fill: '#12ae9b'
            }
          },
          ticks: {
            line: {
              stroke: '#12ae9b',
              strokeWidth: 1
            },
            text: {
              fill: '#12ae9b'
            }
          }
        },
        legends: {
          text: {
            fill: '#12ae9b'
          }
        },
        tooltip: {
          container: {
            color: '#141b2d'
          }
        }
      }}
      keys={['shirt', 'trouser', 'dress', 'outfit']}
      indexBy='Category'
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'fries'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'sandwich'
          },
          id: 'lines'
        }
      ]}
      borderColor={{
        from: 'color',
        modifiers: [['darker', '1.2']]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Category',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 2,
        tickRotation: 0,
        legend: 'Doanh thu',
        legendPosition: 'middle',
        legendOffset: -55
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]]
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      role='application'
      ariaLabel='Nivo bar chart demo'
      barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in Category: ' + e.indexValue}
    />
  );
};

export default BarCharttypeProduct;
