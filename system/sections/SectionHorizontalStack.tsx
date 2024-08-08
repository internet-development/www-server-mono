import styles from '@system/sections/SectionHorizontalStack.module.scss';

import * as React from 'react';

export default function SectionHorizontalStack(props) {
  return (
    <div className={styles.root}>
      <div className={styles.top}>{props.top}</div>
      <div className={styles.middle}>{props.children}</div>
      <div className={styles.bottom}>{props.bottom}</div>
    </div>
  );
}
