import React from "react";
import styles from "./Title.module.scss";

const Title: React.FC<{ title: string; Icon: React.ElementType }> = ({
  title,
  Icon,
}) => {
  return (
    <div className={styles.title}>
      <Icon className={styles.icon} />

      <h1>{title}</h1>
    </div>
  );
};

export default Title;
