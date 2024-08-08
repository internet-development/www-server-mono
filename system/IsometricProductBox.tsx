import * as React from 'react';
import * as Utilities from '@common/utilities';

import styles from '@system/IsometricProductBox.module.scss';

interface ResizableProductBoxProps {
  children?: React.ReactNode;
  disableResize?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  x: number;
  y: number;
}

const IsometricProductBox = React.forwardRef<HTMLDivElement, ResizableProductBoxProps>((props, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [initialMouseX, setInitialMouseX] = React.useState(0);
  const [initialMouseY, setInitialMouseY] = React.useState(0);
  const [dx, setDx] = React.useState(props.x);
  const [dy, setDy] = React.useState(props.y);
  const [width, setWidth] = React.useState(800);
  const [height, setHeight] = React.useState(800);
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
              width: `1200px`,
              height: `400px`,
              transform: `translateZ(400px)`,
            }}
          >
            <div className={styles.brand}>
              <svg viewBox="0 0 1302 94" width="100%" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(.9375 .25)">
                  <path d="m0 91.75h16.125v-90.1875h-16.125z" />
                  <path d="m32 91.75h16.0625v-63.4375h.3125l44.0625 63.4375h14.375v-90.1875h-16v63.1875h-.375l-43.9375-63.1875h-14.5z" />
                  <path d="m144.8125 91.75h16.0625v-76.625h26.9375v-13.5625h-70v13.5625h27z" />
                  <path d="m198.8125 91.75h32.9375c27 0 42.875-16.75 42.875-45.3125v-.125c0-28.5-16-44.75-42.875-44.75h-32.9375zm16.125-13.625v-62.9375h15.125c17.9375 0 28.125 11.0625 28.125 31.1875v.125c0 20.5625-10 31.625-28.125 31.625z" />
                  <path d="m287.4375 91.75h58.375v-13.5625h-42.25v-25.6875h39.9375v-13.0625h-39.9375v-24.3125h42.25v-13.5625h-58.375z" />
                  <path d="m384.8125 91.75h18.6875l31.3125-90.1875h-17.5625l-22.9375 73h-.3125l-22.875-73h-17.5625z" />
                  <path d="m450.875 46.5h12.625v-34.25h12.8125v-10.6875h-38.25v10.6875h12.8125zm31.0625 0h11v-25.6875h.8125l10.25 25.6875h7l10.1875-25.6875h.8125v25.6875h11v-44.9375h-14.5625l-10.8125 26.25h-.25l-10.875-26.25h-14.5625z" />
                  <path d="m570.6875 91.75h16.0625v-63.4375h.3125l44.0625 63.4375h14.375v-90.1875h-16v63.1875h-.375l-43.9375-63.1875h-14.5z" />
                  <path d="m689 93.0625c17.3125 0 27.0625-10.25 29.125-20.4375l.1875-.6875h-14.5625l-.125.4375c-1.5 4.4375-6.5625 8.5625-14.3125 8.5625-10.125 0-16.5-6.875-16.75-18.5h46.375v-5c0-20-11.75-33.3125-30.6875-33.3125s-31.125 13.75-31.125 34.625v.0625c0 21.0625 12 34.25 31.875 34.25zm-.5625-56.75c8.25 0 14.25 5.25 15.375 15.75h-31.0625c1.25-10.1875 7.4375-15.75 15.6875-15.75z" />
                  <path d="m723.0625 91.75h16.625l13.6875-23.75h.375l13.75 23.75h17l-21.125-33.5 21.3125-32.75h-17l-13.1875 23.25h-.375l-13.3125-23.25h-17.5l21.1875 33.1875z" />
                  <path d="m817.25 93.0625c3.125 0 5.875-.3125 7.6875-.5625v-11.6875c-1.0625.0625-2.25.25-3.75.25-5.6875 0-8.5625-2.0625-8.5625-8.5625v-35h12.3125v-12h-12.3125v-16.8125h-15.8125v16.8125h-9.375v12h9.375v36.3125c0 13.625 6.5625 19.25 20.4375 19.25z" />
                  <path d="m860 93.3125c18.5 0 29.25-10.75 29.25-29.0625v-62.6875h-16.0625v62.5625c0 9.8125-4.625 15.0625-13.375 15.0625-7.9375 0-12.1875-5.1875-12.625-12.125l-.0625-.5h-15.75l.0625.6875c.625 15.5 11 26.0625 28.5625 26.0625z" />
                  <path d="m937.3125 93.3125c22 0 35.25-10.6875 35.25-27.5v-.0625c0-14.0625-8.1875-21.6875-26.9375-25.5625l-9.75-2c-10.875-2.25-15.8125-6-15.8125-12.375v-.0625c0-7.1875 6.5625-12.125 17.125-12.1875 10.125 0 17.0625 4.6875 18.125 12.5625l.125.75h15.4375l-.0625-1.0625c-.9375-15.4375-13.8125-25.8125-33.5-25.8125-19.4375 0-33.375 10.75-33.4375 26.625v.0625c0 13.4375 8.75 21.6875 26.5 25.375l9.6875 2c11.625 2.4375 16.3125 6.0625 16.3125 12.8125v.0625c0 7.75-7.125 12.8125-18.5 12.8125-11.3125 0-19.25-4.8125-20.4375-12.5625l-.125-.75h-15.4375l.0625.9375c1.0625 16.1875 14.6875 25.9375 35.375 25.9375z" />
                  <path d="m1010.25 91.75h16.125v-36.8125h37.8125v-13.125h-37.8125v-26.6875h41.375v-13.5625h-57.5z" />
                  <path d="m1111.125 93.3125c22 0 35.25-10.6875 35.25-27.5v-.0625c0-14.0625-8.1875-21.6875-26.9375-25.5625l-9.75-2c-10.875-2.25-15.8125-6-15.8125-12.375v-.0625c0-7.1875 6.5625-12.125 17.125-12.1875 10.125 0 17.0625 4.6875 18.125 12.5625l.125.75h15.4375l-.0625-1.0625c-.9375-15.4375-13.8125-25.8125-33.5-25.8125-19.4375 0-33.375 10.75-33.4375 26.625v.0625c0 13.4375 8.75 21.6875 26.5 25.375l9.6875 2c11.625 2.4375 16.3125 6.0625 16.3125 12.8125v.0625c0 7.75-7.125 12.8125-18.5 12.8125-11.3125 0-19.25-4.8125-20.4375-12.5625l-.125-.75h-15.4375l.0625.9375c1.0625 16.1875 14.6875 25.9375 35.375 25.9375z" />
                  <path d="m1158.4375 91.75h16.125v-29.8125h18.625c18.25 0 30.6875-12.125 30.6875-30.125v-.125c0-18.0625-12.4375-30.125-30.6875-30.125h-34.75zm30.75-77c11.5625 0 18.3125 6.1875 18.3125 17v.125c0 10.8125-6.75 17.0625-18.3125 17.0625h-14.625v-34.1875z" />
                  <path d="m1235.625 91.75h16.125v-29.0625l8.875-10.5625 28.0625 39.625h19.625l-36.0625-50.375 33.3125-39.8125h-18.4375l-34.9375 42.3125h-.4375v-42.3125h-16.125z" />
                </g>
              </svg>
            </div>
          </div>
          <div
            className={Utilities.classNames(styles.face, styles.left)}
            style={{
              width: `800px`,
              height: `400px`,
              transform: `rotateY(-90deg) translateZ(400px)`,
            }}
          >
            <div className={styles.side}>
              <div className={styles.panel}></div>
              <div className={styles.panel}></div>
              <div className={styles.panel}></div>
              <div className={styles.panel}></div>
              <div className={styles.panel}></div>
            </div>
          </div>

          <div
            className={Utilities.classNames(styles.face, styles.topTwo)}
            style={{
              width: `1248px`,
              height: `848px`,
              transform: `rotateX(90deg) translateZ(24px) translateY(-0px) translateX(-24px)`,
              filter: `blur(8rem)`,
            }}
          />

          <div
            className={Utilities.classNames(styles.face, styles.top)}
            style={{
              width: `1200px`,
              height: `800px`,
              transform: `rotateX(90deg) translateZ(400px)`,
            }}
          >
            <div className={styles.grid}>
              <div className={styles.row}>
                <div className={styles.column} style={{ fontSize: 48, lineHeight: `40px`, fontWeight: 600 }}>
                  INTDEV™ NextJS FSPK
                </div>
                <div className={styles.column}>
                  Full Stack Application Inside
                  <br />
                  Application Full Stack à l'intérieur
                  <br />
                  Full-Stack-Anwendung im Inneren
                  <br />
                  内部にフルスタックアプリケーション
                  <br />
                  內部有全棧應用程序
                  <br />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}></div>
                <div className={styles.column}></div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: 0, fontWeight: 600 }}>12dc07b5-be2d-4514-959e-13b8d1832002</span>
                  <br />
                  <br />{' '}
                  <span style={{ display: 'block', paddingLeft: 16, borderLeft: `4px solid #dcdcdc`, opacity: 0.6 }}>
                    Make me a website that allows anyone to make a multiplayer spreadsheet, with a standard marketing page, but you can test the product from the marketing page,
                    and add Google sign in and Bluesky sign in.
                  </span>
                </div>
                <div className={styles.column} style={{ textTransform: 'uppercase', letterSpacing: 0 }}>
                  ⎯⊹ 13 pages
                  <br />
                  ⎯⊹ 38 files (10.5 mb)
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column} style={{ textTransform: 'uppercase', letterSpacing: 0 }}>
                  ⎯⊹ Navigation Component
                  <br />
                  ⎯⊹ Modal Components
                  <br />
                  ⎯⊹ User Components
                  <br />
                  ⎯⊹ Interactive Spreadsheet Components
                  <br />
                  ⎯⊹ OAuth Components
                </div>
                <div className={styles.column} style={{ textTransform: 'uppercase', letterSpacing: 0 }}>
                  ⎯⊹ Design system
                  <br />
                  ⎯⊹ Brand guidelines
                  <br />
                  ⎯⊹ Custom icon set
                  <br />
                  ⎯⊹ Custom App icon
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}> </div>
                <div className={styles.column} style={{ textTransform: 'uppercase', letterSpacing: 0 }}>
                  ⎯⊹ SEO optimized
                  <br />
                  ⎯⊹ Preview images
                  <br />
                  ⎯⊹ Mobile responsive
                  <br />
                  ⎯⊹ Unit and Integration Tests
                  <br />
                  ⎯⊹ Less than 100kb page size
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default IsometricProductBox;
