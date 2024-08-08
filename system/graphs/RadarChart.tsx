import * as d3 from 'd3';
import * as React from 'react';

const RadarChart = (props) => {
  const d3Container = React.useRef<HTMLDivElement | null | any>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const drawChart = (width) => {
    if (!d3Container.current) {
      return;
    }

    if (props.data && d3Container && d3Container.current && width > 0) {
      const cfg = {
        w: width, // (xBalbinus) Width of the circle
        h: 600, // (xBalbinus) Height of the circle
        margin: { top: 24, right: 24, bottom: 24, left: 0 }, // (xBalbinus) The margins of the SVG
        levels: 3, // (xBalbinus) How many levels or inner circles should there be drawn
        maxValue: 0, // (xBalbinus) What is the value that the biggest circle will represent
        labelFactor: 1.25, // (xBalbinus) How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, // (xBalbinus) The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, // (xBalbinus) The opacity of the area of the blob
        dotRadius: 4, // (xBalbinus) The size of the colored circles of each blog
        opacityCircles: 0.1, // (xBalbinus) The opacity of the circles of each blob
        strokeWidth: 2, // (xBalbinus) The width of the stroke around each blob
        roundStrokes: false, // (xBalbinus) If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scaleOrdinal(d3.schemeCategory10), // (xBalbinus) Color function
      };

      const maxValue = Math.max(
        cfg.maxValue,
        d3.max(props.data, (i) => d3.max(i.map((o) => o.value)))
      );

      const allAxis = props.data[0].map((i) => i.axis), // (xBalbinus) Names of each axis
        total = allAxis.length, // (xBalbinus) The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2), // (xBalbinus) Radius of the outermost circle
        Format = d3.format('%'), // (xBalbinus) Percentage formatting
        angleSlice = (Math.PI * 2) / total; // (xBalbinus) The width in radians of each "slice"

      const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

      d3.select(d3Container.current).select('svg').remove();

      const svg = d3
        .select(d3Container.current)
        .append('svg')
        .attr('width', cfg.w + cfg.margin.left + cfg.margin.right)
        .attr('height', cfg.h + cfg.margin.top + cfg.margin.bottom)
        .attr('class', 'radar');

      const g = svg.append('g').attr('transform', `translate(${cfg.w / 2 + cfg.margin.left},${cfg.h / 2 + cfg.margin.top})`);

      const filter = g.append('defs').append('filter').attr('id', 'glow'),
        feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur'),
        feMerge = filter.append('feMerge'),
        feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
        feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      const axisGrid = g.append('g').attr('class', 'axisWrapper');

      axisGrid
        .selectAll('.levels')
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append('circle')
        .attr('class', 'gridCircle')
        .attr('r', (d) => (radius / cfg.levels) * d)
        .style('fill', 'var(--theme-border)')
        .style('stroke', 'var(--theme-border-subdued)')
        .style('fill-opacity', cfg.opacityCircles);

      axisGrid
        .selectAll('.axisLabel')
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append('text')
        .attr('class', 'axisLabel')
        .attr('x', 4)
        .attr('y', (d) => (-d * radius) / cfg.levels)
        .attr('dy', '0.4em')
        .style('font-size', 'var(--type-scale-fixed-small)')
        .attr('fill', '#737373')
        .text((d) => Format((maxValue * d) / cfg.levels));

      const radarLine = d3
        .lineRadial()
        .curve(d3.curveLinearClosed)
        .radius((d) => rScale(d.value))
        .angle((d, i) => i * angleSlice);

      if (cfg.roundStrokes) {
        radarLine.curve(d3.curveCardinalClosed);
      }

      const blobWrapper = g.selectAll('.radarWrapper').data(props.data).enter().append('g').attr('class', 'radarWrapper');

      blobWrapper
        .append('path')
        .attr('class', 'radarArea')
        .attr('d', (d) => radarLine(d))
        .style('fill', (d, i) => cfg.color(i))
        .style('fill-opacity', cfg.opacityArea)
        .on('mouseover', function (d, i) {
          d3.selectAll('.radarArea').transition().duration(200).style('fill-opacity', 1);
          d3.select(this).transition().duration(200).style('fill-opacity', 1);
        })
        .on('mouseout', function () {
          d3.selectAll('.radarArea').transition().duration(200).style('fill-opacity', cfg.opacityArea);
        });

      blobWrapper
        .append('path')
        .attr('class', 'radarStroke')
        .attr('d', (d) => radarLine(d))
        .style('stroke-width', cfg.strokeWidth + 'px')
        .style('stroke', (d, i) => cfg.color(i))
        .style('fill', 'none')
        .style('filter', 'url(#glow)');

      blobWrapper
        .selectAll('.radarCircle')
        .data((d) => d)
        .enter()
        .append('circle')
        .attr('class', 'radarCircle')
        .attr('r', cfg.dotRadius)
        .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .style('fill', (d, i, j) => cfg.color(j))
        .style('fill-opacity', 1);

      const blobCircleWrapper = g.selectAll('.radarCircleWrapper').data(props.data).enter().append('g').attr('class', 'radarCircleWrapper');

      blobCircleWrapper
        .selectAll('.radarInvisibleCircle')
        .data((d) => d)
        .enter()
        .append('circle')
        .attr('class', 'radarInvisibleCircle')
        .attr('r', cfg.dotRadius * 1.5)
        .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .style('fill', 'none')
        .style('pointer-events', 'all');
    }
  };

  React.useEffect(() => {
    if (!d3Container.current) {
      return;
    }

    setContainerWidth(d3Container.current.clientWidth);
    const handleResize = () => {
      if (!d3Container.current) {
        return;
      }
      setContainerWidth(d3Container.current.clientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [props.data]);

  React.useEffect(() => {
    drawChart(containerWidth);
  }, [containerWidth, props.data]);

  return <svg width="100%" height="650" ref={d3Container} />;
};

export default RadarChart;
