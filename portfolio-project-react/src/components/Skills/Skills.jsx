import { useState, useContext, useEffect } from "react";
import SkillItem from "../SkillItem/SkillItem";
import { IsEditModeEnabled } from "../../EditModeContext";
import { SKILLS_DATA } from "./constants";
import styles from "./Skills.module.css";

const Skills = () => {
  const [skillsList, setSkillsList] = useState(
    localStorage.getItem("skills-list")
      ? JSON.parse(localStorage.getItem("skills-list"))
      : SKILLS_DATA
  );
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const addNewSkill = (newSkill) => {
    setSkillsList([...skillsList, newSkill]);
  };

  const deleteSkill = (recievedIndex) => {
    const updatedList = skillsList.filter(
      (item, index) => recievedIndex !== index
    );
    setSkillsList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("skills-list", JSON.stringify(skillsList));
  }, [skillsList]);
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

      {isEditModeEnabled && (
        <SkillItem isAddNewSkillInput={true} onAddSkill={addNewSkill} />
      )}
    </div>
  );
};

export default Skills;
