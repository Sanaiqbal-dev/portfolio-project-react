import React, { useEffect, useState, useContext, FC } from "react";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import { CHAR_UNIT, ADD_PLACEHOLDER, ENTER_KEY } from "./constants.tsx";
import { CLOSE_DELETE_TEXT, EMPTY_STRING } from "../../constants.tsx";
import styles from "./SkillItem.module.css";

interface SkillData {
  _id: string;
  skill: string;
}
interface SkillItemProps {
  data?: SkillData;
  isAddNewSkillInput: boolean;
  onAddSkill: (values: string) => void;
  onDeleteSkill?: (values: string) => void;
  onUpdateSkill?: (id: string, updatedSkill: string) => void;
}
interface SkillItem {
  id: string;
  skillName: string;
  width: string;
  isSkillUpdated: boolean;
}
const SkillItem: FC<SkillItemProps> = ({
  data,
  isAddNewSkillInput,
  onAddSkill,
  onDeleteSkill,
  onUpdateSkill,
}) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [skill, setSkill] = useState<SkillItem>({
    id: EMPTY_STRING,
    skillName: EMPTY_STRING,
    width: EMPTY_STRING,
    isSkillUpdated: false,
  });
  const [newSkill, setNewSkill] = useState(EMPTY_STRING);
  const getItemWidth = () => {
    return skill.skillName
      ? skill.skillName.length + 1 + CHAR_UNIT
      : 1 + CHAR_UNIT;
  };

  const onEnterKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === ENTER_KEY && newSkill.length > 0) {
      onAddSkill(newSkill);
      setNewSkill(EMPTY_STRING);
    }
  };

  const onUpdateSkillContent = (updatedSkill: string) => {
    setSkill({
      ...skill,
      skillName: updatedSkill,
      width: getItemWidth(),
      isSkillUpdated: true,
    });
  };

  useEffect(() => {
    if (data) {
      let width_: string = data.skill.length + 1 + CHAR_UNIT;
      setSkill({
        id: data._id,
        skillName: data.skill,
        width: width_,
        isSkillUpdated: false,
      });
    }
    setNewSkill(EMPTY_STRING);
  }, [data]);

  useEffect(() => {
    if (!isEditModeEnabled && skill.isSkillUpdated) {
      if (skill.skillName.length === 0) onDeleteSkill(skill.id);
      else onUpdateSkill(skill.id, skill.skillName );
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
