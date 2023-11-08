import { useEffect, useState } from "react";

import {
  CLOSE,
  ERROR_JOB_DESC,
  EXP_HEADING,
  HEADING_FILL_DETAILS,
  LABEL_ADD_EXP,
  PLACEHOLDER_COMP_NAME,
  PLACEHOLDER_JOB_dESC,
  SAVE,
} from "./constants";

import {
  LABEL_CURR_EMP,
  LABEL_START_DATE,
  LABEL_END_DATE,
} from "../../constants";

import WorkExpItem from "../WorkExpItem/WorkExpItem";
import styles from "./WorkExp.module.css";
import moment from "moment";

const WorkExp = ({ isEdit }) => {
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [expList, setExpList] = useState([]);
  const [compName, setCompName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrentEmp, setIsCurrentEmp] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const SubmitWorkExpForm = (e) => {
    e.preventDefault();
    if (!isCurrentEmp && startDate > endDate) {
      alert("incorrect end date.");
    } else {
      const newWorkExp = {
        compName,
        startDate,
        endDate,
        isCurrentEmp,
        jobDescription,
      };

      setExpList([...expList, newWorkExp]);
    }
    setShowExperienceForm(false);
    alert("New Work Experience data is added.");
  };

  const deleteExperienceItem = (indexPassed) => {
    const newList = expList.filter((item, index) => index !== indexPassed);

    setExpList(newList);
  };

  const updateExperienceItem = (
    itemIndex,
    name,
    startDate,
    endDate,
    isCurrentEmp,
    jobDesc
  ) => {
    console.log(
      "Recieved info is :",
      itemIndex,
      name,
      startDate,
      endDate,
      isCurrentEmp,
      jobDesc
    );

    const updatedList = expList.map((item, index) => {
      if (index === itemIndex) {
        item.compName = name;
        item.startDate = startDate;
        item.endDate = endDate;
        item.isCurrentEmp = isCurrentEmp;
        item.jobDescription = jobDesc;
      }
      return item;
    });

    setExpList([...updatedList]);
  };

  useEffect(() => {
    setShowExperienceForm(false);
  }, [isEdit]);

  return (
    <div className={styles.details}>
      <div>
        <h1>{EXP_HEADING}</h1>
        <div className={styles.expSection}>
          {expList.length > 0 ? (
            <div className={styles.expListContainer}>
              {expList.map((item, index) => (
                <WorkExpItem
                  key={index}
                  isEdit={isEdit}
                  data={item}
                  index={index}
                  onDelete={deleteExperienceItem}
                  onUpdate={updateExperienceItem}
                />
              ))}
            </div>
          ) : (
            <label>No Work Experience available</label>
          )}

          {isEdit && !showExperienceForm && (
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

        {isEdit && showExperienceForm && (
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
                    max={moment(new Date()).toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="date"
                    required
                    disabled={isCurrentEmp}
                    max={moment(new Date()).toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <div className={styles.checkboxSection}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onChange={(e) => {
                        setIsCurrentEmp(e.target.checked);
                        setEndDate("");
                      }}
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
  );
};

export default WorkExp;
