import React, { useState, useEffect, useMemo } from "react";
import About from "../About/About.tsx";
import WorkExperience from "../WorkExperience/WorkExperience.tsx";
import styles from "./Details.module.css";
import { WORK_EXPERIENCE_ITEM_ADDED, NO_OF_DAYS } from "./constants.tsx";

interface WorkExperienceProps {
  _id:string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
}
interface NoOfDays {
  years: number;
  months: number;
}
const Details = () => {
  const [originalWorkExperienceList, setOriginalWorkExperienceList] = useState<
    WorkExperienceProps[]
  >([]);
  const calculateTotalExp = () => {
    const arrayNoOfDays = originalWorkExperienceList.map(
      (item: WorkExperienceProps) => {
        return calculateNoOfdays(item.startDate, item.endDate);
      }
    );

    const totalExperienceInDays: number = arrayNoOfDays.reduce(
      (previousValue, currentValue, index) => previousValue + currentValue,
      0
    );

    const years: number = Math.floor(totalExperienceInDays / NO_OF_DAYS);

    const remainingDays: number = totalExperienceInDays % NO_OF_DAYS;

    const months: number = Math.floor(remainingDays / 30);

    return { years: years, months: months };
  };

  const calculateNoOfdays = (startDate: string, endDate: string) => {
    if (endDate === "" || endDate === "Present") {
      // endDate = new Date().getTime();
      return (
        (new Date().getTime() - new Date(startDate).getTime()) /
        (1000 * 3600 * 24)
      );
    }
    return (
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };

  const [searchText, setSearchText] = useState<string>("");

  const filteredWorkExperienceList: WorkExperienceProps[] = useMemo(
    () =>
      originalWorkExperienceList.filter((item: any) =>
        item.companyName.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, originalWorkExperienceList]
  );

  const totalWorkExperience: NoOfDays = useMemo(
    () => calculateTotalExp(),
    [originalWorkExperienceList]
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
  const addNewWorkExperienceHandler = async (
    newWorkExperience: WorkExperienceProps
  ) => {
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
  const updateWorkExperienceHandler = async (
    id: string,
    updatedWorkExperienceItem: WorkExperienceProps
  ) => {
    await fetch(`http://localhost:3000/api/portfolio/experience/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedWorkExperienceItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {
        const updatedList = originalWorkExperienceList.map((item: any) => {
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
  const deleteWorkExperienceHandler = async (workExperienceItemId : string) => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/delete/${workExperienceItemId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const filteredList = originalWorkExperienceList.filter(
          (item: WorkExperienceProps) => item._id !== workExperienceItemId
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
