import styles from '@system/layouts/TwoColumnLayout.module.scss';

import * as React from 'react';

export default function TwoColumnLayout(props) {
  return (
    <div className={styles.root}>
      {props.sidebar ? <div className={styles.left}>{props.sidebar}</div> : null}
      <div className={styles.right}>{props.children}</div>
    </div>
  );
}
