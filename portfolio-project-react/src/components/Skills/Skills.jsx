import React, { useState } from "react";
import SkillItem from "../SkillItem/SkillItem";
import styles from "./Skills.module.css";
import { SKILLS_DATA } from "./constants";
const Skills = ({ isEditModeEnabled }) => {
  const [skillsList, setSkillsList] = useState(SKILLS_DATA);

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
            isEditModeEnabled={isEditModeEnabled}
            data={item}
            index={index}
            isAddNewSkillInput={false}
            onAddSkill={addNewSkill}
            onDeleteSkill={deleteSkill}
          />
        ))}

      {isEditModeEnabled && (
        <SkillItem isAddNewSkillInput={true} onAddSkill={addNewSkill} />
      )}
    </div>
  );
};

export default Skills;
