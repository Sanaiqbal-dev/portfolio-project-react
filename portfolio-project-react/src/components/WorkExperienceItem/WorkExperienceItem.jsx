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
  onDeleteWorkExperienceItem,
  onUpdateWorkExperienceItem,
}) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [isItemEditModeEnabled, setIsItemEditModeEnabled] = useState(false);

  const [WorkExperienceCurrentItem, setWorkExperienceCurrentItem] = useState({
    _id: data._id,
    companyName: data.companyName,
    startDate: data.startDate,
    endDate: data.endDate,
    isCurrentEmployer: data.endDate === "Present" ? true : false,
    description: data.description,
  });
  let companyNameValue =
    index + 1 + ". " + WorkExperienceCurrentItem.companyName;

  let jobDuration =
    WorkExperienceCurrentItem.startDate +
    DASH_TEXT +
    (WorkExperienceCurrentItem.isCurrentEmployer
      ? PRESENT_TEXT
      : WorkExperienceCurrentItem.endDate);

  const maxDateLimit = moment(new Date()).toISOString().split("T")[0];

  const updateExperienceItem = () => {
    if (
      !WorkExperienceCurrentItem.isCurrentEmployer &&
      WorkExperienceCurrentItem.endDate < WorkExperienceCurrentItem.startDate
    ) {
      alert(INCORRECT_DATE_ALERT);
    } else {
      setIsItemEditModeEnabled(false);

      onUpdateWorkExperienceItem(WorkExperienceCurrentItem);
    }
  };

  useEffect(() => {
    setIsItemEditModeEnabled(false);
    setWorkExperienceCurrentItem(data);
  }, [isEditModeEnabled, data]);

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
              value={WorkExperienceCurrentItem.companyName}
              onChange={(e) => {
                setWorkExperienceCurrentItem({
                  ...WorkExperienceCurrentItem,
                  companyName: e.target.value,
                });
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
                onDeleteWorkExperienceItem(data._id);
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
              value={WorkExperienceCurrentItem.startDate}
              onChange={(e) =>
                setWorkExperienceCurrentItem({
                  ...WorkExperienceCurrentItem,
                  startDate: e.target.value,
                })
              }
            />
            <input
              type="date"
              required
              max={maxDateLimit}
              value={WorkExperienceCurrentItem.endDate}
              disabled={WorkExperienceCurrentItem.isCurrentEmployer}
              onChange={(e) =>
                setWorkExperienceCurrentItem({
                  ...WorkExperienceCurrentItem,
                  endDate: e.target.value,
                })
              }
            />
            <div className={styles.checkboxSection}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={WorkExperienceCurrentItem.isCurrentEmployer}
                onChange={(e) => {
                  setWorkExperienceCurrentItem({
                    ...WorkExperienceCurrentItem,
                    endDate: "",
                    isCurrentEmployer: e.target.checked,
                  });
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
          value={WorkExperienceCurrentItem.description}
          onChange={(e) => {
            setWorkExperienceCurrentItem({
              ...WorkExperienceCurrentItem,
              description: e.target.value,
            });
          }}
        />
      ) : (
        <p className={styles.jobDescription}>
          {WorkExperienceCurrentItem.description}
        </p>
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
