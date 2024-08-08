import * as d3 from 'd3';
import * as React from 'react';

const DonutChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current || width <= 0) return;

    const svg = d3.select(d3Container.current);
    svg.selectAll('*').remove(); // Clear the SVG content before drawing

    const radius = Math.min(width, 400) / 2; // Assuming a fixed height of 400 for simplicity
    const donutWidth = 75; // Width of the donut ring

    const arc = d3
      .arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    const path = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, 200)`) // Center the donut chart
      .selectAll('path')
      .data(pie(props.data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color);

    // Optional: Add labels to the donut slices
    const label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - donutWidth);

    svg
      .append('g')
      .attr('transform', `translate(${width / 2}, 200)`)
      .selectAll('text')
      .data(pie(props.data))
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${label.centroid(d)})`)
      .attr('dy', '0.35em')
      .text((d) => d.data.value)
      .style('text-anchor', 'middle')
      .style('font-size', '12px');
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

  return <svg width="100%" height="400" ref={d3Container} style={props.style} />;
};

export default DonutChart;
