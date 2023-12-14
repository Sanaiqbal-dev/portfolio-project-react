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

  const [aboutSectionData, setAboutSectionData] = useState({
    id: "",
    about: "",
    contact: "",
    email: "",
  });

  const [isContentUpdated, setIsContentUpdated] = useState(false);

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

  const updateAboutContent = async () => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/AboutContent/${aboutSectionData.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          about: aboutSectionData.about,
          contact: aboutSectionData.contact,
          email: aboutSectionData.email,
        }),
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
    await fetch(`http://localhost:3000/api/portfolio/experience/AboutContent`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((jsonData) => {
        setAboutSectionData({
          id: jsonData[0]._id,
          about: jsonData[0].about,
          contact: jsonData[0].contact,
          email: jsonData[0].email,
        });
      })
      .catch((error) => {
        alert(`Failed to fetch about section data : ${error.message}`);
      });
  };

  useEffect(() => {
    if (!isEditModeEnabled && isContentUpdated) {
      if (
        aboutSectionData.about &&
        aboutSectionData.contact &&
        aboutSectionData.email
      ) {
        updateAboutContent();
      }
      else{
        setAboutSectionData({
          id: "",
          about: "",
          contact: "",
          email: "",
        });
        fetchAboutContent();
        alert("Cannot update About section data with empty fields.");
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
        <label className={styles.totalExperienceContent}>
          {totalExperienceContent}
        </label>
      </div>
      {isEditModeEnabled ? (
        <textarea
          className={styles.aboutTextArea}
          value={aboutSectionData.about}
          onChange={(e) => {
            setAboutSectionData({ ...aboutSectionData, about: e.target.value });
            setIsContentUpdated(true);
          }}
        />
      ) : (
        <p className={styles.aboutContent}>{aboutSectionData.about}</p>
      )}

      <br />
      <h3 className={styles.inlineDiv}>{CONTACT_HEADING}</h3>
      {isEditModeEnabled ? (
        <input
          placeholder={CONTACT_PLACEHOLDER}
          value={aboutSectionData.contact}
          type="tel"
          onKeyDown={(e) => {
            validateInput(e);
          }}
          onChange={(e) => {
            setAboutSectionData({
              ...aboutSectionData,
              contact: e.target.value,
            });

            setIsContentUpdated(true);
          }}
        />
      ) : (
        <p className={styles.inlineDiv}>{aboutSectionData.contact}</p>
      )}

      <br />
      <h3 className={styles.inlineDiv}>{EMAIL_HEADING}</h3>
      {isEditModeEnabled ? (
        <input
          placeholder={EMAIL_PLACEHOLDER}
          value={aboutSectionData.email}
          type="email"
          onChange={(e) => {
            setAboutSectionData({
              ...aboutSectionData,
              email: e.target.value,
            });

            setIsContentUpdated(true);
          }}
        />
      ) : (
        <p className={styles.inlineDiv}>{aboutSectionData.email}</p>
      )}
    </div>
  );
};

export default About;
