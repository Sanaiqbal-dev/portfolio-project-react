import React, { useEffect, useState } from "react";
import styles from "./Skills.module.css";
import SkillItem from "../SkillItem/SkillItem";
import { SKILLS_DATA } from "./constants";
const Skills = ({ isEdit }) => {
  const [skillsList, setSkillsList] = useState(SKILLS_DATA);

  const AddNewSkill = (newSkill) => {
    setSkillsList([...skillsList, newSkill]);
    console.log(skillsList);
  };

  const DeleteSkill = (recievedIndex) => {
    const updatedList = skillsList.filter(
      (item, index) => recievedIndex !== index
    );
    setSkillsList(updatedList);
  };
  useEffect(() => {
    console.log(skillsList);
  }, [skillsList]);
  return (
    <div className={styles.skillsContainer}>
      {skillsList &&
        skillsList.map((item, index) => (
          <SkillItem
            key={index}
            isEdit={isEdit}
            data={item}
            index={index}
            isAddNewItem={false}
            onAdd={AddNewSkill}
            onDelete={DeleteSkill}
          />
        ))}

      {isEdit && <SkillItem
        isAddNewItem={true}
        onAdd={AddNewSkill}
      />}
    </div>
  );
};

export default Skills;
