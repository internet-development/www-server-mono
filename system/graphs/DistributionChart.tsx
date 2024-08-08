import * as d3 from 'd3';
import * as React from 'react';

const DistributionChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0) return;

    const svg = d3.select(d3Container.current);
    svg.selectAll('*').remove();

    const defs = svg.append('defs');
    const waves = {
      positive: ['var(--theme-graph-positive-subdued)', 'var(--theme-graph-positive)'],
      negative: ['var(--theme-graph-negative-subdued)', 'var(--theme-graph-negative)'],
      reversePositive: ['var(--theme-graph-positive)', 'var(--theme-graph-positive-subdued)'],
      reverseNegative: ['var(--theme-graph-negative)', 'var(--theme-graph-negative-subdued)'],
    };

    Object.entries(waves).forEach(([key, colorRange]) => {
      const gradient = defs.append('linearGradient').attr('id', `gradient-${key}`).attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', colorRange[0]);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', colorRange[1]);
    });

    const margin = { top: 24, right: 24, bottom: 32, left: 48 };
    const height = 400 - margin.top - margin.bottom;
    const chartWidth = width - margin.left - margin.right;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().range([0, chartWidth]).padding(0.3);
    const yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain(props.data.map((d) => d.label));
    yScale.domain([0, d3.max(props.data, (d) => d.value)]);

    const tickValues = yScale.ticks();

    tickValues.forEach((d) => {
      g.append('line').attr('x1', 0).attr('x2', chartWidth).attr('y1', yScale(d)).attr('y2', yScale(d)).attr('stroke', 'var(--theme-border)').attr('opacity', 1);
    });

    const yAxis = g.append('g').call(d3.axisLeft(yScale));
    yAxis.selectAll('.tick text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');
    yAxis.selectAll('.tick line, .domain').style('stroke', 'var(--theme-border)');

    const xAxisOffset = 0.5;
    const xAxis = g
      .append('g')
      .attr('transform', `translate(0,${height + xAxisOffset})`)
      .call(d3.axisBottom(xScale));
    xAxis.selectAll('.tick line, .domain').style('stroke', 'var(--theme-border)');
    xAxis.selectAll('text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');

    // Draw bars
    g.selectAll('.distribution')
      .data(props.data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('fill', 'url(#gradient-reversePositive)');

    const line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x((d) => xScale(d.label) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.value));

    g.append('path').datum(props.data).attr('fill', 'none').attr('stroke', 'var(--theme-text)').attr('stroke-width', 1).attr('d', line);
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

export default DistributionChart;
