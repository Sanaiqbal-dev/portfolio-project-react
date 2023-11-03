import { JOBTITLE, NAME } from "./constants";
import styles from "./Picture.module.css";

const Picture = ({ url, size }) => {
  return (
    <div className={styles.pictureSection}>
      <div className={styles.imageContainer}>
        <img src={url} style={{ width: size, height: size }} />
      </div>
      <h2 className={styles.name}>{NAME}</h2>
      <h3 className={styles.jobTitle}>{JOBTITLE}</h3>
    </div>
  );
};

export default Picture;
