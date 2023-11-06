import { useEffect, useState } from "react";
import {
  ABOUT,
  ABOUT_HEADING,
  CLOSE,
  CONTACT,
  CONTACT_HEADING,
  EMAIL,
  EMAIL_HEADING,
  ERROR_JOB_DESC,
  EXP_HEADING,
  HEADING_FILL_DETAILS,
  LABEL_ADD_EXP,
  LABEL_CONTACT,
  LABEL_CURR_EMP,
  LABEL_EMAIL,
  LABEL_END_DATE,
  LABEL_START_DATE,
  PLACEHOLDER_COMP_NAME,
  PLACEHOLDER_JOB_dESC,
  SAVE,
} from "./constants";
import styles from "./Details.module.css";
import WorkExpItem from "../WorkExpItem/WorkExpItem";
const Details = ({ isEdit }) => {
  const [aboutContent, setAboutContent] = useState(ABOUT);
  const [phone, setPhone] = useState(CONTACT);
  const [email, setEmail] = useState(EMAIL);

  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [expList, setExpList] = useState([]);
  const [compName, setCompName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrentEmp, setIsCurrentEmp] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const SubmitWorkExpForm = (e) => {
    e.preventDefault();
    const newWorkExp = {
      compName,
      startDate,
      endDate,
      isCurrentEmp,
      jobDescription,
    };

    setExpList([...expList, newWorkExp]);
  };

  return (
    <div className={styles.detailsSection}>
      <h1 className={styles.titleAbout}>{ABOUT_HEADING}</h1>
      {isEdit ? (
        <textarea
          onChange={(e) => {
            setAboutContent(e.target.value);
          }}
        >
          {aboutContent}
        </textarea>
      ) : (
        <p>{aboutContent}</p>
      )}
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
      <div className={styles.details}>
        <div>
          <h1>{EXP_HEADING}</h1>
          <div>
            <div className={styles.experienceContainer}>
              {expList &&
                expList.map((item,index) => (
                  <WorkExpItem isEdit={isEdit} data={item} index={index} />
                ))}
            </div>
            {!showExperienceForm && (
              <button
                className={styles.addExperience}
                onClick={(e) => {
                  setShowExperienceForm(true);
                }}
              >
                {LABEL_ADD_EXP}
              </button>
            )}
          </div>

          {showExperienceForm && (
            <div className={styles.showExperienceForm}>
              <form
                className={styles.workExpForm}
                onSubmit={(e) => SubmitWorkExpForm(e)}
              >
                <div className={styles.closeBtn}>
                  <button
                    onClick={(e) => {
                      setShowExperienceForm(false);
                    }}
                  >
                    {CLOSE}
                  </button>
                </div>
                <h3>{HEADING_FILL_DETAILS}</h3>
                <input
                  type="text"
                  pattern=".*\S+.*"
                  className={styles.companyName}
                  required
                  onChange={(e) => setCompName(e.target.value)}
                  placeholder={PLACEHOLDER_COMP_NAME}
                />
                <div className={styles.dateSection}>
                  <div className={styles.dateSectionLabels}>
                    <label>{LABEL_START_DATE}</label>
                    <label>{LABEL_END_DATE}</label>
                    <label></label>
                  </div>
                  <div className={styles.dateSectionValues}>
                    <input
                      type="date"
                      required
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                      type="date"
                      required
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <div className={styles.checkboxSection}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        onChange={(e) => setIsCurrentEmp(e.target.checked)}
                      />
                      <label className={styles.labelEmployer}>
                        {LABEL_CURR_EMP}
                      </label>
                    </div>
                  </div>
                </div>
                <textarea
                  className={styles.description}
                  required
                  placeholder={PLACEHOLDER_JOB_dESC}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
                <p className={styles.alertText}>{ERROR_JOB_DESC}</p>
                <button className={styles.saveBtn} type="submit">
                  <p>{SAVE}</p>
                  <div className={styles.loader}></div>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className={styles.skills}>
        <div>
          <h1>Skills</h1>

          <div className={styles.experienceContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Details;
