import * as d3 from 'd3';
import * as React from 'react';

const BubbleChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0) {
      return;
    }

    if (props.data && d3Container && d3Container.current && width > 0) {
      d3.select(d3Container.current).selectAll('*').remove();

      const svg = d3.select(d3Container.current);
      const margin = { top: 20, right: 30, bottom: 30, left: 30 };
      const height = 400 - margin.top - margin.bottom;
      const drawWidth = width - margin.left - margin.right;

      // Set up the scales
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(props.data, (d) => d.x) + 5])
        .range([0, drawWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(props.data, (d) => d.y) + 10])
        .range([height, 0]);

      const sizeScale = d3
        .scaleSqrt()
        .domain([0, d3.max(props.data, (d) => d.value)])
        .range([0, 20]);

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const tickValues = yScale.ticks();

      tickValues.forEach((d) => {
        g.append('line').attr('x1', 0).attr('x2', drawWidth).attr('y1', yScale(d)).attr('y2', yScale(d)).attr('stroke', 'var(--theme-border)').attr('opacity', 1);
      });

      const yAxis = g.append('g').call(d3.axisLeft(yScale));
      yAxis.selectAll('.tick text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-medium)');
      yAxis.selectAll('.tick line, .domain').style('stroke', 'var(--theme-border)');

      const xAxis = g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));
      xAxis.selectAll('text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');
      xAxis.selectAll('.tick line, .domain').style('stroke', 'var(--theme-border)');

      const defs = svg.append('defs');
      const waves = {
        positive: ['var(--theme-graph-positive-subdued)', 'var(--theme-graph-positive)'],
        reversePositive: ['var(--theme-graph-positive)', 'var(--theme-graph-positive-subdued)'],
      };

      Object.entries(waves).forEach(([key, colorRange]) => {
        const gradient = defs.append('linearGradient').attr('id', `gradient-${key}`).attr('y1', '0%').attr('y2', '0%').attr('x1', '0%').attr('x2', '100%');

        gradient.append('stop').attr('offset', '0%').attr('stop-color', colorRange[0]);
        gradient.append('stop').attr('offset', '100%').attr('stop-color', colorRange[1]);
      });

      g.append('rect')
        .attr('x', drawWidth / 2)
        .attr('y', 0)
        .attr('width', drawWidth / 2)
        .attr('height', height / 2)
        .style('fill', 'url(#gradient-positive)')
        .style('opacity', 1);

      const bubbles = g.selectAll('.bubble').data(props.data).enter().append('g').attr('class', 'bubble');

      bubbles
        .append('circle')
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', (d) => sizeScale(d.value))
        .style('fill', (d) => (xScale(d.x) > drawWidth / 2 && yScale(d.y) < height / 2 ? 'var(--theme-graph-positive)' : 'var(--theme-graph-netural)'))
        .style('stroke', (d) => (xScale(d.x) > drawWidth / 2 && yScale(d.y) < height / 2 ? 'var(--theme-graph-positive-subdued)' : 'var(--theme-graph-netural)'));

      bubbles
        .append('text')
        .attr('x', (d) => xScale(d.x))
        .attr('y', (d) => yScale(d.y))
        .attr('text-anchor', 'middle')
        .attr('dy', '.3em')
        .text((d) => d.value)
        .style('fill', 'var(--theme-text)')
        .style('font-size', 'var(--type-scale-fixed-small)');
    }
  };

  React.useEffect(() => {
    if (!d3Container.current) {
      return;
    }

    setContainerWidth(d3Container.current.getBoundingClientRect().width);
    const handleResize = () => {
      if (!d3Container.current) {
        return;
      }
      setContainerWidth(d3Container.current.getBoundingClientRect().width);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [props.data]);

  React.useEffect(() => {
    drawChart(containerWidth);
  }, [containerWidth, props.data]);

  return <svg width="100%" height="400" ref={d3Container} style={props.style} />;
};

export default BubbleChart;
