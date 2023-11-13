import React, { useEffect, useState, useContext } from "react";
import { IsEditMode } from "../../IsEditMode";
import { CHAR_UNIT, DELETE, PLACEHOLDER_ADD } from "./constants";
import styles from "./SkillItem.module.css";

const SkillItem = ({ data, index, isAddNewItem, onAdd, onDelete }) => {
  
  const isEditMode = useContext(IsEditMode);
  const [skill, setSkill] = useState(data);
  const [newSkill, setNewSkill] = useState("");
  const handleEvent = (e) => {
    if (e.code === "Enter" && newSkill.length > 0) {
      onAdd(newSkill);
      setNewSkill("");
    }
  };
  const [width, setWidth] = useState(
    skill ? skill.length + 1 + CHAR_UNIT : 1 + CHAR_UNIT
  );

  useEffect(() => {
    setSkill(data);
    setNewSkill("");
  }, [data]);

  useEffect(() => {
    setWidth(skill ? skill.length + 1 + CHAR_UNIT : 1 + CHAR_UNIT);
  }, [skill]);

  return (
    <>
      {isAddNewItem ? (
        <div className={styles.skillItem}>
          <input
            className={styles.addNewItem}
            placeholder={PLACEHOLDER_ADD}
            onKeyDown={(e) => handleEvent(e)}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
        </div>
      ) : (
        <div className={styles.skillItem}>
          <input
            className={styles.addNewItem}
            value={skill}
            style={{ width: width }}
            disabled={isEditMode ? false : true}
            onChange={(e) => {
              setSkill(e.target.value);
              setWidth(skill.length + 1);
            }}
          />
          {isEditMode && (
            <label
              className={styles.deleteIcon}
              onClick={(e) => onDelete(index)}
            >
              {DELETE}
            </label>
          )}
        </div>
      )}
    </>
  );
};

export default SkillItem;
