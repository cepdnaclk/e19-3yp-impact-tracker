import React from "react";
import styles from "./MenuItem.module.scss";

interface MenuItemProps {
  icon: React.ElementType;
  name: string;
  active?: boolean;
}
const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  name,
  active = false,
}) => {
  const menuItemClasses = active
    ? `${styles.menuItem} ${styles.active}`
    : styles.menuItem;

  return (
    <li className={menuItemClasses}>
      <Icon className={styles.icon} />
      <div className={styles.name}>{name}</div>
    </li>
  );
};

export default MenuItem;
