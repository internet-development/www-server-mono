import styles from '@system/typography/Typography.module.scss';

export function H1(props) {
  return <h1 className={styles.h1} {...props} />;
}

export function H2(props) {
  return <h1 className={styles.h2} {...props} />;
}

export function H3(props) {
  return <h3 className={styles.h3} {...props} />;
}

export function H4(props) {
  return <h4 className={styles.h4} {...props} />;
}

export function H5(props) {
  return <h5 className={styles.h5} {...props} />;
}

export function Lead(props) {
  return <p className={styles.lead} {...props} />;
}

export function SubLead(props) {
  return <p className={styles.subLead} {...props} />;
}

export function Title(props) {
  return <h4 className={styles.title} {...props} />;
}

export function P(props) {
  if (props.href) {
    return <a {...props} className={styles.p} />;
  }

  return <p className={styles.p} {...props} />;
}

export function Text(props) {
  if (props.href) {
    return <a {...props} className={styles.text} />;
  }

  return <p className={styles.text} {...props} />;
}

export function SubTitle(props) {
  return <p className={styles.subTitle} {...props} />;
}

export function SubText(props) {
  if (props.href) {
    return <a {...props} className={styles.subText} />;
  }

  return <p className={styles.subText} {...props} />;
}

export function UnitLabel(props) {
  return <span className={styles.unitLabel} {...props} />;
}
