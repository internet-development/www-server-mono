import { useEffect, useRef, useState } from 'react';

import styles from '@system/TextArea.module.scss';

function TextArea(props) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = 'auto'; // will not work without this!
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextArea();

    window.addEventListener('resize', resizeTextArea);
    return () => {
      window.removeEventListener('resize', resizeTextArea);
    };
  }, []);

  return (
    <textarea
      className={styles.textArea}
      ref={textAreaRef}
      {...props}
      onChange={(e) => {
        resizeTextArea();
        if (props.onChange) {
          props.onChange(e);
        }
      }}
    />
  );
}

export default TextArea;
