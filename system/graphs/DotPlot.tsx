import * as d3 from 'd3';
import * as React from 'react';

const DotPlot = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0 || !props.data) return;

    const svg = d3.select(d3Container.current);
    svg.selectAll('*').remove();

    const margin = { top: 24, right: 32, bottom: 8, left: 16 };
    const height = 400 - margin.top - margin.bottom;

    const greatestValues = 15;
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(props.data, (d) => d.value)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(props.data.map((d) => d.label))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1);

    svg.attr('width', width).attr('height', height + margin.top + margin.bottom);

    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat((d) => `${d}%`));

    xAxis.attr('color', 'var(--theme-border)');
    xAxis.selectAll('.tick text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');

    const helperLinesGroup = svg.append('g');
    props.data.forEach((d, i) => {
      const yCoordinate = yScale(d.label) + yScale.bandwidth() / 2;
      const xStart = margin.left;
      const xEnd = width - margin.right;

      helperLinesGroup.append('line').attr('x1', xStart).attr('x2', xEnd).attr('y1', yCoordinate).attr('y2', yCoordinate).attr('stroke', 'var(--theme-border)');
      helperLinesGroup.append('circle').attr('cx', xStart).attr('cy', yCoordinate).attr('r', 3).attr('fill', 'var(--theme-border)');
      helperLinesGroup.append('circle').attr('cx', xEnd).attr('cy', yCoordinate).attr('r', 3).attr('fill', 'var(--theme-border)');
    });

    svg
      .append('g')
      .selectAll('circle')
      .data(props.data)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.value))
      .attr('cy', (d) => yScale(d.label) + yScale.bandwidth() / 2)
      .attr('r', (d) => (d.value > greatestValues ? 8 : 4))
      .attr('fill', (d) => (d.value > greatestValues ? 'var(--theme-graph-positive)' : 'var(--theme-graph-negative)')); // Color based on value

    svg
      .append('g')
      .selectAll('text')
      .data(props.data)
      .enter()
      .append('text')
      .attr('x', (d) => xScale(d.value) + 8)
      .attr('y', (d) => yScale(d.label) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .text((d) => d.value)
      .style('font-size', 'var(--type-scale-fixed-small)')
      .attr('fill', 'var(--theme-text)');
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

  return <svg ref={d3Container} style={{ width: '100%' }} />;
};

export default DotPlot;
