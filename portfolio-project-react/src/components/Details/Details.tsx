import React, { useState, useEffect, useMemo } from "react";
import About from "../About/About.tsx";
import WorkExperience from "../WorkExperience/WorkExperience.tsx";
import styles from "./Details.module.css";
import {
  WORK_EXPERIENCE_ITEM_ADDED,
  NO_OF_DAYS,
  FETCH_FAILED,
  ADD_FAILED,
  UPDATE_FAILED,
  DELETE_FAILED,
  DAYS_PER_MONTH,
} from "./constants.tsx";
import {
  totalWorkExperience,
  WorkExperienceItemProps,
} from "../../interface.tsx";
import { BASE_URL, EMPTY_STRING, PRESENT_TEXT } from "../../constants.tsx";

const Details = () => {
  const [originalWorkExperienceList, setOriginalWorkExperienceList] = useState<
    WorkExperienceItemProps[]
  >([]);
  const calculateTotalExp = () => {
    const arrayNoOfDays = originalWorkExperienceList.map(
      (item: WorkExperienceItemProps) => {
        return calculateNoOfdays(item.startDate, item.endDate);
      }
    );

    const totalExperienceInDays: number = arrayNoOfDays.reduce(
      (previousValue, currentValue, index) => previousValue + currentValue,
      0
    );

    const years: number = Math.floor(totalExperienceInDays / NO_OF_DAYS);

    const remainingDays: number = totalExperienceInDays % NO_OF_DAYS;

    const months: number = Math.floor(remainingDays / DAYS_PER_MONTH);

    return { years: years, months: months };
  };

  const calculateNoOfdays = (startDate: string, endDate: string) => {
    if (endDate === EMPTY_STRING || endDate === PRESENT_TEXT) {
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

  const [searchText, setSearchText] = useState(EMPTY_STRING);

  const filteredWorkExperienceList: WorkExperienceItemProps[] = useMemo(
    () =>
      originalWorkExperienceList.filter((item: WorkExperienceItemProps) =>
        item.companyName.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, originalWorkExperienceList]
  );

  const totalWorkExperience: totalWorkExperience = useMemo(
    () => calculateTotalExp(),
    [originalWorkExperienceList]
  );

  const fetchDataFromDB = async () => {
    await fetch(`${BASE_URL}getAll`)
      .then((res) => res.json())
      .then((jsonData) => {
        setOriginalWorkExperienceList(jsonData);
      })
      .catch((error) => {
        alert(FETCH_FAILED);
      });
  };
  const addNewWorkExperienceHandler = async (
    newWorkExperience: WorkExperienceItemProps
  ) => {
    await fetch(`${BASE_URL}post`, {
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
        alert(ADD_FAILED);
      });
  };
  const updateWorkExperienceHandler = async (
    id: string,
    updatedWorkExperienceItem: WorkExperienceItemProps
  ) => {
    await fetch(`${BASE_URL}update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedWorkExperienceItem),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {
        const updatedList: WorkExperienceItemProps[] =
          originalWorkExperienceList.map((item: WorkExperienceItemProps) => {
            if (item._id === id) {
              item.companyName = updatedWorkExperienceItem.companyName;
              item.startDate = updatedWorkExperienceItem.startDate;
              item.endDate = updatedWorkExperienceItem.endDate;
              item.isCurrentEmployer =
                updatedWorkExperienceItem.endDate === PRESENT_TEXT
                  ? true
                  : false;
              item.description = updatedWorkExperienceItem.description;
            }
            return item;
          });

        setOriginalWorkExperienceList(updatedList);
      })
      .catch((error) => alert(UPDATE_FAILED));
  };
  const deleteWorkExperienceHandler = async (workExperienceItemId: string) => {
    await fetch(
      `${BASE_URL}delete/${workExperienceItemId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        const filteredList = originalWorkExperienceList.filter(
          (item: WorkExperienceItemProps) => item._id !== workExperienceItemId
        );
        setOriginalWorkExperienceList(filteredList);
      })
      .catch((error) => {
        alert(DELETE_FAILED);
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
