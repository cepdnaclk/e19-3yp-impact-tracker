import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "./AlertModal.module.scss";
interface Props {
  trigger: JSX.Element;
  title: string;
  description: string;
  cancel: JSX.Element;
  action: JSX.Element;
  forceAction?: boolean;
}
const AlertModal: React.FC<Props> = ({
  trigger,
  title,
  description,
  cancel,
  action,
  forceAction = false,
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.AlertDialogDescription}>
            {description}
          </AlertDialog.Description>
          <div
            className={`${styles.alertButtonsContainer} ${
              forceAction && styles.forceAction
            }`}
          >
            <AlertDialog.Cancel asChild>{cancel}</AlertDialog.Cancel>
            <AlertDialog.Action asChild>{action}</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AlertModal;
