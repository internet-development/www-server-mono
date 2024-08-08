import styles from '@system/scroll/ScrollVertical.module.scss';

import * as React from 'react';

function ScrollVertical(props) {
  const svgRef = React.useRef(null);
  const [path, setPath] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const width = window.innerWidth;
      const amplitudeBase = Math.min(width / 4, 100);
      const frequency = 0.02;
      const amplitudeIncrement = 0.3;
      const pathData: string[] = [];

      let x = width / 2;
      let y = 0;

      pathData.push(`M ${x} ${y}`);

      for (let i = 0; i < scrollPosition; i += 0.05) {
        y = i;
        const amplitude = amplitudeBase + i * amplitudeIncrement;
        const x1 = width / 2 + amplitude * Math.sin(frequency * (i - 5));
        x = width / 2 + amplitude * Math.sin(frequency * i);
        pathData.push(`Q ${x1} ${y - 5}, ${x} ${y}`);
      }

      setPath(pathData.join(' '));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.root} style={{ height: props.height }}>
      <div className={styles.gradient}></div>
      <svg ref={svgRef} width="100%" height={props.height} className={styles.svg}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: props.colorStart, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: props.colorEnd, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="url(#lineGradient)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default ScrollVertical;
