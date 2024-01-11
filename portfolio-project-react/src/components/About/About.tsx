import React, { useContext, useEffect, useState, FC } from "react";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import {
  ABOUT_HEADING,
  CONTACT_HEADING,
  EMAIL_HEADING,
  CONTACT_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  NO_PAST_EXPERIENCE,
  TOTAL_EXPERIENCE,
  MONTH,
  YEAR,
  FETCH_FAILED,
  UPDATE_FAILED,
  ERROR_EMPTY_FIELDS,
  EXTRA_SPACE,
} from "./constants.tsx";
import styles from "./About.module.css";
import {totalWorkExperience} from "../../interface.tsx";
import { BASE_URL, EMPTY_STRING } from "../../constants.tsx";



interface AboutComponentProps {
  totalWorkExperience: totalWorkExperience;
}
interface AboutData{
  id:string,
  about:string,
  contact:string,
  email:string
}
const About: FC<AboutComponentProps> = ({ totalWorkExperience }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const [aboutSectionData, setAboutSectionData] = useState<AboutData>({
    id: EMPTY_STRING,
    about: EMPTY_STRING,
    contact: EMPTY_STRING,
    email: EMPTY_STRING,
  });

  const [isContentUpdated, setIsContentUpdated] = useState<Boolean>(false);

  const totalExperienceContent:String =
    totalWorkExperience.years === 0 && totalWorkExperience.months === 0
      ? NO_PAST_EXPERIENCE
      : totalWorkExperience.years === 0
      ? TOTAL_EXPERIENCE + totalWorkExperience.months + EXTRA_SPACE+MONTH
      : totalWorkExperience.months === 0
      ? TOTAL_EXPERIENCE + totalWorkExperience.years + EXTRA_SPACE+YEAR
      : TOTAL_EXPERIENCE +
        totalWorkExperience.years +
        EXTRA_SPACE + YEAR + EXTRA_SPACE +
        totalWorkExperience.months +
        EXTRA_SPACE + MONTH;
  const validateInput = (e:KeyboardEvent) => {
    const key = e.key;

    const isValidInput:Boolean = /[\d\s]|Backspace|ArrowLeft|ArrowRight|Delete/i.test(
      key
    );

    if (!isValidInput) {
      e.preventDefault();
    }
  };

  const updateAboutContent = async () => {
    await fetch(
      `${BASE_URL}AboutContent/${aboutSectionData.id}`,
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
        alert(UPDATE_FAILED+ error.message);
      });
  };

  const fetchAboutContent = async () => {
    await fetch(`${BASE_URL}AboutContent`, {
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
        alert(FETCH_FAILED + error.message);
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
      } else {
        setAboutSectionData({
          id: EMPTY_STRING,
          about: EMPTY_STRING,
          contact: EMPTY_STRING,
          email: EMPTY_STRING,
        });
        fetchAboutContent();
        alert(ERROR_EMPTY_FIELDS);
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
