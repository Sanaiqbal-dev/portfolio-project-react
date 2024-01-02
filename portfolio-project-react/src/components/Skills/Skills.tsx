import React,{ useState, useContext, useEffect } from "react";
import SkillItem from "../SkillItem/SkillItem.tsx";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import styles from "./Skills.module.css";


interface SkillData {
  _id: string;
  skill: string;
}

const Skills = () => {
  const [skillsList, setSkillsList] = useState<SkillData[]>([]);
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const updateSkillHandler = async (id:string, updatedSkill:string) => {
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
  const deleteSkillHandler = async (id:string) => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/deleteSkillItem/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const updatedList = skillsList.filter((item) =>  item._id !== id);
        setSkillsList(updatedList);
      })
      .catch((error) => {});
  };
  const addNewSkillHandler = async (skillTitle:string) => {
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
            onAddSkill={addNewSkillHandler}
            onDeleteSkill={deleteSkillHandler}
            onUpdateSkill={updateSkillHandler}
          />
        ))}

      {isEditModeEnabled && (
        <SkillItem isAddNewSkillInput={true} onAddSkill={addNewSkillHandler} />
      )}
    </div>
  );
};

export default Skills;
