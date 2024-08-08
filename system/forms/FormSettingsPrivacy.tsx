import styles from '@system/forms/FormSettingsPrivacy.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Button from '@system/Button';
import Checkbox from '@system/Checkbox';

import { FormHeading, FormSubHeading, FormParagraph, InputLabel } from '@system/typography/forms';

function FormSettingsPrivacy(props) {
  return (
    <div className={styles.root} style={props.style}>
      <FormHeading style={{ paddingTop: 8 }}>Privacy</FormHeading>
      <FormParagraph>
        When your account is public, your profile, TXT.DEV posts, and third-party application content can be viewed by anyone, regardless of whether they have an API account. You
        can modify some of these settings below. Our services do not track your IP address and do not use your IP address to determine your personal information.
      </FormParagraph>
      <Button href="#" style={{ marginTop: 24 }}>
        Restore defaults
      </Button>
      <div className={styles.divider} />

      <FormSubHeading style={{ paddingTop: 8 }}>E-mail</FormSubHeading>
      <FormParagraph>Configure your e-mail privacy settings</FormParagraph>
      <Checkbox name="checked" style={{ marginTop: 16 }}>
        Your e-mail address is <strong>public</strong>. To toggle e-mail privacy, uncheck this box, otherwise others will be able to see your e-mail "team@internet.dev".
      </Checkbox>
      <div className={styles.divider} />
      <FormSubHeading style={{ paddingTop: 8 }}>Personal</FormSubHeading>
      <FormParagraph>Configure how much personal information you wish to share</FormParagraph>
      <Checkbox name="checked" style={{ marginTop: 16 }}>
        Your location is <strong>public</strong>. To toggle location privacy, uncheck this box.
      </Checkbox>
      <Checkbox name="checked" style={{ marginTop: 16 }}>
        Your age is <strong>public</strong>. To toggle age privacy, uncheck this box.
      </Checkbox>
      <Checkbox name="checked" style={{ marginTop: 16 }}>
        Your birthdate is <strong>public</strong>. To toggle birthdate privacy, uncheck this box.
      </Checkbox>
      <div className={styles.divider} />
      <FormSubHeading style={{ paddingTop: 8 }}>Activity</FormSubHeading>
      <FormParagraph>Configure how much activity you wish to share</FormParagraph>
      <Checkbox name="checked" style={{ marginTop: 16 }}>
        Your profile activity is <strong>public</strong>. To toggle the visibility of your activity, uncheck this box.
      </Checkbox>
      <Button href="#" style={{ marginTop: 24 }}>
        Delete activity history
      </Button>
      <div className={styles.divider} />
      <FormSubHeading style={{ paddingTop: 8 }}>Content</FormSubHeading>
      <FormParagraph>Configure your content settings here</FormParagraph>
      <Checkbox name="checked" style={{ marginTop: 16 }}>
        Your content is <strong>public</strong> and accessible to everyone by default. To make your content private by default, uncheck this box. This will prevent others from
        viewing your content unless you choose to make it public.
      </Checkbox>
      <Checkbox name="checked" style={{ marginTop: 16 }}>
        Allow your content to be used to train our models, which makes our API better for you and everyone who uses it.
      </Checkbox>
      <Button href="#" style={{ marginTop: 24 }}>
        Delete all content
      </Button>
    </div>
  );
}

export default FormSettingsPrivacy;
