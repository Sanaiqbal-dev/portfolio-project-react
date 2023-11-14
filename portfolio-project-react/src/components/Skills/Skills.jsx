import React, { useEffect, useState, useContext } from "react";
import SkillItem from "../SkillItem/SkillItem";
import { IsEditMode } from "../../IsEditMode";
import { SKILLS_DATA } from "./constants";
import styles from "./Skills.module.css";

const Skills = () => {

  const [skillsList, setSkillsList] = useState(SKILLS_DATA);
  const isEditModeEnabled = useContext(IsEditMode);

  const addNewSkill = (newSkill) => {
    setSkillsList([...skillsList, newSkill]);
  };

  const deleteSkill = (recievedIndex) => {
    const updatedList = skillsList.filter(
      (item, index) => recievedIndex !== index
    );
    setSkillsList(updatedList);
  };
  return (
    <div className={styles.skillsContainer}>
      {skillsList &&
        skillsList.map((item, index) => (
          <SkillItem
            key={index}
            data={item}
            index={index}
            isAddNewSkillInput={false}
            onAddSkill={addNewSkill}
            onDeleteSkill={deleteSkill}
          />
        ))}

      {isEditModeEnabledisEditModeEnabled && (
        <SkillItem isAddNewItem={true} onAdd={addNewSkill} />
      )}
    </div>
  );
};

export default Skills;
