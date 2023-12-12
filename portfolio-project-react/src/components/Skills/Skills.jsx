import { useState, useContext, useEffect } from "react";
import SkillItem from "../SkillItem/SkillItem";
import { IsEditModeEnabled } from "../../EditModeContext";
import styles from "./Skills.module.css";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([]);
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const updateSkill = async (id, updatedSkill) => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/updateSkillItem/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedSkill),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {})
      .catch((error) => {
        alert("Failed to update skill data.");
      });
  };
  const deleteSkill = async (id) => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/deleteSkillItem/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);

        const updatedList = skillsList.filter((item) => item._id !== id);
        setSkillsList(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addNewSkill = async (skillTitle) => {
    await fetch(`http://localhost:3000/api/portfolio/experience/AddSkillItem`, {
      method: "POST",
      body: JSON.stringify({ skill: skillTitle }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {
        setSkillsList([...skillsList, jsonData.data]);
      })
      .catch((error) => {
        alert("Failed to add new skill data.");
      });
  };

  const fetchSkillsList = async () => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/getSkillsList`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setSkillsList(jsonData);
      })
      .catch((error) => alert("Failed to fetch skills data."));
  };
  useEffect(() => {
    fetchSkillsList();
  }, []);
  return (
    <div className={styles.skillsContainer}>
      {skillsList &&
        skillsList.map((item, index) => (
          <SkillItem
            key={index}
            data={item}
            isAddNewSkillInput={false}
            onAddSkill={addNewSkill}
            onDeleteSkill={deleteSkill}
            onUpdateSkill={updateSkill}
          />
        ))}

      {isEditModeEnabled && (
        <SkillItem isAddNewSkillInput={true} onAddSkill={addNewSkill} />
      )}
    </div>
  );
};

export default Skills;
