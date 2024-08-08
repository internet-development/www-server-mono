import styles from '@system/Select.module.scss';

import * as Utilities from '@common/utilities';

import Caret from '@system/svg/Caret';

export default function Select(props) {
  let label = 'No options available';
  if (!props.options || !props.options.length) {
    return (
      <figure className={styles.disabled} style={props.style}>
        <span className={styles.passiveText}>{label}</span>
      </figure>
    );
  }

  label = props.options[0].label;
  if (!Utilities.isEmpty(props.value)) {
    label = props.options.find((e) => e.value === props.value).label;
  }

  return (
    <figure className={styles.root} style={props.style}>
      <span className={styles.activeText}>{label}</span>
      <Caret height="12px" className={styles.icon} />
      <select className={styles.select} onChange={props.onChange}>
        {props.options &&
          props.options.map((each) => {
            return (
              <option key={each.label} value={each.value}>
                {each.label}
              </option>
            );
          })}
      </select>
    </figure>
  );
}
