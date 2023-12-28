import React from "react";
import styles from "./Btn.module.scss";

interface BtnProps {
  Icon: React.ElementType;
  buttonStyle?: "primary" | "secondary";
  onClick?: () => void;
  bgColor?: string;
  type?: "button" | "submit" | "reset";
  children: string | JSX.Element;
}

const Btn: React.FC<BtnProps> = ({
  Icon,
  buttonStyle = "primary",
  onClick = () => {},
  bgColor = buttonStyle == "primary" ? "rgb(14, 61, 127)" : "#313131",
  type = "button",
  children,
}) => {
  const btnClass =
    buttonStyle == "primary" ? styles.primaryBtn : styles.secondaryBtn;

  return (
    <button
      onClick={onClick}
      className={btnClass}
      style={{ backgroundColor: bgColor }}
      type={type}
    >
      <Icon className={styles.icon} />
      {children}
    </button>
  );
};

export default Btn;
