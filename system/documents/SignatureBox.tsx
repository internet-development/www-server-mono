import styles from '@system/documents/SignatureBox.module.scss';

import * as React from 'react';

export default function SignatureBox(props) {
  return (
    <div className={styles.root} style={props.style}>
      <div className={styles.title}>{props.signer}</div>
      <div className={styles.signature}>Signature: </div>
      <div className={styles.date}>Date:&nbsp;</div>
      <div className={styles.row}>{props.name}&nbsp;</div>
      <div className={styles.row}>{props.title}&nbsp;</div>
    </div>
  );
}
