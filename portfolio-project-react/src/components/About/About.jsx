import React, { useState } from "react";

import {ABOUT, ABOUT_HEADING, CONTACT, CONTACT_HEADING, EMAIL, EMAIL_HEADING, LABEL_CONTACT, LABEL_EMAIL} from "./constants"
import styles from "./About.module.css";

const About = ({ isEdit, totalExp }) => {
  const [aboutContent, setAboutContent] = useState(ABOUT);
  const [phone, setPhone] = useState(CONTACT);
  const [email, setEmail] = useState(EMAIL);

  return (
    <div>
      <div className={styles.aboutHeader}>
        <h1 className={styles.titleAbout}>{ABOUT_HEADING}</h1>
        <label>Total Experience: {totalExp[0]} years {totalExp[1] >0 && totalExp[1] } months</label>
      </div>
      {isEdit ? (
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
      {isEdit ? (
        <input
          placeholder={LABEL_CONTACT}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <p className={styles.inlineDiv}>{phone}</p>
      )}

      <br />
      <h3 className={styles.inlineDiv}>{EMAIL_HEADING}</h3>
      {isEdit ? (
        <input
          placeholder={LABEL_EMAIL}
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
