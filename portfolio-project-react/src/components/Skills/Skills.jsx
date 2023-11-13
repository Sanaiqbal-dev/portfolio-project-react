import React, { useEffect, useState, useContext } from "react";
import SkillItem from "../SkillItem/SkillItem";
import { IsEditMode } from "../../IsEditMode";
import { SKILLS_DATA } from "./constants";
import styles from "./Skills.module.css";

const Skills = () => {

  const [skillsList, setSkillsList] = useState(SKILLS_DATA);
  const isEditMode = useContext(IsEditMode);

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
            data={item}
            index={index}
            isAddNewItem={false}
            onAdd={AddNewSkill}
            onDelete={DeleteSkill}
          />
        ))}

      {isEditMode && <SkillItem
        isAddNewItem={true}
        onAdd={AddNewSkill}
      />}
    </div>
  );
};

export default Skills;
