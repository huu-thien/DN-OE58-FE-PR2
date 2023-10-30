import { ResponsiveBar } from '@nivo/bar';

const mockBarData = [
  {
    Category: 'Nam',
    shirt: 137,
    shirtColor: 'hsl(229, 70%, 50%)',
    trouser: 96,
    trouserColor: 'hsl(296, 70%, 50%)',
    dress: 72,
    kebabColor: 'hsl(97, 70%, 50%)',
    outfit: 140,
    outfitColor: 'hsl(340, 70%, 50%)'
  },
  {
    Category: 'Nữ',
    shirt: 55,
    shirtColor: 'hsl(307, 70%, 50%)',
    trouser: 28,
    trouserColor: 'hsl(111, 70%, 50%)',
    dress: 58,
    kebabColor: 'hsl(273, 70%, 50%)',
    outfit: 29,
    outfitColor: 'hsl(275, 70%, 50%)'
  },
  {
    Category: 'Bé trai',
    shirt: 109,
    shirtColor: 'hsl(72, 70%, 50%)',
    trouser: 23,
    trouserColor: 'hsl(96, 70%, 50%)',
    dress: 34,
    kebabColor: 'hsl(106, 70%, 50%)',
    outfit: 152,
    outfitColor: 'hsl(256, 70%, 50%)'
  },
  {
    Category: 'Bé gái',
    shirt: 133,
    shirtColor: 'hsl(257, 70%, 50%)',
    trouser: 52,
    trouserColor: 'hsl(326, 70%, 50%)',
    dress: 43,
    kebabColor: 'hsl(110, 70%, 50%)',
    outfit: 83,
    outfitColor: 'hsl(9, 70%, 50%)'
  }
];
const BarCharttypeProduct = () => {
  return (
    <ResponsiveBar
      data={mockBarData}
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
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Doanh thu',
        legendPosition: 'middle',
        legendOffset: -40
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
