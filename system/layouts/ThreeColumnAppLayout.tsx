import styles from '@system/layouts/ThreeColumnAppLayout.module.scss';

import * as React from 'react';

export default function ThreeColumnAppLayout(props) {
  return (
    <div className={styles.root}>
      <div className={styles.column}>{props.sidebar}</div>
      <div className={styles.column}>{props.details}</div>
      <div className={styles.fluid}>{props.children}</div>
    </div>
  );
}
