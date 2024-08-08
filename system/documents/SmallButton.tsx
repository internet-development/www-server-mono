import styles from '@system/documents/SmallButton.module.scss';

export default function SmallButton(props) {
  return <button children={props.children} className={styles.root} disabled={props.disabled} onClick={props.onClick} style={props.style} />;
}
