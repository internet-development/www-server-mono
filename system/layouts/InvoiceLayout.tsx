import styles from '@system/layouts/InvoiceLayout.module.scss';

import * as React from 'react';

export default function InvoiceLayout(props) {
  return <div className={styles.root}>{props.children}</div>;
}
