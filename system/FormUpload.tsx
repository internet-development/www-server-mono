import styles from '@system/FormUpload.module.scss';

import React, { useState } from 'react';

import * as Utilities from '@common/utilities';

import ActionItem from '@system/documents/ActionItem';
import Loader from '@system/Loader';

function FormUpload(props) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.onSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.onSetFile(e.target.files[0]);
    }
  };

  if (props.isActionItem) {
    return (
      <ActionItem icon={props.loading ? <Loader style={{ height: 16, width: 16, borderRadius: 16 }} /> : `⊹`} htmlFor="template-form-upload-input">
        <input className={styles.input} id="template-form-upload-input" type="file" onChange={handleChange} />
        {props.children}
      </ActionItem>
    );
  }

  return (
    <div className={styles.root} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} style={props.style}>
      <input className={styles.input} id="template-form-upload-input" type="file" onChange={handleChange} />
      <label className={Utilities.classNames(styles.body, isDragOver ? styles.hover : null)} htmlFor="template-form-upload-input">
        {!props.loading ? `Upload a file from your machine` : <Loader />}
      </label>
    </div>
  );
}

export default FormUpload;
