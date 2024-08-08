import * as d3 from 'd3';
import * as React from 'react';

const GroupedBubblesChart = ({ data, layout = 'circle' }) => {
  const d3Container = React.useRef(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].target) {
        setContainerWidth(entries[0].target.clientWidth);
      }
    });
    if (d3Container.current) {
      resizeObserver.observe(d3Container.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    if (containerWidth > 0) {
      drawChart(containerWidth);
    }
  }, [containerWidth, data, layout]);

  const drawChart = (width) => {
    if (!d3Container.current) return;

    d3.select(d3Container.current).selectAll('*').remove();
    const svg = d3.select(d3Container.current).append('svg').attr('width', width).attr('height', 600);

    const margin = { top: 0, right: 0, bottom: 50, left: 0 };
    const groupDiameter = Math.min(width / 3, 400) - margin.left;
    const maxRadius = groupDiameter / 2 - 10;

    let xOffset = margin.left;
    let yOffset = margin.top;
    let groupsPerRow = 0;

    data.forEach((group, index) => {
      if (groupsPerRow >= 3) {
        xOffset = margin.left;
        yOffset += groupDiameter + 100;
        groupsPerRow = 0;
      }

      const g = svg.append('g').attr('transform', `translate(${xOffset + maxRadius},${yOffset + maxRadius})`);

      if (layout === 'square') {
        const fixedCircleRadius = 24; // Fixed radius for all circles
        const numCols = Math.ceil(Math.sqrt(group.count));
        const numRows = Math.ceil(group.count / numCols);
        const spacing = 2 * fixedCircleRadius + 2; // Space between circles
        const gridHeight = numRows * spacing;
        let i = 0;

        for (let row = 0; row < numRows; row++) {
          // Start from bottom row
          for (let col = 0; col < numCols; col++) {
            if (i < group.count) {
              g.append('circle')
                .attr('cx', col * spacing - (numCols / 2) * spacing + spacing / 2)
                .attr('cy', (numRows - row - 1) * spacing - (numRows / 2) * spacing + spacing / 2) // Adjust y-coordinates to start from the bottom
                .attr('r', fixedCircleRadius)
                .style('fill', group.color);
              i++;
            }
          }
        }
      } else {
        // Circular layout using force simulation
        const nodes = Array.from({ length: group.count }, () => ({
          radius: 16,
          color: group.color,
        }));

        const simulation = d3
          .forceSimulation(nodes)
          .force('charge', d3.forceManyBody().strength(0.2))
          .force('center', d3.forceCenter(0, 0))
          .force(
            'collision',
            d3.forceCollide().radius((d) => d.radius + 1)
          )
          .stop();

        for (let i = 0; i < 120; i++) simulation.tick();

        g.selectAll('circle')
          .data(nodes)
          .enter()
          .append('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .attr('r', (d) => d.radius)
          .style('fill', (d) => d.color);
      }

      // Labels and percentages
      g.append('text')
        .attr('x', 0)
        .attr('y', maxRadius + 24)
        .attr('text-anchor', 'middle')
        .style('fill', 'var(--theme-text)')
        .style('font-size', 'var(--type-scale-fixed-medium)')
        .style('font-weight', '600')
        .text(`${group.name} (${group.count})`);

      g.append('text')
        .attr('x', 0)
        .attr('y', maxRadius + 48)
        .attr('text-anchor', 'middle')
        .style('fill', 'var(--theme-text)')
        .style('font-size', 'var(--type-scale-fixed-small)')
        .text(`${((group.count / data.reduce((acc, cur) => acc + cur.count, 0)) * 100).toFixed(1)}%`);

      xOffset += groupDiameter + margin.right;
      groupsPerRow++;
    });

    svg.attr('height', yOffset + groupDiameter + 228);
  };

  return <div ref={d3Container} style={{ width: '100%', height: 'auto' }} />;
};

export default GroupedBubblesChart;
