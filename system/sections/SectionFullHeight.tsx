import styles from '@system/sections/SectionFullHeight.module.scss';

import * as React from 'react';

export default function SectionFullHeight(props) {
  return <div className={styles.root}>{props.children}</div>;
}
