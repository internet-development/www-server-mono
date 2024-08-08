import styles from '@system/forms/FormChangePassword.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Button from '@system/Button';
import Input from '@system/Input';

import { FormHeading, FormSubHeading, FormParagraph, InputLabel } from '@system/typography/forms';

function FormChangePassword(props) {
  const [password, setPassword] = React.useState<string>('');
  const [confirm, setConfirm] = React.useState<string>('');

  let disabled = false;
  if (Utilities.isEmpty(password)) {
    disabled = true;
  }

  if (Utilities.isEmpty(confirm)) {
    disabled = true;
  }

  if (password !== confirm) {
    disabled = true;
  }

  if (password && password.length < 4) {
    disabled = true;
  }

  return (
    <div className={styles.root} style={props.style}>
      <FormHeading>Change password</FormHeading>
      <FormParagraph>Change your password for your account.</FormParagraph>

      <InputLabel style={{ marginTop: 48 }}>New password</InputLabel>
      <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" style={{ marginTop: 8 }} />
      <InputLabel style={{ marginTop: 24 }}>Confirm password</InputLabel>
      <Input onChange={(e) => setConfirm(e.target.value)} value={confirm} type="password" style={{ marginTop: 8 }} />

      <Button onClick={() => props.onSubmit({ password })} visual={disabled} style={{ marginTop: 24 }}>
        Change
      </Button>
    </div>
  );
}

export default FormChangePassword;
