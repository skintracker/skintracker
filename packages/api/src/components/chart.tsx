export interface ChartProps {
  data: unknown;
  title: string;
  id: string;
}

export function Chart({
  data,
  title,
  id,
  ...props
}: ChartProps & JSX.IntrinsicElements["div"]) {
  return (
    <>
      <div id={id} {...props} />
      <script src="https://unpkg.com/lightweight-charts@4.1.0/dist/lightweight-charts.standalone.production.js" />
      <script>
        {`
          const chart = LightweightCharts.createChart("${id}", { 
            autoSize: true,
            layout: {
              background: {
                type: 'solid',
                color: 'rgba(30, 41, 59, 1)',
              },
              lineColor: 'rgba(30, 41, 59, 1)',
              textColor: '#D9D9D9',
            },
            watermark: {
              color: 'rgba(0, 0, 0, 0)',
            },
            crosshair: {
              color: '#758696',
            },
            grid: {
              vertLines: {
                color: '#2B2B43',
              },
              horzLines: {
                color: '#363C4E',
              },
            },
          });
          const chartEl = document.getElementsByClassName('tv-lightweight-charts')[0];
          chartEl.style.borderRadius = '0.25rem';
          var areaSeries = chart.addAreaSeries({
            topColor: 'rgba(171, 71, 188, 0.56)',
            bottomColor: 'rgba(171, 71, 188, 0.04)',
            lineColor: 'rgba(171, 71, 188, 1)',
            lineWidth: 2,
            symbol: "${title}",
          });
          
          areaSeries.setData(${JSON.stringify(data)});
        `}
      </script>
    </>
  );
}

export default Chart;
