import * as d3 from 'd3';
import * as React from 'react';

const LineBarChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const data = props.data;

  const drawChart = () => {
    const margin = { top: 32, right: 24, bottom: 32, left: 48 },
      width = containerWidth - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3.select(d3Container.current).selectAll('svg').data([null]);

    const svgEnter = svg.enter().append('svg');
    svgEnter
      .merge(svg)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svgEnter.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.1);

    const x1 = d3
      .scaleBand()
      .domain(data[0].years.map((d) => d.name))
      .range([0, xScale.bandwidth()])
      .padding(0.05);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(d.years, (year) => year.value))])
      .range([height, 0]);

    const yAxis = g.append('g').call(d3.axisLeft(yScale));
    yAxis.selectAll('text').style('fill', 'var(--theme-border)').style('font-size', '16px');
    yAxis.selectAll('path, line').style('stroke', 'var(--theme-border)');

    const gridGroup = g.append('g').attr('class', 'grid').call(d3.axisLeft(yScale).tickSize(-width).tickFormat(''));
    gridGroup.selectAll('line').style('stroke', 'var(--theme-border)').style('opacity', '1');

    const xAxis = g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));
    xAxis.selectAll('text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');
    xAxis.selectAll('.tick line').style('stroke', 'var(--theme-border)');
    xAxis.selectAll('path, line').style('stroke', 'var(--theme-border)');

    gridGroup.select('.domain').remove();

    data.forEach((d) => {
      const yearGroup = g.append('g').attr('transform', `translate(${xScale(d.year)},0)`);

      d.years.forEach((year) => {
        const subGroup = yearGroup.append('g').attr('transform', `translate(${x1(year.name)},0)`);

        subGroup
          .append('line')
          .attr('x1', x1.bandwidth() / 2)
          .attr('x2', x1.bandwidth() / 2)
          .attr('y1', height)
          .attr('y2', yScale(year.value))
          .style('stroke', year.color)
          .style('stroke-width', 1);

        subGroup
          .append('circle')
          .attr('cx', x1.bandwidth() / 2)
          .attr('cy', yScale(year.value))
          .attr('r', 8)
          .style('fill', year.color);

        subGroup
          .append('text')
          .attr('x', x1.bandwidth() / 2)
          .attr('y', yScale(year.value) - 10)
          .text(year.value)
          .attr('text-anchor', 'middle')
          .style('fill', 'var(--theme-text)');
      });
    });
  };

  React.useEffect(() => {
    function handleResize() {
      if (d3Container.current) {
        setContainerWidth(d3Container.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (containerWidth > 0) {
      drawChart();
    }
  }, [data, containerWidth]);

  return <div ref={d3Container} style={{ width: '100%' }} />;
};

export default LineBarChart;
