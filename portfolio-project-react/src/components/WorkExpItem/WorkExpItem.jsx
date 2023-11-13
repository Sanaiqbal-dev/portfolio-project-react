import React, { useContext, useEffect, useState } from "react";
import styles from "./WorkExpItem.module.css";
import deleteIcon from "./assets/ic_delete.png";
import editIcon from "./assets/ic_edit.png";
import {
  LABEL_CURR_EMP,
  LABEL_END_DATE,
  LABEL_START_DATE,
} from "../../constants";
import { IsEditMode } from "../../IsEditMode";

import moment from "moment";

const WorkExpItem = ({ data, index, onDelete, onUpdate }) => {
  const isEditMode = useContext(IsEditMode);

  const [editExp, setEditExp] = useState(false);

  const [compNameInput, setCompNameInput] = useState(data.compName);
  const [startDateInput, setStartDateInput] = useState(data.startDate);
  const [endDateInput, setEndDateInput] = useState(data.endDate);
  const [isCurrentEmpInput, setIsCurrentEmpInput] = useState(data.isCurrentEmp);
  const [jobDescriptionInput, setJobDescriptionInput] = useState(
    data.jobDescription
  );

  const updateExperienceItem = () => {
    if (!isCurrentEmpInput && endDateInput < startDateInput) {
      alert("Incorrect end date");
    } else {
      setEditExp(false);

      onUpdate(
        index,
        compNameInput,
        startDateInput,
        endDateInput,
        isCurrentEmpInput,
        jobDescriptionInput
      );
    }
  };

  useEffect(() => {
    setEditExp(false);
    setCompNameInput(data.compName);
    setStartDateInput(data.startDate);
    setEndDateInput(data.endDate);
    setIsCurrentEmpInput(data.isCurrentEmp);
    setJobDescriptionInput(data.jobDescription);
  }, [isEditMode]);
  return (
    <div className={styles.expItemContainer}>
      <div className={styles.topSection}>
        {editExp ? (
          <div>
            <label className={styles.companyNameLabel}>Company Name: </label>
            <input
              className={styles.compNameInput}
              value={compNameInput}
              onChange={(e) => {
                setCompNameInput(e.target.value);
              }}
            />
          </div>
        ) : (
          <h4 className={styles.companyName}>
            {index + 1 + ". " + data.compName}
          </h4>
        )}

        {isEditMode && !editExp && (
          <div className={styles.headerEvents}>
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                onDelete(index);
              }}
            >
              <img src={deleteIcon} />
            </button>
            <button
              className={styles.editBtn}
              onClick={(e) => {
                setEditExp(true);
              }}
            >
              <img src={editIcon} />
            </button>
          </div>
        )}
      </div>

      {editExp ? (
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
              value={startDateInput}
              onChange={(e) => setStartDateInput(e.target.value)}
            />
            <input
              type="date"
              required
              max={moment(new Date()).toISOString().split("T")[0]}
              value={endDateInput}
              disabled={isCurrentEmpInput}
              onChange={(e) => setEndDateInput(e.target.value)}
            />
            <div className={styles.checkboxSection}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={isCurrentEmpInput}
                onChange={(e) => {
                  setIsCurrentEmpInput(e.target.checked);
                  setEndDateInput("");
                }}
              />
              <label className={styles.labelEmployer}>{LABEL_CURR_EMP}</label>
            </div>
          </div>
        </div>
      ) : (
        <h5 className={styles.jobDuration}>
          {data.startDate +
            " - " +
            (data.isCurrentEmp ? "Present" : data.endDate)}
        </h5>
      )}
      {editExp ? (
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
      {editExp && (
        <button
          className={styles.saveBtn}
          onClick={(e) => {
            updateExperienceItem();
          }}
        >
          SAVE
        </button>
      )}

      <hr />
    </div>
  );
};

export default WorkExpItem;
