import styles from '@system/Footer.module.scss';

import * as React from 'react';

import Button from '@system/Button';
import Input from '@system/Input';

import { H2, P } from '@system/typography';

export default function Footer(props) {
  return (
    <footer className={styles.root} style={props.style}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.form}>
            <H2>Template</H2>
            <P style={{ marginTop: `1rem` }}>
              This Template provides you with a starting point for your website, allowing you to focus on making the design you love instead. Join our mailing list!
            </P>
            <Input style={{ marginTop: `2rem` }} placeholder="someone@msn.com" />
            <Button
              style={{ marginTop: `1rem` }}
              onClick={() => {
                alert('TODO: implement onSubmit');
              }}
            >
              Submit
            </Button>
          </div>
        </div>
        <div className={styles.subColumn}>
          <div className={styles.subTitle}>System</div>
          <a href="/examples/system/colors" className={styles.item}>
            Colors
          </a>
          <a href="/examples/system/typography" className={styles.item}>
            Typography
          </a>
          <a href="/examples/system/data-visualization" className={styles.item}>
            Data visualization
          </a>
          <a href="#" className={styles.item}>
            [WIP] Brand guidelines
          </a>
        </div>
        <div className={styles.subColumn}>
          <div className={styles.subTitle}>Components</div>
          <a href="/examples/components/forms" className={styles.item}>
            Forms
          </a>
          <a href="/examples/components/table" className={styles.item}>
            Tables
          </a>
          <a href="/examples/components/full-section" className={styles.item}>
            Marketing
          </a>
          <a href="/examples/components/product-marketing" className={styles.item}>
            Simple marketing
          </a>
        </div>
        <div className={styles.subColumn}>
          <div className={styles.subTitle}>API Demos</div>
          <a href="/examples/features/services" className={styles.item}>
            Services
          </a>
          <a href="/examples/features/threads" className={styles.item}>
            Threads
          </a>
          <a href="/examples/features/stocks/fixed-watchlist" className={styles.item}>
            Stock portfolio
          </a>
          <a href="/examples/features/settings" className={styles.item}>
            User settings
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <a href="https://txt.dev/wwwjim/intdev-privacy-policy" className={styles.subItem} target="_blank">
            Privacy Policy
          </a>
          <a href="https://txt.dev/wwwjim/intdev-terms-of-service" className={styles.subItem} target="_blank">
            Terms of Service
          </a>
        </div>
        <div className={styles.right}>
          <a href="https://bsky.app/profile/internetstudio.bsky.social" className={styles.subItem} target="_blank">
            Bluesky
          </a>
          <a href="https://github.com/internet-development/nextjs-sass-starter" className={styles.subItem} target="_blank">
            GitHub
          </a>
          <a href="https://read.cv/teams/intdev" className={styles.subItem} target="_blank">
            ReadCV
          </a>
          <a href="https://internet.dev" className={styles.subItem} target="_blank">
            INTDEV
          </a>
          <a href="https://x.com/internetxstudio" className={styles.subItem} target="_blank">
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
