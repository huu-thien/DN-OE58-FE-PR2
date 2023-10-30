import { ResponsivePie } from '@nivo/pie';


const mockPieData = [
  {
    id: 'man',
    label: 'man',
    value: 239,
    color: 'hsl(104, 70%, 50%)',
  },
  {
    id: 'woman',
    label: 'woman',
    value: 170,
    color: 'hsl(162, 70%, 50%)',
  },
  {
    id: 'childrenGirl',
    label: 'childrenGirl',
    value: 322,
    color: 'hsl(291, 70%, 50%)',
  },
  {
    id: 'childrenBoy',
    label: 'childrenBoy',
    value: 503,
    color: 'hsl(229, 70%, 50%)',
  }
];

const PieChartCategory = () => {
  return (
    <ResponsivePie
      data={mockPieData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: '#e0e0e0',
            },
          },
          legend: {
            text: {
              fill: '#e0e0e0',
            },
          },
          ticks: {
            line: {
              stroke: '#e0e0e0',
              strokeWidth: 1,
            },
          },
        },
        legends: {
          text: {
            fill: '#e0e0e0',
          },
        },
        tooltip: {
          container: {
            color: '#141b2d',
          },
        },
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
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={'#e0e0e0'}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
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
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
}

export default PieChartCategory
