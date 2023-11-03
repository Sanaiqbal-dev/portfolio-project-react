import {
  ABOUT,
  ABOUT_HEADING,
  CONTACT,
  CONTACT_HEADING,
  EMAIL,
  EMAIL_HEADING,
  EXP_HEADING,
} from "./constants";
import styles from "./Details.module.css";
const Details = () => {
  return (
    <div className={styles.detailsSection}>
      <h1 className={styles.titleAbout}>{ABOUT_HEADING}</h1>
      <p>{ABOUT}</p>
      <hr />
      <h3 className={styles.inlineDiv}>{CONTACT_HEADING}</h3>
      <p className={styles.inlineDiv}>{CONTACT}</p>
      <br />
      <h3 className={styles.inlineDiv}>{EMAIL_HEADING}</h3>
      <p className={styles.inlineDiv}>{EMAIL}</p>
      <div className={styles.details}>
        <div>
          <h1>{EXP_HEADING}</h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
