import { useState, useContext, useEffect } from "react";
import SkillItem from "../SkillItem/SkillItem";
import { IsEditModeEnabled } from "../../EditModeContext";
import styles from "./Skills.module.css";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([]);
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  // const addNewSkill = (newSkill) => {
  //   setSkillsList([...skillsList, newSkill]);
  // };

  // const deleteSkill = (recievedIndex) => {
  //   const updatedList = skillsList.filter(
  //     (item, index) => recievedIndex !== index
  //   );
  //   setSkillsList(updatedList);
  // };
  const updateSkill = async (id, updatedSkill) => {
    const formData = new FormData();
    formData.append("skill", updatedSkill);

    await fetch(
      `http://localhost:3000/api/portfolio/experience/updateSkillItems/${id}`,
      {
        method: "PATCH",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .catch((error) => {
        console.log(error);
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
      .then((jsonData) => console.log(jsonData))
      .catch((error) => {
        console.log(error);
      });
  };
  const addNewSkill = async (skillTitle) => {

    await fetch(`http://localhost:3000/api/portfolio/experience/AddSkillItem`, {
      method: "POST",
      body: JSON.stringify({"skill":skillTitle}),
      headers:{
        "Content-Type":"application/json",
      }
    })
      .then((res) => {
        res.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        setSkillsList([...skillsList, jsonData]);
      })
      .catch((error) => {
        console.log(error);
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
        console.log("Skills list is ", jsonData);
        setSkillsList(jsonData);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {}, [skillsList]);

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
            index={index}
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
