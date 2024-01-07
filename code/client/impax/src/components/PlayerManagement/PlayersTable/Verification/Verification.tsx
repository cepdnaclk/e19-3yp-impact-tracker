import React from "react";
import { FaBan, FaCheck, FaHourglass } from "react-icons/fa";
import styles from "./Verification.module.scss";
import { IconType } from "react-icons";

interface Props {
  status: "verified" | "pending" | "rejected";
}

export const Verification: React.FC<Props> = ({ status }) => {
  const statusClass: string = {
    verified: styles.verified,
    pending: styles.pending,
    rejected: styles.rejected,
  }[status];

  const Icon: IconType | keyof JSX.IntrinsicElements = {
    verified: FaCheck,
    pending: FaHourglass,
    rejected: FaBan,
  }[status];

  return (
    <div className={`${styles.container} ${statusClass}`}>
      <Icon className={styles.icon} />
      <span>{status}</span>
    </div>
  );
};
