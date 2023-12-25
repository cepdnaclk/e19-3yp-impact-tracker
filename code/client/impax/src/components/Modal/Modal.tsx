import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

interface Props {
  children: string | JSX.Element | JSX.Element[];
  isOpen: Boolean;
  onClose: () => void;
}
const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
