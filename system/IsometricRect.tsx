import * as React from 'react';
import * as Utilities from '@common/utilities';

import styles from '@system/IsometricRect.module.scss';

interface ResizableMonospaceWindowProps {
  children?: React.ReactNode;
  disableResize?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  size: number;
  src: string;
  x: number;
  y: number;
}

const IsometricRect = React.forwardRef<HTMLDivElement, ResizableMonospaceWindowProps>((props, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [initialMouseX, setInitialMouseX] = React.useState(0);
  const [initialMouseY, setInitialMouseY] = React.useState(0);
  const [dx, setDx] = React.useState(props.x);
  const [dy, setDy] = React.useState(props.y);
  const [width, setWidth] = React.useState(props.size);
  const [height, setHeight] = React.useState(props.size);
  const [resizeEdge, setResizeEdge] = React.useState('');

  const handleMouseMove = React.useCallback(
    (e) => {
      if (isDragging) {
        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;
        setDx(dx + deltaX);
        setDy(dy + deltaY);
        setInitialMouseX(e.clientX);
        setInitialMouseY(e.clientY);
      } else if (resizeEdge) {
        if (resizeEdge === 'right') {
          setWidth(Math.max(100, width + (e.clientX - initialMouseX)));
        } else if (resizeEdge === 'bottom') {
          setHeight(Math.max(100, height + (e.clientY - initialMouseY)));
        } else if (resizeEdge === 'left') {
          const newWidth = Math.max(100, width - (e.clientX - initialMouseX));
          if (newWidth > 100) {
            setDx(dx + (e.clientX - initialMouseX));
            setWidth(newWidth);
          }
        } else if (resizeEdge === 'top') {
          const newHeight = Math.max(100, height - (e.clientY - initialMouseY));
          if (newHeight > 100) {
            setDy(dy + (e.clientY - initialMouseY));
            setHeight(newHeight);
          }
        }
        setInitialMouseX(e.clientX);
        setInitialMouseY(e.clientY);
      }
    },
    [isDragging, resizeEdge, initialMouseX, initialMouseY, dx, dy, width, height]
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
    setResizeEdge('');
  }, []);

  React.useEffect(() => {
    if (isDragging || resizeEdge) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [handleMouseMove, handleMouseUp, isDragging, resizeEdge]);

  const handleMouseDown = (e) => {
    if (e.target.dataset.resizer) {
      setResizeEdge(e.target.dataset.resizer);
    } else if (e.target.dataset.header) {
      setIsDragging(true);
    } else {
      return;
    }
    setInitialMouseX(e.clientX);
    setInitialMouseY(e.clientY);
    e.preventDefault();
  };

  return (
    <div
      data-header="true"
      className={styles.box}
      ref={ref}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${dx}px, ${dy}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={styles.anchor}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div
          className={styles.cube}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <div
            className={Utilities.classNames(styles.face, styles.front)}
            style={{
              width: `30px`,
              height: `${height}px`,
              transform: `translateZ(${height / 2}px)`,
              lineHeight: `${height}px`,
            }}
          ></div>

          <div
            className={Utilities.classNames(styles.face, styles.left)}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `rotateY(-90deg) translateZ(${height / 2}px)`,
              lineHeight: `${height}px`,
            }}
          >
            <iframe src={props.src} className={styles.iframe} frameBorder="0"></iframe>
          </div>
          <div
            className={Utilities.classNames(styles.face, styles.top)}
            style={{
              width: `30px`,
              height: `${height}px`,
              transform: `rotateX(90deg) translateZ(${height / 2}px)`,
              lineHeight: `${height}px`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default IsometricRect;
