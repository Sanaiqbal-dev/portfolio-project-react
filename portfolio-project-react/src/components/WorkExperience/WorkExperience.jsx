import { useEffect, useState, useContext } from "react";
import moment from "moment";
import WorkExperienceItem from "../WorkExperienceItem/WorkExperienceItem";
import { IsEditModeEnabled } from "../../EditModeContext";
import {
  JOB_DESCRIPTION_ERROR,
  WORK_EXPERIENCE_HEADING,
  FILL_DETAILS_HEADING,
  ADD_EXPERIENCE_LABEL,
  COMPANY_NAME_PLACEHOLDER,
  JOB_DESCRIPTION_PLACEHOLDER,
  WORK_EXPERIENCE_NOT_FOUND,
  PLACEHOLDER_SEARCH,
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

const WorkExperience = ({
  filteredWorkExperienceList,
  onAddNewWorkExperience,
  onUpdateWorkExperience,
  onDeleteWorkExperience,
  onSearchWorkExperience,
}) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [isExperienceFormVisible, setIsExperienceFormVisible] = useState(false);
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
        companyName: companyName,
        startDate: startDate,
        endDate: isCurrentEmployer ? "Present" : endDate,
        description: jobDescription,
      };
      onAddNewWorkExperience(newWorkExperience);
      setIsExperienceFormVisible(false);
    }
  };

  const deleteExperienceItem = (workExperienceItemId) => {
    onDeleteWorkExperience(workExperienceItemId);
  };

  const updateExperienceItem = (updatedTask) => {
    const {
      id,
      updatedCompanyName,
      updatedStartDate,
      updatedEndDate,
      updatedDescription,
    } = updatedTask;
    
    const updatedWorkExperienceItem = {
      companyName: updatedCompanyName,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      description: updatedDescription,
    };
    onUpdateWorkExperience(id, updatedWorkExperienceItem);
  };

  useEffect(() => {
    setIsExperienceFormVisible(false);
  }, [isEditModeEnabled]);

  return (
    <div className={styles.details}>
      <div>
        <h1>{WORK_EXPERIENCE_HEADING}</h1>
        {isEditModeEnabled && (
          <input
            className={styles.searchText}
            placeholder={PLACEHOLDER_SEARCH}
            onInput={(e) => {
              onSearchWorkExperience(e.target.value);
            }}
          />
        )}

        <div className={styles.expSection}>
          {filteredWorkExperienceList.length > 0 ? (
            <div className={styles.expListContainer}>
              {filteredWorkExperienceList.map((item, index) => (
                <WorkExperienceItem
                  key={item._id}
                  isEditModeEnabled={isEditModeEnabled}
                  data={item}
                  index={index}
                  onDeleteWorkExperienceItem={deleteExperienceItem}
                  onUpdateWorkExperienceItem={updateExperienceItem}
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
                value={jobDescription}
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
