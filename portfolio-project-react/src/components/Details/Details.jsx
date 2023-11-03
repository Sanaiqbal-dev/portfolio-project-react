import {
  ABOUT,
  ABOUTHEADING,
  CONTACT,
  CONTACTHEADING,
  EMAIL,
  EMAILHEADING,
  EXPHEADING,
} from "./constants";
import styles from "./Details.module.css";
const Details = () => {
  return (
    <div className={styles.detailsSection}>
      <h1 className={styles.titleAbout}>{ABOUTHEADING}</h1>
      <p>{ABOUT}</p>
      <hr />
      <h3 className={styles.inlineDiv}>{CONTACTHEADING}</h3>
      <p className={styles.inlineDiv}>{CONTACT}</p>
      <br />
      <h3 className={styles.inlineDiv}>{EMAILHEADING}</h3>
      <p className={styles.inlineDiv}>{EMAIL}</p>
      <div className={styles.details}>
        <div>
          <h1>{EXPHEADING}</h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
