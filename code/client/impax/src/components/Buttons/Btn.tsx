import React from "react";
import styles from "./Btn.module.scss";

interface BtnProps {
  Icon: React.ElementType;
  buttonType?: "primary" | "secondary";
  onClick?: () => void;
  bgColor?: string;
  children: string | JSX.Element;
}

const Btn: React.FC<BtnProps> = ({
  Icon,
  buttonType = "primary",
  onClick = () => {},
  bgColor = buttonType == "primary" ? "rgb(14, 61, 127)" : "#313131",
  children,
}) => {
  const btnClass =
    buttonType == "primary" ? styles.primaryBtn : styles.secondaryBtn;

  return (
    <button
      onClick={onClick}
      className={btnClass}
      style={{ backgroundColor: bgColor }}
    >
      <Icon className={styles.icon} />
      {children}
    </button>
  );
};

export default Btn;
