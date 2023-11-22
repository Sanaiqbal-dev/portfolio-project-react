import { useContext, useState } from "react";
import { IsEditModeEnabled } from "../../EditModeContext";
import {
  ABOUT_DATA,
  ABOUT_HEADING,
  CONTACT_DATA,
  CONTACT_HEADING,
  EMAIL_DATA,
  EMAIL_HEADING,
  CONTACT_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
} from "./constants";
import styles from "./About.module.css";

const About = ({ totalWorkExperience }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const [aboutContent, setAboutContent] = useState(ABOUT_DATA);
  const [phone, setPhone] = useState(CONTACT_DATA);
  const [email, setEmail] = useState(EMAIL_DATA);

  return (
    <div>
      <div className={styles.aboutHeader}>
        <h1 className={styles.titleAbout}>{ABOUT_HEADING}</h1>
        <label>
          Total Experience: {totalWorkExperience[0]} years{" "}
          {totalWorkExperience[1] > 0 ? totalWorkExperience[1] : 0} months
        </label>
      </div>
      {isEditModeEnabled ? (
        <textarea
          className={styles.aboutTextArea}
          value={aboutContent}
          onChange={(e) => {
            setAboutContent(e.target.value);
          }}
        />
      ) : (
        <p className={styles.aboutContent}>{aboutContent}</p>
      )}

      <br />
      <h3 className={styles.inlineDiv}>{CONTACT_HEADING}</h3>
      {isEditModeEnabled ? (
        <input
          placeholder={CONTACT_PLACEHOLDER}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <p className={styles.inlineDiv}>{phone}</p>
      )}

      <br />
      <h3 className={styles.inlineDiv}>{EMAIL_HEADING}</h3>
      {isEditModeEnabled ? (
        <input
          placeholder={EMAIL_PLACEHOLDER}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <p className={styles.inlineDiv}>{email}</p>
      )}
    </div>
  );
};

export default About;
