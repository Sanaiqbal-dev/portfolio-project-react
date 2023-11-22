import { useEffect, useState, useContext } from "react";
import moment from "moment";
import WorkExperienceItem from "../WorkExperienceItem/WorkExperienceItem";
import { IsEditModeEnabled } from "../../EditMode";
import {
  JOB_DESCRIPTION_ERROR,
  WORK_EXPERIENCE_HEADING,
  FILL_DETAILS_HEADING,
  ADD_EXPERIENCE_LABEL,
  COMPANY_NAME_PLACEHOLDER,
  JOB_DESCRIPTION_PLACEHOLDER,
  WORK_EXPERIENCE_ITEM_ADDED,
  WORK_EXPERIENCE_NOT_FOUND,
} from "./constants";
import {
  CURRENT_EMPLOYER_LABEL,
  START_DATE_LABEL,
  END_DATE_LABEL,
  SAVE_TEXT,
  CLOSE_DELETE_TEXT,
  INCORRECT_DATE_ALERT,
} from "../../constants";

import styles from "./WorkExperience.module.css";

const WorkExperience = ({ onUpdateTotalExperience }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const [isExperienceFormVisible, setIsExperienceFormVisible] = useState(false);

  let locallyStoredData = localStorage.getItem("work-experience-list")
    ? JSON.parse(localStorage.getItem("work-experience-list"))
    : [];

  const [workExperienceList, setWorkExperienceList] = useState(locallyStoredData);
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrentEmployer, setIsCurrentEmployer] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const maxDateLimit = moment(new Date()).toISOString().split("T")[0];

  const submitWorkExperienceForm = (e) => {
    e.preventDefault();
    if (!isCurrentEmployer && startDate > endDate) {
      alert(INCORRECT_DATE_ALERT);
    } else {
      const newWorkExperience = {
        companyName,
        startDate,
        endDate,
        isCurrentEmployer,
        jobDescription,
      };

      setWorkExperienceList([...workExperienceList, newWorkExperience]);
      setIsExperienceFormVisible(false);
      alert(WORK_EXPERIENCE_ITEM_ADDED);
    }
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

  const calculateTotalExp = () => {
    const arrayNoOfDays = workExperienceList.map((item) => {
      return calculateNoOfdays(item.startDate, item.endDate);
    });

    const totalExperienceInDays = arrayNoOfDays.reduce(
      (previousValue, currentValue, index) => previousValue + currentValue,
      0
    );

    const years = Math.floor(totalExperienceInDays / 365);

    const remainingDays = totalExperienceInDays % 365;

    const months = Math.floor(remainingDays / 30);

    onUpdateTotalExperience([years, months]);
  };
  const calculateNoOfdays = (startDate, endDate) => {
    if (endDate === "") {
      endDate = new Date().getTime();
    }
    return (
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };
  useEffect(() => {
    calculateTotalExp();
    localStorage.setItem(
      "work-experience-list",
      JSON.stringify(workExperienceList)
    );
  }, [workExperienceList]);

  useEffect(() => {
    setIsExperienceFormVisible(false);
  }, [isEditModeEnabled]);

  return (
    <div className={styles.details}>
      <div>
        <h1>{WORK_EXPERIENCE_HEADING}</h1>
        <div className={styles.expSection}>
          {workExperienceList.length > 0 ? (
            <div className={styles.expListContainer}>
              {workExperienceList.map((item, index) => (
                <WorkExperienceItem
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

          {isEditModeEnabled && !isExperienceFormVisible && (
            <button
              className={styles.addExperience}
              onClick={(e) => {
                setIsExperienceFormVisible(true);
              }}
            >
              {ADD_EXPERIENCE_LABEL}
            </button>
          )}
        </div>

        {isEditModeEnabled && isExperienceFormVisible && (
          <div className={styles.experienceForm}>
            <form
              className={styles.workExpForm}
              onSubmit={(e) => submitWorkExperienceForm(e)}
            >
              <div className={styles.closeBtn}>
                <button
                  onClick={(e) => {
                    setIsExperienceFormVisible(false);
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
