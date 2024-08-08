import styles from '@system/layouts/Content.module.scss';

import * as React from 'react';

export default function Content(props) {
  return <div className={styles.root}>{props.children}</div>;
}
