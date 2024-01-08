import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogModal.module.scss";
import { FaTimes } from "react-icons/fa";

interface Props {
  trigger: JSX.Element;
  title: string;
  description: string;
  confirmButton?: JSX.Element;
  children?: JSX.Element | null;
}

const DialogModal: React.FC<Props> = ({
  trigger,
  title,
  description,
  confirmButton,
  children,
}) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content className={styles.DialogContent}>
        <Dialog.Title className={styles.DialogTitle}>{title}</Dialog.Title>
        <Dialog.Description className={styles.DialogDescription}>
          {description}
        </Dialog.Description>
        {children}
        <div className={styles.saveChanges}>
          <Dialog.Close asChild>{confirmButton}</Dialog.Close>
        </div>
        <Dialog.Close asChild className={styles.closeButtonContainer}>
          <button className={styles.iconButton} aria-label="Close">
            <FaTimes className={styles.icon} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogModal;
