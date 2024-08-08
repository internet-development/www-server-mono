'use client';

import * as React from 'react';

interface ModalContent {
  data?: any;
  name?: string;
  message?: string;
  parentId?: string;
}

interface ModalContextType {
  modalContent: ModalContent | null;
  showModal: (nextContent: ModalContent | null) => void;
}

const initialModalContext: ModalContextType = {
  modalContent: null,
  showModal: () => {},
};

export const ModalContext = React.createContext(initialModalContext);

export function useModal() {
  const { modalContent, showModal } = React.useContext(ModalContext);
  return { modalContent, showModal };
}
