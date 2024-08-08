import styles from '@system/Table.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Checkbox from '@system/Checkbox';

function generateAutoString(count: number): string {
  if (count <= 0) {
    return '';
  }

  const autoArray = new Array(count).fill('auto');
  return autoArray.join(' ');
}

export default function Table(props) {
  let gridTemplateColumns = props.isInteractive
    ? `40px ${generateAutoString(props.headings.length - 1)} repeat(1, 1fr)`
    : `${generateAutoString(props.headings.length - 1)} repeat(1, 1fr)`;

  if (!Utilities.isEmpty(props.customWidth)) {
    gridTemplateColumns = props.customWidth;
  }

  let headings = props.headings && props.headings.length ? props.headings : ['Empty'];

  return (
    <div className={styles.table} role="grid" style={{ gridTemplateColumns, ...props.style }}>
      <header className={styles.header} role="row">
        {props.isInteractive ? <div className={styles.cell} /> : null}
        {headings.map((each, index) => {
          return (
            <div className={styles.cell} key={`${each}-heading-${index}`}>
              {each}
            </div>
          );
        })}
      </header>
      {props.data && props.data.length ? (
        props.data.map((each, index) => {
          const value = props.value ? !!props.value.includes(`${each.id}`) : false;
          const backgroundColor = value ? `var(--theme-foreground)` : undefined;
          return (
            <div className={styles.row} key={`index-${each.id ? each.id : index}`} role="row">
              {props.isInteractive ? (
                <div className={styles.column} style={{ backgroundColor }}>
                  <Checkbox
                    checkboxStyle={{ marginLeft: 8, height: 16, width: 16 }}
                    name={each.id}
                    onChange={(e) => {
                      if (props.onChange) {
                        props.onChange({ [e.target.name]: e.target.value });
                      }
                    }}
                    value={value}
                  />
                </div>
              ) : null}
              {each.data.map((col, index) => {
                return (
                  <div className={styles.column} key={`${col}-data-${index}`} style={{ backgroundColor }}>
                    {col}
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div className={styles.row} role="row">
          {props.isInteractive ? <div className={styles.empty}></div> : null}
          <div className={styles.empty}>This table is empty</div>
        </div>
      )}
    </div>
  );
}
