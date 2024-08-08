import * as React from 'react';
import * as d3 from 'd3';

function getColorsBasedOnValue(value) {
  const maxValue = 100;
  const minValue = 0;

  const minOpacity = 0.1;
  const opacityRange = 1;

  if (value < 25) {
    const opacity = minOpacity + ((25 - value) / (25 - minValue)) * opacityRange;
    return `rgba(218, 30, 40, ${opacity})`;
  } else if (value > 35) {
    const opacity = minOpacity + ((value - 35) / (maxValue - 35)) * opacityRange;
    return `rgba(61, 219, 217, ${opacity})`;
  } else {
    return 'var(--theme-border)';
  }
}

const CohortChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0 || !props.data) return;

    const svg = d3.select(d3Container.current);
    svg.selectAll('*').remove();

    const margin = { top: 50, right: 10, bottom: 10, left: 10 };
    const height = 388 - margin.top - margin.bottom;
    const chartWidth = width - margin.left - margin.right;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .range([0, chartWidth])
      .padding(0.01)
      .domain(props.data.map((d) => d.group));
    const yScale = d3
      .scaleBand()
      .range([height, 0])
      .padding(0.01)
      .domain(props.data.map((d) => d.variable));

    const xAxis = g.append('g').attr('transform', `translate(0,0)`).call(d3.axisTop(xScale).tickSize(0));
    const yAxis = g.append('g').call(d3.axisLeft(yScale).tickSize(0));

    xAxis.selectAll('.tick text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');
    g.selectAll('.domain').remove();
    yAxis.selectAll('.tick text').attr('text-anchor', 'end').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');
    g.selectAll('.domain').remove();

    g.selectAll('.cell')
      .data(props.data, (d) => d.group + ':' + d.variable)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.group))
      .attr('y', (d) => yScale(d.variable))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('rx', 8)
      .attr('ry', 8)
      .style('fill', (d) => getColorsBasedOnValue(d.value));

    g.selectAll('.label')
      .data(props.data, (d) => d.group + ':' + d.variable)
      .enter()
      .append('text')
      .text((d) => `${d.value}%`)
      .attr('x', (d) => xScale(d.group) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.variable) + yScale.bandwidth() / 2)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .style('fill', 'var(--theme-text)')
      .style('font-size', 'var(--type-scale-fixed-medium)')
      .style('font-weight', '400');
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

export default CohortChart;
