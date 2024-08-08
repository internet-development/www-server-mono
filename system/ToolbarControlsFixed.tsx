import styles from '@system/ToolbarControlsFixed.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

export default function ToolbarControlsFixed() {
  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <span className={styles.item}>Save</span>
        <span className={Utilities.classNames(styles.item, styles.disabled)}>Cancel</span>
        <span className={styles.divider} />
        <span className={styles.item}>Twist</span>
        <span className={styles.item}>Pull</span>
        <span className={styles.item}>Generate</span>
        <span className={styles.item}>Play</span>
      </div>
    </div>
  );
}
