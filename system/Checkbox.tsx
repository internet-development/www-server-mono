import styles from '@system/Checkbox.module.scss';

import Checkmark from '@system/svg/Checkmark';

function Checkbox(props) {
  return (
    <div className={styles.section} style={props.style}>
      <div className={styles.relative} style={props.checkboxStyle}>
        <label className={styles.figure} htmlFor={`${props.name}-checkbox`}>
          {props.value ? <Checkmark height="16px" /> : null}
        </label>
        <input checked={props.value} className={styles.input} id={`${props.name}-checkbox`} type="checkbox" name={props.name} onChange={props.onChange} />
      </div>
      <div className={styles.right}>{props.children}</div>
    </div>
  );
}

export default Checkbox;
