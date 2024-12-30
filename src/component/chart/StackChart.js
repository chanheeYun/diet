import { ResponsiveBar } from '@nivo/bar'

export default function StackChart({ data }) {
  return (
    <ResponsiveBar
        data={data}
        keys={[
        '탄수화물',
        '단백질',
        '지방',
        '당류',
        '나트륨',
        ]}
        indexBy="date"
        margin={{ top: 10, right: 130, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'yellow_green_blue' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        isInteractive={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Nutrient',
            legendPosition: 'middle',
            legendOffset: -44,
            truncateTickAt: 0
        }}
        labelSkipWidth={3}
        labelSkipHeight={10}
        labelTextColor="#3f240e"
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 102,
                translateY: 0,
                itemsSpacing: 4,
                itemWidth: 88,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 15,
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
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue}
    />
  )
}