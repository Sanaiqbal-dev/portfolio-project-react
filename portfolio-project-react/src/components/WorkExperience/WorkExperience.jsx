import { useEffect, useState } from "react";
import {
  JOB_DESCRIPTION_ERROR,
  WORK_EXPERIENCE_HEADING,
  FILL_DETAILS_HEADING,
  ADD_EXPERIENCE_LABEL,
  COMPANY_NAME_PLACEHOLDER,
  JOB_DESCRIPTION_PLACEHOLDER,
  WORK_EXPERIENCE_ITEM_ADDED,
  WORK_EXPERIENCE_NOT_FOUND,
  INCORRECT_DATE_ALERT
} from "./constants";

import {
  CURRENT_EMPLOYER_LABEL,
  START_DATE_LABEL,
  END_DATE_LABEL,
  SAVE_TEXT,
  CLOSE_DELETE_TEXT,
} from "../../constants";

import WorkExpItem from "../WorkExperienceItem/WorkExperienceItem";
import styles from "./WorkExperience.module.css";
import moment from "moment";

const WorkExperience = ({ isEditModeEnabled }) => {
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [workExperienceList, setWorkExperienceList] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrentEmployer, setIsCurrentEmployer] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

   const [maxDateLimit, setMaxDateLimit] = useState(
     moment(new Date()).toISOString().split("T")[0]
   );
  const SubmitWorkExperienceForm = (e) => {
    e.preventDefault();
    if (!isCurrentEmployer && startDate > endDate) {
      alert({INCORRECT_DATE_ALERT});
    } else {
      const newWorkExperience = {
        companyName,
        startDate,
        endDate,
        isCurrentEmployer,
        jobDescription,
      };

      setWorkExperienceList([...workExperienceList, newWorkExperience]);
    }
    setShowExperienceForm(false);
    alert({WORK_EXPERIENCE_ITEM_ADDED});
  };

  const deleteExperienceItem = (recievedIndex) => {
    const newList = workExperienceList.filter(
      (item, index) => index !== recievedIndex
    );

    setWorkExperienceList(newList);
  };

  const updateExperienceItem = (
    itemIndex,
    companyName,
    startDate,
    endDate,
    isCurrentEmployer,
    jobDescription
  ) => {
    const updatedList = workExperienceList.map((item, index) => {
      if (index === itemIndex) {
        item.companyName = companyName;
        item.startDate = startDate;
        item.endDate = endDate;
        item.isCurrentEmployer = isCurrentEmployer;
        item.jobDescription = jobDescription;
      }
      return item;
    });

    setWorkExperienceList([...updatedList]);
  };

  useEffect(() => {
    setShowExperienceForm(false);
  }, [isEditModeEnabled]);

  return (
    <div className={styles.details}>
      <div>
        <h1>{WORK_EXPERIENCE_HEADING}</h1>
        <div className={styles.expSection}>
          {workExperienceList.length > 0 ? (
            <div className={styles.expListContainer}>
              {workExperienceList.map((item, index) => (
                <WorkExpItem
                  key={index}
                  isEditModeEnabled={isEditModeEnabled}
                  data={item}
                  index={index}
                  onDeleteWorkExperience={deleteExperienceItem}
                  onUpdateWorkExperience={updateExperienceItem}
                />
              ))}
            </div>
          ) : (
            <label>{WORK_EXPERIENCE_NOT_FOUND}</label>
          )}

          {isEditModeEnabled && !showExperienceForm && (
            <button
              className={styles.addExperience}
              onClick={(e) => {
                setShowExperienceForm(true);
              }}
            >
              {ADD_EXPERIENCE_LABEL}
            </button>
          )}
        </div>

        {isEditModeEnabled && showExperienceForm && (
          <div className={styles.showExperienceForm}>
            <form
              className={styles.workExpForm}
              onSubmit={(e) => SubmitWorkExperienceForm(e)}
            >
              <div className={styles.closeBtn}>
                <button
                  onClick={(e) => {
                    setShowExperienceForm(false);
                  }}
                >
                  {CLOSE_DELETE_TEXT}
                </button>
              </div>
              <h3>{FILL_DETAILS_HEADING}</h3>
              <input
                type="text"
                pattern=".*\S+.*"
                className={styles.companyName}
                required
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={COMPANY_NAME_PLACEHOLDER}
              />
              <div className={styles.dateSection}>
                <div className={styles.dateSectionLabels}>
                  <label>{START_DATE_LABEL}</label>
                  <label>{END_DATE_LABEL}</label>
                  <label></label>
                </div>
                <div className={styles.dateSectionValues}>
                  <input
                    type="date"
                    required
                    max={maxDateLimit}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="date"
                    required
                    disabled={isCurrentEmployer}
                    max={maxDateLimit}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <div className={styles.checkboxSection}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onChange={(e) => {
                        setIsCurrentEmployer(e.target.checked);
                        setEndDate("");
                      }}
                    />
                    <label className={styles.labelEmployer}>
                      {CURRENT_EMPLOYER_LABEL}
                    </label>
                  </div>
                </div>
              </div>
              <textarea
                className={styles.description}
                required
                placeholder={JOB_DESCRIPTION_PLACEHOLDER}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
              <p className={styles.alertText}>{JOB_DESCRIPTION_ERROR}</p>
              <button className={styles.saveBtn} type="submit">
                <p>{SAVE_TEXT}</p>
                <div className={styles.loader}></div>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkExperience;
