import styles from '@system/layouts/AppLayout.module.scss';

import * as React from 'react';

export default function AppLayout(props) {
  return <div className={styles.root}>{props.children}</div>;
}
