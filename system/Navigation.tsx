import styles from '@system/Navigation.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import { useModal } from '@system/providers/ModalContextProvider';

export default function Navigation() {
  const { showModal } = useModal();

  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <a href="/" className={styles.item}>
          Template
        </a>
      </section>
      <section className={styles.stretch}>
        <span className={styles.item} onClick={() => Utilities.onHandleThemeChange()}>
          Theme
        </span>
        <a className={styles.item} href="/examples/features/settings">
          Settings
        </a>
        <a className={styles.item} href="/examples/features/services">
          Services
        </a>
        <a className={styles.item} href="/examples/features/files-s3">
          Files
        </a>
        <span className={styles.item} onClick={() => showModal({ name: 'AUTHENTICATION' })}>
          Sign in
        </span>
      </section>
      <section className={styles.right}>
        <span
          className={styles.item}
          id="site-navigation-button"
          onClick={() => showModal({ name: 'NAVIGATION_V2', parentId: 'site-navigation-button' })}
          data-detector-ignore-navigation
        >
          Navigation
        </span>
      </section>
    </nav>
  );
}
