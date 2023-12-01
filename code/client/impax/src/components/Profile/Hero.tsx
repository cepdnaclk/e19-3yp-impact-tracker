import styles from "./Hero.module.scss";
import React from "react";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <img src="../../src/assets/logos/Logo-Impax.svg" alt="" />
        <p>
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, dolor"
        </p>
        <p> - University of Lorem, 2022</p>
      </div>
      <img
        className={styles.coverImg}
        src="../../src/assets/images/cover-min.jpg"
        alt=""
      />
    </div>
  );
};

export default Hero;
