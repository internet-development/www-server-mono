import * as React from 'react';

import { useModal } from '@system/providers/ModalContextProvider';

export default function GlobalModalManager(props) {
  const { modalContent, showModal } = useModal();

  let parentRect;
  if (modalContent && modalContent.parentId) {
    const parentElement = document.getElementById(modalContent.parentId);
    if (parentElement) {
      parentRect = parentElement.getBoundingClientRect();
    }
  }

  return null;
}
