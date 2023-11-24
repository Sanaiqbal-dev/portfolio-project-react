import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { IsEditModeEnabled } from "../../EditModeContext";
import { COMPANY_NAME_LABEL, PRESENT_TEXT, DASH_TEXT } from "./constants";
import {
  CURRENT_EMPLOYER_LABEL,
  END_DATE_LABEL,
  START_DATE_LABEL,
  SAVE_TEXT,
  INCORRECT_DATE_ALERT,
} from "../../constants";
import styles from "./WorkExperienceItem.module.css";
import deleteIcon from "./assets/ic_delete.png";
import editIcon from "./assets/ic_edit.png";

const WorkExperienceItem = ({
  data,
  index,
  onDeleteWorkExperience,
  onUpdateWorkExperience,
}) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const [isItemEditModeEnabled, setIsItemEditModeEnabled] = useState(false);
  const [companyNameInput, setCompanyNameInput] = useState(data.companyName);
  let companyNameValue = index + 1 + ". " + companyNameInput;

  const [startDateInput, setStartDateInput] = useState(data.startDate);
  const [endDateInput, setEndDateInput] = useState(data.endDate);
  const [isCurrentEmployerInput, setIsCurrentEmployerInput] = useState(
    data.isCurrentEmployer
  );
  const [jobDescriptionInput, setJobDescriptionInput] = useState(
    data.jobDescription
  );
  let jobDuration =
    startDateInput +
    DASH_TEXT +
    (isCurrentEmployerInput ? PRESENT_TEXT : endDateInput);

  const [maxDateLimit, setMaxDateLimit] = useState(
    moment(new Date()).toISOString().split("T")[0]
  );

  const updateExperienceItem = () => {
    if (!isCurrentEmployerInput && endDateInput < startDateInput) {
      alert(INCORRECT_DATE_ALERT);
    } else {
      setIsItemEditModeEnabled(false);

      onUpdateWorkExperience(
        index,
        companyNameInput,
        startDateInput,
        endDateInput,
        isCurrentEmployerInput,
        jobDescriptionInput
      );
    }
  };

  useEffect(() => {
    setIsItemEditModeEnabled(false);
    setCompanyNameInput(data.companyName);
    setStartDateInput(data.startDate);
    setEndDateInput(data.endDate);
    setIsCurrentEmployerInput(data.isCurrentEmployer);
    setJobDescriptionInput(data.jobDescription);
  }, [isEditModeEnabled]);

  return (
    <div className={styles.expItemContainer}>
      <div className={styles.topSection}>
        {isItemEditModeEnabled ? (
          <div>
            <label className={styles.companyNameLabel}>
              {COMPANY_NAME_LABEL}
            </label>
            <input
              className={styles.compNameInput}
              value={companyNameInput}
              onChange={(e) => {
                setCompanyNameInput(e.target.value);
              }}
            />
          </div>
        ) : (
          <h4 className={styles.companyName}>{companyNameValue}</h4>
        )}

        {isEditModeEnabled && !isItemEditModeEnabled && (
          <div className={styles.headerEvents}>
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                onDeleteWorkExperience(index);
              }}
            >
              <img src={deleteIcon} />
            </button>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                setIsItemEditModeEnabled(true);
              }}
            >
              <img src={editIcon} />
            </button>
          </div>
        )}
      </div>

      {isItemEditModeEnabled ? (
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
              value={startDateInput}
              onChange={(e) => setStartDateInput(e.target.value)}
            />
            <input
              type="date"
              required
              max={maxDateLimit}
              value={endDateInput}
              disabled={isCurrentEmployerInput}
              onChange={(e) => setEndDateInput(e.target.value)}
            />
            <div className={styles.checkboxSection}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={isCurrentEmployerInput}
                onChange={(e) => {
                  setIsCurrentEmployerInput(e.target.checked);
                  setEndDateInput("");
                }}
              />
              <label className={styles.labelEmployer}>
                {CURRENT_EMPLOYER_LABEL}
              </label>
            </div>
          </div>
        </div>
      ) : (
        <h5 className={styles.jobDuration}>{jobDuration}</h5>
      )}
      {isItemEditModeEnabled ? (
        <textarea
          className={styles.description}
          value={jobDescriptionInput}
          onChange={(e) => {
            setJobDescriptionInput(e.target.value);
          }}
        />
      ) : (
        <p className={styles.jobDescription}>{data.jobDescription}</p>
      )}
      {isItemEditModeEnabled && (
        <button
          className={styles.saveBtn}
          onClick={(e) => {
            updateExperienceItem();
          }}
        >
          {SAVE_TEXT}
        </button>
      )}

      <hr />
    </div>
  );
};

export default WorkExperienceItem;
