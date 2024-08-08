import styles from '@system/KeyHeader.module.scss';

import * as React from 'react';

import Cookies from 'js-cookie';

import { useModal } from '@system/providers/ModalContextProvider';

export default function KeyHeader(props) {
  const { showModal } = useModal();

  if (props.isHidden) {
    return <nav className={styles.root} />;
  }

  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <span
          className={styles.item}
          data-detector-ignore-navigation
          id="site-navigation-button"
          onClick={() => showModal({ name: 'NAVIGATION_TEMPLATE', parentId: 'site-navigation-button' })}
        >
          Menu
        </span>
      </section>

      <section className={styles.stretch}>
        <input
          autoComplete="off"
          className={styles.input}
          type="password"
          name="key"
          placeholder="« Use an API key to instantly authenticate »"
          value={props.value}
          onChange={(e) => {
            Cookies.remove('sitekey');
            props.onInputChange(e.target.value);
          }}
        />
      </section>
    </nav>
  );
}
