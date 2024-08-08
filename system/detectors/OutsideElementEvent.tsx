import React, { useEffect, useRef } from 'react';

interface OutsideElementEventProps {
  className?: string;
  children: React.ReactNode;
  onOutsideEvent: (event: MouseEvent | TouchEvent) => void;
  style?: Record<string, any>;
}

const OutsideElementEvent: React.FC<OutsideElementEventProps> = ({ className, children, onOutsideEvent, style }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideEvent = (event) => {
    if (event.target.hasAttribute('data-detector-ignore-navigation')) {
      return;
    }

    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideEvent(event);
      return;
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideEvent);
    document.addEventListener('touchstart', handleOutsideEvent);

    return () => {
      document.removeEventListener('mousedown', handleOutsideEvent);
      document.removeEventListener('touchstart', handleOutsideEvent);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default OutsideElementEvent;
