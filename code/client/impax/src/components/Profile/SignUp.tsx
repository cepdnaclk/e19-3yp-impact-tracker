import React from "react";
import styles from "./SignUp.module.scss";
const SignUp = () => {
  return (
    <main className={styles.main}>
      <div className={styles.content}></div>
      <div className={styles.hero}>
        <img
          className={styles.coverImg}
          src="../../src/assets/images/cover-min.jpg"
          alt=""
        />
      </div>
    </main>
  );
};

export default SignUp;
