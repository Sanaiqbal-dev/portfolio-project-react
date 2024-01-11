import React, { useState, useContext, useEffect } from "react";
import SkillItem from "../SkillItem/SkillItem.tsx";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import styles from "./Skills.module.css";
import { BASE_URL } from "../../constants.tsx";
import { ADD_FAILED, DELETE_FAILED, FETCH_FAILED, UPDATE_FAILED } from "./constants.tsx";

interface SkillData {
  _id: string;
  skill: string;
}

const Skills = () => {
  const [skillsList, setSkillsList] = useState<SkillData[]>([]);
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const updateSkillHandler = async (id: string, updatedSkill: string) => {
    await fetch(`${BASE_URL}updateSkillItem/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedSkill),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {})
      .catch((error) => {
        alert(UPDATE_FAILED);
      });
  };
  const deleteSkillHandler = async (id: string) => {
    await fetch(`${BASE_URL}deleteSkillItem/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((jsonData) => {
        const updatedList = skillsList.filter((item) => item._id !== id);
        setSkillsList(updatedList);
      })
      .catch((error) => {
        alert(DELETE_FAILED);
      });
  };
  const addNewSkillHandler = async (skillTitle: string) => {
    await fetch(`${BASE_URL}AddSkillItem`, {
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
        alert(ADD_FAILED);
      });
  };

  const fetchSkillsList = async () => {
    await fetch(`${BASE_URL}getSkillsList`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((jsonData) => {
        setSkillsList(jsonData);
      })
      .catch((error) => alert(FETCH_FAILED));
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
