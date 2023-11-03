import { ABOUT, CONTACT, EMAIL } from "./constants";
import styles from "./Details.module.css";
const Details = () => {
  return (
    <div className={styles.detailsSection}>
      <h1 className={styles.titleAbout}>About</h1>
      <p>{ABOUT}</p>

      <hr />

      <h3 className={styles.inlineDiv}>Contact:</h3>
      <p className={styles.inlineDiv}>{CONTACT}</p>
      <br />
      <h3 className={styles.inlineDiv}>Email:</h3>
      <p className={styles.inlineDiv}>{EMAIL}</p>
      <div className={styles.details}>
        <div>
          <h1>Work Experience</h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
