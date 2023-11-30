import React from "react";
import styles from "./Btn.module.scss";

interface BtnProps {
  Icon: React.ElementType;
  buttonType?: "primary" | "secondary";
  onClick?: () => void;
  children: string | JSX.Element;
}

const Btn: React.FC<BtnProps> = ({
  Icon,
  buttonType = "primary",
  onClick = () => {},
  children,
}) => {
  const btnClass =
    buttonType == "primary" ? styles.primaryBtn : styles.secondaryBtn;

  return (
    <button onClick={onClick} className={btnClass}>
      <Icon className={styles.icon} />
      {children}
    </button>
  );
};

export default Btn;
