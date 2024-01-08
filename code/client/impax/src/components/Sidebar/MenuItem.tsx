import React from "react";
import styles from "./MenuItem.module.scss";

interface MenuItemProps {
  icon: React.ElementType;
  name: string;
  active?: boolean;
  onClick: () => void;
}
const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  name,
  active = false,
  onClick,
}) => {
  const menuItemClasses = active
    ? `${styles.menuItem} ${styles.active}`
    : styles.menuItem;

  return (
    <li
      tabIndex={0}
      className={menuItemClasses}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      onClick={onClick}
    >
      <Icon className={styles.icon} />
      <div className={styles.name}>{name}</div>
    </li>
  );
};

export default MenuItem;
