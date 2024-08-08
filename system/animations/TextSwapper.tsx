import styles from '@system/animations/TextSwapper.module.scss';

import * as React from 'react';

const buildAnimationStyle = (type: AnimationType, duration: string): object => {
  return {
    animation: `${type} ${duration}`,
    animationFillMode: 'forwards',
  };
};

type AnimationType = 'fade' | 'slideDown' | 'slideUp' | 'slideLeft' | 'slideRight' | 'blur';

type TextSwapProps = {
  style?: any;
  strings: string[];
  interval?: number;
  animationType?: AnimationType;
  animationDuration?: string;
};

const TextSwapper = ({ animationType = 'fade', animationDuration = '2.4s', interval = 2400, style, strings }: TextSwapProps) => {
  const defaultStyle = buildAnimationStyle(animationType, animationDuration);

  const [currString, setCurrString] = React.useState(strings[0]);
  const [animationStyle, setAnimationStyle] = React.useState(defaultStyle);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const currIndex: number = strings.indexOf(currString);
      const nextIndex: number = currIndex < strings.length - 1 ? currIndex + 1 : 0;
      setCurrString(strings[nextIndex]);
    }, interval);
    return () => {
      setAnimationStyle({});
      clearInterval(timer);
      setAnimationStyle(animationStyle);
    };
  }, [currString, strings, interval, animationStyle]);

  return (
    <span className={styles.root} style={style}>
      <span className={styles.animation} key={currString} style={animationStyle}>
        {currString}
      </span>
    </span>
  );
};

export default TextSwapper;
