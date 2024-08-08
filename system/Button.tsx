import styles from '@system/Button.module.scss';

import Loader from '@system/Loader';

export default function Button(props) {
  if (props.visual) {
    return <button children={props.children} style={props.style} className={styles.visual} />;
  }

  if (props.loading) {
    return (
      <div className={styles.loader} style={props.style}>
        <Loader />
      </div>
    );
  }

  if (props.href) {
    return <a className={styles.root} {...props} />;
  }

  return <button children={props.children} className={styles.root} disabled={props.disabled} onClick={props.onClick} style={props.style} />;
}
