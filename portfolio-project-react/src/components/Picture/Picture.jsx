import { JOB_TITLE, NAME } from "./constants";
import styles from "./Picture.module.css";

const Picture = (props) => {

  const { url, size } = props;
  return (
    <div className={styles.pictureSection}>
      <div className={styles.imageContainer}>
        <img src={url} style={{ width: size, height: size }} />
      </div>
      <h2 className={styles.name}>{NAME}</h2>
      <h3 className={styles.jobTitle}>{JOB_TITLE}</h3>
    </div>
  );
};

export default Picture;
