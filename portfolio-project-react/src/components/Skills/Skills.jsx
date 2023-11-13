import React, { useState } from "react";
import SkillItem from "../SkillItem/SkillItem";
import styles from "./Skills.module.css";
import { SKILLS_DATA } from "./constants";
const Skills = ({ isEditModeEnabled }) => {
  const [skillsList, setSkillsList] = useState(SKILLS_DATA);

  const AddNewSkill = (newSkill) => {
    setSkillsList([...skillsList, newSkill]);
  };

  const DeleteSkill = (recievedIndex) => {
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
            onAddSkill={AddNewSkill}
            onDeleteSkill={DeleteSkill}
          />
        ))}

      {isEditModeEnabled && (
        <SkillItem isAddNewSkillInput={true} onAddSkill={AddNewSkill} />
      )}
    </div>
  );
};

export default Skills;
