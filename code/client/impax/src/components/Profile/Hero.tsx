import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <img src="/assets/logos/Logo-Impax.svg" alt="" />
        <p>
          "The study examined 694 brains, and found that <strong>20.2% </strong>
          of former athletes had Lewy Body Disease."
        </p>
        <p> - The Tennessean</p>
      </div>
      <img
        className={styles.coverImg}
        src="/assets/images/cover-min.jpg"
        alt=""
      />
    </div>
  );
};

export default Hero;
