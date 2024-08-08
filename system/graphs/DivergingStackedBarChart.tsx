import * as d3 from 'd3';
import * as React from 'react';

const DivergingStackedBarChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0 || !props.data) return;

    const barHeight = 30;
    const gapBetweenBars = 1;

    const margin = { top: 20, right: 40, bottom: 20, left: 30 };
    const drawWidth = width - margin.left - margin.right;
    const newHeight = (barHeight + gapBetweenBars) * props.data.length + margin.top + margin.bottom;

    const svg = d3.select(d3Container.current).attr('width', width).attr('height', newHeight);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${newHeight}`);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const paddingBottom = 4;
    const xAxisGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${newHeight - margin.bottom - paddingBottom})`);

    const maxAbsValue = d3.max(props.data, (d) => {
      const values = [d.positive_upper_ci, Math.abs(d.negative_lower_ci), Math.abs(d.positive), Math.abs(d.negative)];
      return Math.max(...values);
    });

    const xScale = d3.scaleLinear().domain([-maxAbsValue, maxAbsValue]).range([0, drawWidth]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) => `${d}%`)
      .ticks(10);
    xAxisGroup.call(xAxis);

    xAxisGroup.selectAll('text').style('font-size', 'var(--type-scale-fixed-small)').style('fill', 'var(--theme-border)').selectAll('line,path').style('stroke', 'red');
    xAxisGroup.selectAll('line,path').style('stroke', 'var(--theme-border)');

    const yScale = d3
      .scaleBand()
      .domain(props.data.map((d) => d.category))
      .rangeRound([0, newHeight - margin.top - margin.bottom])
      .padding(0.3);

    const gridLineSpacing = 24;

    const defs = svg.append('defs');
    const colors = {
      positive: ['var(--theme-graph-positive-subdued)', 'var(--theme-graph-positive)'],
      negative: ['var(--theme-graph-negative-subdued)', 'var(--theme-graph-negative)'],
      reversePositive: ['var(--theme-graph-positive)', 'var(--theme-graph-positive-subdued)'],
      reverseNegative: ['var(--theme-graph-negative)', 'var(--theme-graph-negative-subdued)'],
      netural: ['var(--theme-background)', 'var(--theme-border)'],
    };

    Object.entries(colors).forEach(([key, colorRange]) => {
      const gradient = defs.append('linearGradient').attr('id', `gradient-${key}`).attr('y1', '0%').attr('y2', '0%').attr('x1', '0%').attr('x2', '100%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', colorRange[0]);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', colorRange[1]);
    });

    g.selectAll('.vertical-grid')
      .data(xScale.ticks())
      .enter()
      .append('line')
      .attr('class', 'vertical-grid')
      .attr('x1', (d) => xScale(d))
      .attr('x2', (d) => xScale(d))
      .attr('y1', 0)
      .attr('y2', newHeight - margin.bottom - gridLineSpacing)
      .style('stroke', 'var(--theme-border)');
    g.select('.domain').remove();

    g.selectAll('.bar-positive')
      .data(props.data)
      .enter()
      .append('rect')
      .attr('class', 'bar-positive')
      .attr('x', (d) => xScale(Math.min(0, d.positive)))
      .attr('y', (d) => yScale(d.category))
      .attr('width', (d) => Math.abs(xScale(d.positive) - xScale(0)))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'url(#gradient-reversePositive)')
      .attr('rx', 2)
      .attr('ry', 2);

    g.selectAll('.label-positive')
      .data(props.data)
      .enter()
      .append('text')
      .attr('x', (d) => xScale(d.positive_upper_ci) + 8)
      .attr('y', (d) => yScale(d.category) + yScale.bandwidth() / 2)
      .attr('dy', '.35em')
      .text((d) => `${d.positive}%`)
      .style('font-size', 'var(--type-scale-fixed-small)')
      .attr('fill', 'var(--theme-text)');

    // Error bars for positive values
    g.selectAll('.error-bar-positive')
      .data(props.data)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.positive_lower_ci))
      .attr('x2', (d) => xScale(d.positive_upper_ci))
      .attr('y1', (d) => yScale(d.category) + yScale.bandwidth() / 2)
      .attr('y2', (d) => yScale(d.category) + yScale.bandwidth() / 2)
      .attr('stroke', 'var(--theme-text)')
      .attr('stroke-width', 1);

    g.selectAll('.cap-positive-upper-ci')
      .data(props.data)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.positive_upper_ci))
      .attr('x2', (d) => xScale(d.positive_upper_ci))
      .attr('y1', (d) => yScale(d.category) + yScale.bandwidth() / 2 - 5)
      .attr('y2', (d) => yScale(d.category) + yScale.bandwidth() / 2 + 5)
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    g.selectAll('.cap-positive-lower-ci')
      .data(props.data)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.positive_lower_ci))
      .attr('x2', (d) => xScale(d.positive_lower_ci))
      .attr('y1', (d) => yScale(d.category) + yScale.bandwidth() / 2 - 5)
      .attr('y2', (d) => yScale(d.category) + yScale.bandwidth() / 2 + 5)
      .attr('stroke', 'var(--theme-text)')
      .attr('stroke-width', 1);

    // Negative bars
    g.selectAll('.bar-negative')
      .data(props.data)
      .enter()
      .append('rect')
      .attr('class', 'bar-negative')
      .attr('x', (d) => xScale(Math.min(0, d.negative)))
      .attr('y', (d) => yScale(d.category))
      .attr('width', (d) => Math.abs(xScale(d.negative) - xScale(0)))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'url(#gradient-negative)')
      .attr('rx', 2)
      .attr('ry', 2);

    g.selectAll('.label-negative')
      .data(props.data)
      .enter()
      .append('text')
      .attr('x', (d) => xScale(d.negative_lower_ci) - 45)
      .attr('y', (d) => yScale(d.category) + yScale.bandwidth() / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .text((d) => `${d.negative}%`)
      .style('font-size', '1r4px')
      .attr('fill', 'var(--theme-text)');

    // Error bars for negative values
    g.selectAll('.error-bar-negative')
      .data(props.data)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.negative_lower_ci))
      .attr('x2', (d) => xScale(d.negative_upper_ci))
      .attr('y1', (d) => yScale(d.category) + yScale.bandwidth() / 2)
      .attr('y2', (d) => yScale(d.category) + yScale.bandwidth() / 2)
      .attr('stroke', 'var(--theme-text)')
      .attr('stroke-width', 1);

    // Caps for negative error bars
    g.selectAll('.cap-negative-lower-ci')
      .data(props.data)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.negative_lower_ci))
      .attr('x2', (d) => xScale(d.negative_lower_ci))
      .attr('y1', (d) => yScale(d.category) + yScale.bandwidth() / 2 - 5)
      .attr('y2', (d) => yScale(d.category) + yScale.bandwidth() / 2 + 5)
      .attr('stroke', 'var(--theme-text)')
      .attr('stroke-width', 1);

    g.selectAll('.cap-negative-upper-ci')
      .data(props.data)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.negative_upper_ci))
      .attr('x2', (d) => xScale(d.negative_upper_ci))
      .attr('y1', (d) => yScale(d.category) + yScale.bandwidth() / 2 - 5)
      .attr('y2', (d) => yScale(d.category) + yScale.bandwidth() / 2 + 5)
      .attr('stroke', 'var(--theme-text)')
      .attr('stroke-width', 1);

    g.selectAll('.bar-neutral')
      .data(props.data)
      .enter()
      .append('rect')
      .attr('class', 'bar-neutral')
      .attr('x', (d) => xScale(Math.min(0, d.neutral)))
      .attr('y', (d) => yScale(d.category))
      .attr('width', (d) => Math.abs(xScale(d.neutral) - xScale(0)))
      .attr('height', yScale.bandwidth())
      .attr('fill', 'url(#gradient-netural)');

    const fixedXPosition = xScale(0) + 10;

    g.selectAll('.label-neutral')
      .data(props.data)
      .enter()
      .append('text')
      .attr('x', fixedXPosition)
      .attr('y', (d) => yScale(d.category) + yScale.bandwidth() / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .text((d) => `${d.neutral}%`)
      .style('font-size', 'var(--type-scale-fixed-small)')
      .attr('fill', 'var(--theme-text)');
  };

  React.useEffect(() => {
    if (d3Container.current) {
      setContainerWidth(d3Container.current.clientWidth);
    }

    const handleResize = () => {
      setContainerWidth(d3Container.current.clientWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    drawChart(containerWidth);
  }, [containerWidth, props.data]);

  return <svg ref={d3Container} style={{ width: '100%', height: '100%', paddingBottom: '1rem' }} />;
};

export default DivergingStackedBarChart;
