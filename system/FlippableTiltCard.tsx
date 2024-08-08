import styles from '@system/FlippableTiltCard.module.scss';

import * as React from 'react';

const FlippableTiltCard = (props) => {
  const [flipped, setFlipped] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const handleMouseMove = (e) => {
      const { width, height, left, top } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const centerX = width / 2;
      const centerY = height / 2;
      const rotateX = ((y - centerY) / centerY) * -32;
      const rotateY = ((x - centerX) / centerX) * 32;

      card.style.transition = 'none';
      card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = '400ms ease all';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  let style = {};
  if (flipped) {
    style = { transform: `rotateY(180deg)`, zIndex: 1 };
  }

  return (
    <div ref={cardRef} className={styles.spacing}>
      <div
        className={styles.card}
        onClick={() => {
          setFlipped(!flipped);
        }}
      >
        <div className={styles.face} style={style}>
          <div className={styles.back}>{props.backElement}</div>
          <div className={styles.front}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default FlippableTiltCard;
