import { useContext, useEffect, useState } from "react";
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

  const [aboutContent, setAboutContent] = useState(
    localStorage.getItem("about") ? localStorage.getItem("about") : ABOUT_DATA
  );

  const [phone, setPhone] = useState(
    localStorage.getItem("phone") ? localStorage.getItem("phone") : CONTACT_DATA
  );

  const [email, setEmail] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : EMAIL_DATA
  );

  const totalExperienceContent =
    totalWorkExperience.years === 0 && totalWorkExperience.months === 0
      ? "NO PAST EXPERIENCE"
      : totalWorkExperience.years === 0
      ? `Total Experience: ` + totalWorkExperience.months + ` months`
      : totalWorkExperience.months === 0
      ? `Total Experience: ` + totalWorkExperience.years + ` years`
      : `Total Experience: ` +
        totalWorkExperience.years +
        ` years ` +
        totalWorkExperience.months +
        ` months`;
  const validateInput = (e) => {
    const key = e.key;

    const isValidInput = /[\d\s]|Backspace|ArrowLeft|ArrowRight|Delete/i.test(
      key
    );

    if (!isValidInput) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    localStorage.setItem("about", aboutContent);
  }, [aboutContent]);

  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  return (
    <div>
      <div className={styles.aboutHeader}>
        <h1 className={styles.titleAbout}>{ABOUT_HEADING}</h1>
        <label className={styles.totalExperienceContent}>{totalExperienceContent}</label>
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
          type="tel"
          onKeyDown={(e) => {
            validateInput(e);
          }}
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
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <p className={styles.inlineDiv}>{email}</p>
      )}
    </div>
  );
};

export default About;
