import React from 'react'
import { ResponsiveLine } from '@nivo/line'

export default function WeightChart ({ data }) {
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 30, bottom: 40, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=">-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        axisLeft={null}
        colors={{ scheme: 'dark2' }}
        lineWidth={4}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-8}
        enableArea={false}
        areaOpacity={0.15}
        enableCrosshair={false}
        useMesh={true}
        legends={[]}
        isInteractive={false}
    />
  )
}