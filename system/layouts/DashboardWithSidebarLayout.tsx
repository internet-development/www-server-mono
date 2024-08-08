import styles from '@system/layouts/DashboardWithSidebarLayout.module.scss';

import * as React from 'react';

export default function DashboardWithSidebarLayout(props) {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{props.sidebar}</div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
