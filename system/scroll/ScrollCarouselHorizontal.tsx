import styles from '@system/scroll/ScrollCarouselHorizontal.module.scss';

import * as React from 'react';

const ScrollCarouselHorizontal = (props) => {
  const doubledImages = [...props.images, ...props.images];
  return (
    <div className={styles.carousel}>
      <div className={styles.scroller}>
        {doubledImages.map((src, i) => (
          <li key={i} className={styles.item}>
            <img src={src} className={styles.image} alt="" />
          </li>
        ))}
      </div>
    </div>
  );
};

export default ScrollCarouselHorizontal;
