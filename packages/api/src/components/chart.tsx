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
      <script src="/js/chart.js" />
      <script>{`areaSeries.setData(${JSON.stringify(data)});`}</script>
    </>
  );
}

export default Chart;
