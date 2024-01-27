import styles from "./ImpactSummarySkeleton.module.scss";
const ImpactSummarySkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonGrid}>
        {[0, 1, 2, 3].map(() => (
          <div className={styles.skeletonCard}>
            <h3></h3>
            <p className={styles.value}></p>
            <p className={styles.trend}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactSummarySkeleton;
