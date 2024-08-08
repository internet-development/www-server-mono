import * as d3 from 'd3';
import * as React from 'react';

const LineChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container) {
      return;
    }

    if (props.data && d3Container && d3Container.current && width > 0) {
      const svg = d3.select(d3Container.current);
      svg.selectAll('*').remove();

      const margin = { top: 16, right: 0, bottom: 32, left: 32 };
      const height = +svg.attr('height') - margin.top - margin.bottom;
      const drawWidth = width - margin.left - margin.right;

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

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

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(props.data, (d) => new Date(d.date)))
        .range([0, drawWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(props.data, (d) => d.value)])
        .range([height, 0]);

      const yAxis = g.append('g').call(d3.axisLeft(yScale).ticks(6).tickSize(-drawWidth).tickPadding(8));
      yAxis.attr('shape-rendering', 'crispEdges').selectAll('.tick text').style('font-size', 'var(--type-scale-fixed-small)').style('fill', 'var(--theme-border)');
      yAxis.selectAll('.domain, .tick line').attr('stroke', 'var(--theme-border)');
      yAxis.selectAll('.domain').remove();

      const xAxis = g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale).ticks(6));
      xAxis.selectAll('.tick text').style('fill', 'var(--theme-border)').style('font-size', 'var(--type-scale-fixed-small)');
      xAxis.selectAll('.tick line, .domain').style('stroke', 'var(--theme-border)');
      xAxis.selectAll('.domain').remove();

      const area = d3
        .area()
        .x((d) => xScale(new Date(d.date)))
        .y0(height)
        .y1((d) => yScale(d.value));

      if (props.showAreaFill) {
        const area = d3
          .area()
          .x((d) => xScale(new Date(d.date)))
          .y0(height)
          .y1((d) => yScale(d.value));

        g.append('path').datum(props.data).attr('fill', 'url(#gradient-reversePositive)').attr('d', area);
      }

      g.append('path')
        .datum(props.data)
        .attr('fill', 'none')
        .attr('stroke', 'var(--theme-graph-positive)')
        .attr('stroke-width', 1)
        .attr(
          'd',
          d3
            .line()
            .x((d) => xScale(new Date(d.date)))
            .y((d) => yScale(d.value))
        );

      // Optional error bars
      if (props.showErrorBars) {
        drawErrorBars(svg, props.data, xScale, yScale, {
          color: 'var(--theme-text)',
          strokeWidth: 1,
          capWidth: 8,
          showConfidenceIntervalFill: props.showConfidenceIntervalFill,
        });
      }
    }
  };

  function drawErrorBars(svg, data, xScale, yScale, { color = 'var(--theme-text)', strokeWidth = 1, capWidth = 5, showConfidenceIntervalFill = false } = {}) {
    const g = svg.select('g');

    if (showConfidenceIntervalFill) {
      const areaGenerator = d3
        .area()
        .x((d) => xScale(new Date(d.date)))
        .y0((d) => yScale(d.upper_ci))
        .y1((d) => yScale(d.lower_ci))
        .curve(d3.curveMonotoneX);

      g.append('path').datum(data).attr('fill', 'var(--theme-border-subdued)').attr('d', areaGenerator);
    }

    data.forEach((d) => {
      const date = new Date(d.date);
      const x = xScale(date);
      const yLower = yScale(d.lower_ci);
      const yUpper = yScale(d.upper_ci);
      const yMidpoint = (yLower + yUpper) / 2;

      g.append('circle').attr('cx', x).attr('cy', yMidpoint).attr('r', 3).attr('fill', color);

      g.append('text')
        .attr('x', x + 5)
        .attr('y', yMidpoint)
        .attr('dy', '.35em')
        .text(`${((d.upper_ci + d.lower_ci) / 2).toFixed(0)}`)
        .style('font-size', 'var(--type-scale-fixed-tiny)')
        .style('fill', color);

      g.append('line').attr('x1', x).attr('x2', x).attr('y1', yLower).attr('y2', yUpper).attr('stroke', color).attr('stroke-width', strokeWidth);

      g.append('line')
        .attr('x1', x - capWidth / 2)
        .attr('x2', x + capWidth / 2)
        .attr('y1', yLower)
        .attr('y2', yLower)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      g.append('line')
        .attr('x1', x - capWidth / 2)
        .attr('x2', x + capWidth / 2)
        .attr('y1', yUpper)
        .attr('y2', yUpper)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);
    });
  }

  React.useEffect(() => {
    if (!d3Container || !d3Container.current) {
      return;
    }

    setContainerWidth(d3Container.current.clientWidth);
    const handleResize = () => {
      if (!d3Container || !d3Container.current) {
        return;
      }
      setContainerWidth(d3Container.current.clientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [props.data]);

  React.useEffect(() => {
    drawChart(containerWidth);
  }, [containerWidth, props.data, props.showErrorBars]);

  return <svg width="100%" height="188" ref={d3Container} style={props.style} />;
};

export default LineChart;
