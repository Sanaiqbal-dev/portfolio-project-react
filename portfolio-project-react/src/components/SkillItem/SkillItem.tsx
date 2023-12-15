import React, { useEffect, useState, useContext } from "react";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import { CHAR_UNIT, ADD_PLACEHOLDER } from "./constants.tsx";
import { CLOSE_DELETE_TEXT } from "../../constants.tsx";
import styles from "./SkillItem.module.css";

const SkillItem = ({
  data,
  isAddNewSkillInput,
  onAddSkill,
  onDeleteSkill,
  onUpdateSkill,
}) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [skill, setSkill] = useState({ id: "", skillName: "", width: "" ,isSkillUpdated:false});
  const [newSkill, setNewSkill] = useState("");
  const getItemWidth = () => {
    return skill.skillName
      ? skill.skillName.length + 1 + CHAR_UNIT
      : 1 + CHAR_UNIT;
  };

  const onEnterKeyPressHandler = (e) => {
    if (e.code === "Enter" && newSkill.length > 0) {
      onAddSkill(newSkill);
      setNewSkill("");
    }
  };

  const onUpdateSkillContent = (updatedSkill) => {
    setSkill({
      ...skill,
      skillName: updatedSkill,
      width: getItemWidth(),
      isSkillUpdated:true,
    });
  };

  useEffect(() => {
    if (data) {
      let width_ = data.skill.length + 1 + CHAR_UNIT;
      setSkill({ id: data._id, skillName: data.skill, width: width_ });
    }
    setNewSkill("");
  }, [data]);

  useEffect(() => {
    if (!isEditModeEnabled && skill.isSkillUpdated) {
      if (skill.skillName.length === 0) onDeleteSkill(skill.id);
      else onUpdateSkill(skill.id, { skill: skill.skillName });
    }
  }, [isEditModeEnabled]);

  return (
    <>
      {isAddNewSkillInput ? (
        <div className={styles.skillItem}>
          <input
            className={styles.addNewItem}
            placeholder={ADD_PLACEHOLDER}
            onKeyDown={(e) => onEnterKeyPressHandler(e)}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
        </div>
      ) : (
        <div className={styles.skillItem}>
          <input
            className={styles.addNewItem}
            value={skill.skillName}
            style={{ width: skill.width }}
            disabled={!isEditModeEnabled}
            onChange={(e) => {
              onUpdateSkillContent(e.target.value);
            }}
          />
          {isEditModeEnabled && (
            <label
              className={styles.deleteIcon}
              onClick={(e) => onDeleteSkill(skill.id)}
            >
              {CLOSE_DELETE_TEXT}
            </label>
          )}
        </div>
      )}
    </>
  );
};

export default SkillItem;
