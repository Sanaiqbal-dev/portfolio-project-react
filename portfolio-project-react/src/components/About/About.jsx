import { useContext, useEffect, useState } from "react";
import { IsEditModeEnabled } from "../../EditModeContext";
import {
  ABOUT_HEADING,
  CONTACT_HEADING,
  EMAIL_HEADING,
  CONTACT_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
} from "./constants";
import styles from "./About.module.css";

const About = ({ totalWorkExperience }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const [id, setId] = useState("");

  const [aboutContent, setAboutContent] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [isContentUpdated, setIsContentUpdated] = useState(false);

  const validateInput = (e) => {
    const key = e.key;

    const isValidInput = /[\d\s]|Backspace|ArrowLeft|ArrowRight|Delete/i.test(
      key
    );

    if (!isValidInput) {
      e.preventDefault();
    }
  };

  const updateAboutContent = async (id, aboutSectionData) => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/updateAboutContent/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(aboutSectionData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setIsContentUpdated(false);
      })
      .catch((error) => {
        alert(`Failed to updated about section data : ${error.message}`);
      });
  };

  const fetchAboutContent = async () => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/getAboutContent`
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setId(jsonData[0]._id);
        setAboutContent(jsonData[0].about);
        setPhone(jsonData[0].contact);
        setEmail(jsonData[0].email);
      })
      .catch((error) => {
        alert(`Failed to fetch about section data : ${error.message}`);
      });
  };

  useEffect(() => {
    if (!isEditModeEnabled && isContentUpdated) {
      if (aboutContent && phone && email) {
        updateAboutContent(id, {
          about: aboutContent,
          contact: phone,
          email: email,
        });
      }
    }
  }, [isEditModeEnabled]);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  return (
    <div>
      <div className={styles.aboutHeader}>
        <h1 className={styles.titleAbout}>{ABOUT_HEADING}</h1>
        <label>
          Total Experience: {totalWorkExperience.years} years{" "}
          {totalWorkExperience.months > 0 ? totalWorkExperience.months : 0}{" "}
          months
        </label>
      </div>
      {isEditModeEnabled ? (
        <textarea
          className={styles.aboutTextArea}
          value={aboutContent}
          onChange={(e) => {
            setAboutContent(e.target.value);
            setIsContentUpdated(true);
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
          onChange={(e) => {
            setPhone(e.target.value);
            setIsContentUpdated(true);
          }}
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
          onChange={(e) => {
            setEmail(e.target.value);
            setIsContentUpdated(true);
          }}
        />
      ) : (
        <p className={styles.inlineDiv}>{email}</p>
      )}
    </div>
  );
};

export default About;
