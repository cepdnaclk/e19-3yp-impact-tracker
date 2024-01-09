import React from "react";
import styles from "./Btn.module.scss";

interface BtnProps {
  Icon: React.ElementType;
  buttonStyle?: "primary" | "secondary";
  onClick?: (e?: React.SyntheticEvent) => void;
  bgColor?: string;
  type?: "button" | "submit" | "reset";
  iconSizeEm?: number;
  disabled?: boolean;
  children: string | JSX.Element;
}

type Ref = HTMLButtonElement;
const Btn = React.forwardRef<Ref, BtnProps>(
  (
    {
      Icon,
      buttonStyle = "primary",
      onClick = () => {},
      bgColor = buttonStyle == "primary" ? "rgb(14, 61, 127)" : "#313131",
      type = "button",
      iconSizeEm = 1.4,
      disabled = false,
      children,
    },
    ref
  ) => {
    const btnClass =
      buttonStyle == "primary" ? styles.primaryBtn : styles.secondaryBtn;

    return (
      <button
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        className={btnClass}
        style={{ backgroundColor: bgColor }}
        type={type}
      >
        <Icon className={styles.icon} style={{ fontSize: `${iconSizeEm}em` }} />
        {children}
      </button>
    );
  }
);

export default Btn;
