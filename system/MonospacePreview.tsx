import styles from '@system/MonospacePreview.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Cross from '@system/svg/Cross';

export default function MonospacePreview(props) {
  return (
    <div className={Utilities.classNames(styles.root, props.isActive ? styles.active : null)} style={props.style}>
      <div className={styles.title}>
        <span className={styles.left}>{props.title}</span>
        {props.onDelete ? (
          <span className={styles.right} onClick={props.onDelete}>
            <Cross height="12px" />
          </span>
        ) : null}
      </div>
      <div className={styles.children} onClick={props.onClick}>
        {props.children}
      </div>
    </div>
  );
}
