import { useState, useEffect, useMemo } from "react";
import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";
import { WORK_EXPERIENCE_ITEM_ADDED } from "./constants";

const Details = () => {
  const [originalWorkExperienceList, setOriginalWorkExperienceList] = useState(
    []
  );
  const calculateTotalExp = () => {
    const arrayNoOfDays = originalWorkExperienceList.map((item) => {
      return calculateNoOfdays(item.startDate, item.endDate);
    });

    const totalExperienceInDays = arrayNoOfDays.reduce(
      (previousValue, currentValue, index) => previousValue + currentValue,
      0
    );

    const years = Math.floor(totalExperienceInDays / 365);

    const remainingDays = totalExperienceInDays % 365;

    const months = Math.floor(remainingDays / 30);

    return { years: years, months: months };
  };

  const calculateNoOfdays = (startDate, endDate) => {
    if (endDate === "" || endDate === "Present") {
      endDate = new Date().getTime();
    }
    return (
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };

  const [searchText, setSearchText] = useState("");

  const filteredWorkExperienceList = useMemo(
    () =>
      originalWorkExperienceList.filter((item) =>
        item.companyName.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, originalWorkExperienceList]
  );

  const totalWorkExperience = useMemo(() =>
    calculateTotalExp(originalWorkExperienceList, [originalWorkExperienceList])
  );

  const fetchDataFromDB = async () => {
    await fetch(`http://localhost:3000/api/portfolio/experience/getAll`)
      .then((res) => res.json())
      .then((jsonData) => {
        setOriginalWorkExperienceList(jsonData);
      })
      .catch((error) => {
        alert("Failed to fetch work experience data from database.");
      });
  };
  const addNewWorkExperienceHandler = async (newWorkExperience) => {
    await fetch(`http://localhost:3000/api/portfolio/experience/post`, {
      method: "POST",
      body: JSON.stringify(newWorkExperience),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {
        alert(WORK_EXPERIENCE_ITEM_ADDED);
        setOriginalWorkExperienceList([
          ...originalWorkExperienceList,
          jsonData,
        ]);
      })
      .catch((error) => {
        alert("Failed to add new work Experience item.");
      });
  };
  const updateWorkExperienceHandler = async (id, updatedWorkExperienceItem) => {
    await fetch(`http://localhost:3000/api/portfolio/experience/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedWorkExperienceItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {
        const updatedList = originalWorkExperienceList.map((item) => {
          if (item._id === id) {
            item.companyName = updatedWorkExperienceItem.companyName;
            item.startDate = updatedWorkExperienceItem.startDate;
            item.endDate = updatedWorkExperienceItem.endDate;
            item.isCurrentEmployer =
              updatedWorkExperienceItem.endDate === "Present" ? true : false;
            item.description = updatedWorkExperienceItem.description;
          }
          return item;
        });

        setOriginalWorkExperienceList(updatedList);
      })
      .catch((error) => alert("Failed to updated requested data in database."));
  };
  const deleteWorkExperienceHandler = async (workExperienceItemId) => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/delete/${workExperienceItemId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const filteredList = originalWorkExperienceList.filter(
          (item) => item._id !== workExperienceItemId
        );
        setOriginalWorkExperienceList(filteredList);
      })
      .catch((error) => {
        alert("Failed to delete requested data in database.");
      });
  };

  useEffect(() => {
    fetchDataFromDB();
  }, []);

  return (
    <div className={styles.detailsSection}>
      <About totalWorkExperience={totalWorkExperience} />
      <WorkExperience
        filteredWorkExperienceList={filteredWorkExperienceList}
        onAddNewWorkExperience={addNewWorkExperienceHandler}
        onUpdateWorkExperience={updateWorkExperienceHandler}
        onDeleteWorkExperience={deleteWorkExperienceHandler}
        onSearchWorkExperience={setSearchText}
      />
    </div>
  );
};

export default Details;
