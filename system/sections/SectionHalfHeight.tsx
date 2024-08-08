import styles from '@system/sections/SectionHalfHeight.module.scss';

import * as React from 'react';

export default function SectionHalfHeight(props) {
  return <div className={styles.root}>{props.children}</div>;
}
