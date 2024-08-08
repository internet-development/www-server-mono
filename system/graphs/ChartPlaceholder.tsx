import styles from '@system/graphs/ChartPlaceholder.module.scss';

export default function ChartPlaceholder(props) {
  return (
    <div className={styles.root} style={props.style}>
      {props.children}
    </div>
  );
}
