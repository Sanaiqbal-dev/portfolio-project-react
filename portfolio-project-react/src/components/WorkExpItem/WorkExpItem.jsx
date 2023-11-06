import React from "react";
import styles from "./WorkExpItem.module.css";
import deleteIcon from "./assets/ic_delete.png";
import editIcon from "./assets/ic_edit.png";

const WorkExpItem = ({ isEdit, data, index }) => {
  return (
    <div className={styles.expItemContainer}>
      <div className={styles.headerEvents}>
        <button className={styles.deleteBtn}>
          <img src={deleteIcon} />
        </button>
        <button className={styles.editBtn}>
          <img src={editIcon} />
        </button>
      </div>
      <h4>{index+1 +". "+ data.compName}</h4>
      <h5>{data.startDate + " - " + data.endDate}</h5>
      <p>{data.jobDescription}</p>
      <hr/>
    </div>
  );
};

export default WorkExpItem;
