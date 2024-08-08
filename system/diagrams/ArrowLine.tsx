import styles from '@system/diagrams/ArrowLine.module.scss';

import * as React from 'react';

const ArrowLine = ({ start, end }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const updateArrow = React.useCallback(() => {
    if (!start.current || !end.current) {
      return;
    }

    if (!svgRef.current) {
      return;
    }

    const svg = svgRef.current;
    const startRect = start.current.getBoundingClientRect();
    const endRect = end.current.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    const pathData = `M${startX},${startY} L${endX},${endY}`;

    if (svg) {
      svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
      svg.querySelector('path')?.setAttribute('d', pathData);
    }
  }, [start, end]);

  React.useEffect(() => {
    updateArrow();

    const handleResize = () => {
      updateArrow();
    };

    const handleComponentUpdate = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
          updateArrow();
        }
      });
    };

    const observerOptions = {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: false,
    };

    const observer = new MutationObserver(handleComponentUpdate);
    observer.observe(start.current, observerOptions);
    observer.observe(end.current, observerOptions);

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [start, end, updateArrow]);

  return (
    <svg ref={svgRef} className={styles.arrow}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--theme-text)" />
          <stop offset="40%" stopColor="var(--theme-border)" />
          <stop offset="100%" stopColor="var(--theme-background)" />
        </linearGradient>
      </defs>
      <path />
    </svg>
  );
};

export default ArrowLine;
