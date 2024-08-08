import styles from '@system/graphs/ChartLegend.module.scss';

export default function ChartLegend(props) {
  return (
    <div className={styles.root} style={props.style}>
      {props.data.map((backgroundColor) => {
        return (
          <div className={styles.item} key={backgroundColor}>
            <span className={styles.legendColor} style={{ backgroundColor }} />
            <span className={styles.name}>{backgroundColor}</span>
          </div>
        );
      })}
    </div>
  );
}
