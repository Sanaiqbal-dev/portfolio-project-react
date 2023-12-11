import { useEffect, useState, useContext } from "react";
import { IsEditModeEnabled } from "../../EditModeContext";
import { CHAR_UNIT, ADD_PLACEHOLDER } from "./constants";
import { CLOSE_DELETE_TEXT } from "../../constants";
import styles from "./SkillItem.module.css";

const SkillItem = ({
  data,
  index,
  isAddNewSkillInput,
  onAddSkill,
  onDeleteSkill,
  onUpdateSkill,
}) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [skillId, setSkillId] = useState("");
  const [skill, setSkill] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const getItemWidth = () => {
    return skill ? skill.length + 1 + CHAR_UNIT : 1 + CHAR_UNIT;
  };

  const [width, setWidth] = useState(getItemWidth);

  const onEnterKeyPressHandler = (e) => {
    if (e.code === "Enter" && newSkill.length > 0) {
      onAddSkill(newSkill);
      setNewSkill("");
    }
  };

  // const onUpdateSkill = (e) => {
  //   setSkill(e.target.value);
  //   setWidth(skill.length + 1);
  // };
  useEffect(() => {
    if (data) {
      setSkill(data.skill);
      setSkillId(data._id);
    }

    setNewSkill("");
  }, [data]);

  useEffect(() => {
    setWidth(getItemWidth);
  }, [skill]);

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
            value={skill}
            style={{ width: width }}
            disabled={!isEditModeEnabled}
            onChange={(e) => {
              onUpdateSkill(e.target.value);
            }}
          />
          {isEditModeEnabled && (
            <label
              className={styles.deleteIcon}
              onClick={(e) => onDeleteSkill(index)}
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
