import styles from '@system/layouts/WideAppLayout.module.scss';

import * as React from 'react';

export default function WideAppLayout(props) {
  return <div className={styles.root}>{props.children}</div>;
}
