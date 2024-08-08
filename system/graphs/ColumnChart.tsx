import * as d3 from 'd3';
import * as React from 'react';

const ColumnChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0) return;

    const svg = d3.select(d3Container.current);
    svg.selectAll('*').remove();

    const margin = { top: 0, right: 20, bottom: 40, left: 30 };

    const height = +d3Container.current.getAttribute('height') - margin.top - margin.bottom;
    const drawWidth = width - margin.left - margin.right;

    const xScale = d3
      .scaleBand()
      .domain(props.data.map((d) => d.category))
      .rangeRound([0, drawWidth])
      .padding(0.1);

    // Define gradients
    const defs = svg.append('defs');
    const colors = {
      positive: ['var(--theme-graph-positive-subdued)', 'var(--theme-graph-positive)'],
      negative: ['var(--theme-graph-negative)', 'var(--theme-graph-negative-subdued)'],
      netural: ['var(--theme-background)', 'var(--theme-border)'],
    };

    Object.entries(colors).forEach(([key, colorRange]) => {
      const gradient = defs.append('linearGradient').attr('id', `gradient-${key}`).attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', colorRange[0]);

      gradient.append('stop').attr('offset', '100%').attr('stop-color', colorRange[1]);
    });

    const colorScale = d3
      .scaleOrdinal()
      .domain(['positive', 'neutral', 'negative'])
      .range(['var(--theme-graph-positive)', 'var(--theme-graph-netural)', 'var(--theme-graph-negative)']);

    const maxUpperCI = d3.max(props.data, (d) => d.positive_upper_ci);
    const extraSpaceForLabels = 10;

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(props.data, (d) => d.negative_lower_ci), maxUpperCI + extraSpaceForLabels])
      .range([height, 0]);

    const tickValues = yScale.ticks().filter((tick) => tick >= 0);

    const yAxis = d3
      .axisLeft(yScale)
      .tickValues(tickValues)
      .tickSize(-drawWidth)
      .tickFormat((d) => (d >= 0 ? d : ''));

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .selectAll('text')
      .style('fill', 'var(--theme-border)')
      .style('font-size', 'var(--type-scale-fixed-small)');

    svg.selectAll('.y-axis path, .y-axis line').style('stroke', 'var(--theme-border)');

    const yAxisG = svg.append('g').attr('class', 'y-axis').attr('transform', `translate(${margin.left},0)`).call(yAxis);

    svg.selectAll('.y-axis path').remove();

    yAxisG.selectAll('.tick line').attr('stroke-opacity', 0.01).attr('shape-rendering', 'crispEdges');

    yAxisG.selectAll('.domain').remove();
    yAxisG.selectAll('.tick text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');

    svg
      .selectAll('.vertical-line')
      .data(props.data)
      .enter()
      .append('line')
      .attr('class', 'vertical-line')
      .attr('x1', (d) => xScale(d.category) + xScale.bandwidth() / 2 + margin.left)
      .attr('x2', (d) => xScale(d.category) + xScale.bandwidth() / 2 + margin.left)
      .attr('y1', margin.top)
      .attr('y2', height + margin.top)
      .attr('stroke', 'var(--theme-border)')
      .style('opacity', 0.3);

    props.data.forEach((d) => {
      const barX = xScale(d.category) + margin.left;
      const positiveBarY = yScale(Math.max(0, d.positive));
      const neutralBarY = yScale(Math.max(0, d.neutral));
      const negativeBarHeight = Math.abs(yScale(0) - yScale(d.negative));

      svg
        .append('rect')
        .attr('x', barX)
        .attr('y', positiveBarY)
        .attr('width', xScale.bandwidth())
        .attr('height', Math.abs(yScale(d.positive) - yScale(0)))
        .attr('fill', 'url(#gradient-positive)');

      svg
        .append('line')
        .attr('x1', barX + xScale.bandwidth() / 2)
        .attr('x2', barX + xScale.bandwidth() / 2)
        .attr('y1', yScale(d.positive_upper_ci))
        .attr('y2', yScale(d.positive_lower_ci))
        .attr('stroke', 'var(--theme-text)')
        .attr('stroke-width', 1);

      svg
        .append('rect')
        .attr('x', barX)
        .attr('y', neutralBarY)
        .attr('width', xScale.bandwidth())
        .attr('height', Math.abs(yScale(d.neutral) - yScale(0)))
        .attr('fill', 'url(#gradient-netural)');

      svg.append('rect').attr('x', barX).attr('y', yScale(0)).attr('width', xScale.bandwidth()).attr('height', negativeBarHeight).attr('fill', 'url(#gradient-negative)');

      svg
        .append('line')
        .attr('x1', barX + xScale.bandwidth() / 2)
        .attr('x2', barX + xScale.bandwidth() / 2)
        .attr('y1', yScale(d.negative_upper_ci))
        .attr('y2', yScale(d.negative_lower_ci))
        .attr('stroke', 'var(--theme-text)')
        .attr('stroke-width', 1);

      svg
        .append('text')
        .attr('x', barX + xScale.bandwidth() / 2)
        .attr('y', height + margin.bottom - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', 'var(--theme-border)')
        .text(d.category);
    });

    addBarLabels(props.data, svg, xScale, yScale, margin, height);
  };

  function addBarLabels(data, svg, xScale, yScale, margin, height) {
    data.forEach((d) => {
      const barX = xScale(d.category) + margin.left;

      if (d.positive > 0) {
        svg
          .append('text')
          .attr('x', barX + xScale.bandwidth() / 2)
          .attr('y', yScale(d.positive_upper_ci))
          .attr('dy', '-0.5em')
          .attr('text-anchor', 'middle')
          .attr('fill', 'var(--theme-text)')
          .style('font-size', 'var(--type-scale-fixed-label)')
          .text(d.positive);
      }

      if (d.neutral > 0) {
        svg
          .append('text')
          .attr('x', barX + xScale.bandwidth() / 2)
          .attr('y', yScale(d.neutral))
          .attr('dy', '1.2em')
          .attr('text-anchor', 'middle')
          .attr('fill', 'var(--theme-text)')
          .style('font-size', 'var(--type-scale-fixed-label)')
          .text(d.neutral);
      }

      if (d.negative_upper_ci < 0) {
        svg
          .append('text')
          .attr('x', barX + xScale.bandwidth() / 2)
          .attr('y', yScale(d.negative_lower_ci))
          .attr('dy', '0.7rem')
          .attr('text-anchor', 'middle')
          .attr('fill', 'var(--theme-text)')
          .style('font-size', 'var(--type-scale-fixed-label)')
          .text(d.negative);
      }
    });
  }

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

  return <svg width={props.width ?? '100%'} height={props.height ?? '400'} ref={d3Container} style={props.style} />;
};

export default ColumnChart;
