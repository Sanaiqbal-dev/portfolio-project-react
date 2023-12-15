import { useEffect, useState, useContext } from "react";
import moment from "moment";
import WorkExperienceItem from "../WorkExperienceItem/WorkExperienceItem.tsx";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import {
  JOB_DESCRIPTION_ERROR,
  WORK_EXPERIENCE_HEADING,
  FILL_DETAILS_HEADING,
  ADD_EXPERIENCE_LABEL,
  COMPANY_NAME_PLACEHOLDER,
  JOB_DESCRIPTION_PLACEHOLDER,
  WORK_EXPERIENCE_NOT_FOUND,
  PLACEHOLDER_SEARCH,
} from "./constants.tsx";
import {
  CURRENT_EMPLOYER_LABEL,
  START_DATE_LABEL,
  END_DATE_LABEL,
  SAVE_TEXT,
  CLOSE_DELETE_TEXT,
  INCORRECT_DATE_ALERT,
} from "../../constants.tsx";

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

  const [WorkExperienceNewItem, setWorkExperienceNewItem] = useState({
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrentEmployer: false,
    description: "",
  });

  const maxDateLimit = moment(new Date()).toISOString().split("T")[0];

  const submitWorkExperienceForm = (e) => {
    e.preventDefault();
    if (
      !WorkExperienceNewItem.isCurrentEmployer &&
      WorkExperienceNewItem.startDate > WorkExperienceNewItem.endDate
    ) {
      alert(INCORRECT_DATE_ALERT);
    } else {
      onAddNewWorkExperience({
        companyName: WorkExperienceNewItem.companyName,
        startDate: WorkExperienceNewItem.startDate,
        endDate: WorkExperienceNewItem.isCurrentEmployer
          ? "Present"
          : WorkExperienceNewItem.endDate,
        description: WorkExperienceNewItem.description,
      });
      setIsExperienceFormVisible(false);
    }
  };

  const deleteExperienceItem = (workExperienceItemId) => {
    onDeleteWorkExperience(workExperienceItemId);
  };

  const updateExperienceItem = (updatedWorkExperienceItem) => {
    const updatedData = {
      companyName: updatedWorkExperienceItem.companyName,
      startDate: updatedWorkExperienceItem.startDate,
      endDate:
        updatedWorkExperienceItem.endDate === ""
          ? "Present"
          : updatedWorkExperienceItem.endDate,
      description: updatedWorkExperienceItem.description,
    };
    onUpdateWorkExperience(updatedWorkExperienceItem._id, updatedData);
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
                onChange={(e) =>
                  setWorkExperienceNewItem({
                    ...WorkExperienceNewItem,
                    companyName: e.target.value,
                  })
                }
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
                    onChange={(e) =>
                      setWorkExperienceNewItem({
                        ...WorkExperienceNewItem,
                        startDate: e.target.value,
                      })
                    }
                  />
                  <input
                    type="date"
                    required
                    disabled={WorkExperienceNewItem.isCurrentEmployer}
                    max={maxDateLimit}
                    onChange={(e) =>
                      setWorkExperienceNewItem({
                        ...WorkExperienceNewItem,
                        endDate: e.target.value,
                      })
                    }
                  />
                  <div className={styles.checkboxSection}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onChange={(e) => {
                        setWorkExperienceNewItem({
                          ...WorkExperienceNewItem,
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
              <textarea
                className={styles.description}
                required
                value={WorkExperienceNewItem.description}
                placeholder={JOB_DESCRIPTION_PLACEHOLDER}
                onChange={(e) =>
                  setWorkExperienceNewItem({
                    ...WorkExperienceNewItem,
                    description: e.target.value,
                  })
                }
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
