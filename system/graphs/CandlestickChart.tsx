import * as d3 from 'd3';
import * as React from 'react';

const CandlestickChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0) return;

    const svg = d3.select(d3Container.current);

    if (props.data && d3Container && d3Container.current && width > 0) {
      svg.selectAll('*').remove();

      const margin = { top: 16, right: 16, bottom: 32, left: 48 };
      const height = 400 - margin.top - margin.bottom;
      const chartWidth = width - margin.left - margin.right;

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleBand().range([0, chartWidth]).padding(0.6);
      const yScale = d3.scaleLinear().range([height, 0]);

      xScale.domain(props.data.map((d) => d.date));
      yScale.domain([d3.min(props.data, (d) => d.low) - 10, d3.max(props.data, (d) => d.high) + 24]);

      const xAxis = g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));
      const yAxis = g.append('g').call(d3.axisLeft(yScale));

      xAxis.select('.domain').style('stroke', 'var(--theme-border)');
      xAxis.selectAll('.tick line').style('stroke', 'var(--theme-border)');
      xAxis.selectAll('text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');
      yAxis.select('.domain').style('stroke', 'var(--theme-border)');
      yAxis.selectAll('.tick line').style('stroke', 'var(--theme-border)');
      yAxis.selectAll('text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');

      const defs = svg.append('defs');
      const colors = {
        positive: ['var(--theme-graph-positive-subdued)', 'var(--theme-graph-positive)'],
        negative: ['var(--theme-graph-negative-subdued)', 'var(--theme-graph-negative)'],
        reversePositive: ['var(--theme-graph-positive)', 'var(--theme-graph-positive-subdued)'],
        reverseNegative: ['var(--theme-graph-negative)', 'var(--theme-graph-negative-subdued)'],
      };

      Object.entries(colors).forEach(([key, colorRange]) => {
        const gradient = defs.append('linearGradient').attr('id', `gradient-${key}`).attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');

        gradient.append('stop').attr('offset', '0%').attr('stop-color', colorRange[0]);
        gradient.append('stop').attr('offset', '100%').attr('stop-color', colorRange[1]);
      });

      g.selectAll('.candle')
        .data(props.data)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.date))
        .attr('y', (d) => yScale(Math.max(d.open, d.close)))
        .attr('height', (d) => yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close)))
        .attr('width', xScale.bandwidth())
        .attr('fill', (d) => (d.open > d.close ? 'url(#gradient-reverseNegative)' : 'url(#gradient-reversePositive)'));

      g.selectAll('.wick')
        .data(props.data)
        .enter()
        .append('line')
        .attr('x1', (d) => xScale(d.date) + xScale.bandwidth() / 2)
        .attr('x2', (d) => xScale(d.date) + xScale.bandwidth() / 2)
        .attr('y1', (d) => yScale(d.high))
        .attr('y2', (d) => yScale(d.low))
        .attr('stroke', 'var(--theme-border)');
    }
  };

  React.useEffect(() => {
    setContainerWidth(d3Container.current.clientWidth);
    const handleResize = () => {
      setContainerWidth(d3Container.current.clientWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    drawChart(containerWidth);
  }, [containerWidth, props.data]);

  return <svg ref={d3Container} width="100%" height="400" style={props.style} />;
};

export default CandlestickChart;
