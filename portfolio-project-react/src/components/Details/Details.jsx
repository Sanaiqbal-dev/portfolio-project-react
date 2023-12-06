import { useState, useEffect } from "react";
import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";
import { WORK_EXPERIENCE_ITEM_ADDED } from "./constants";

const Details = () => {
  const [totalWorkExperience, setTotalWorkExperience] = useState({
    years: 0,
    months: 0,
  });

  const [originalWorkExperienceList, setOriginalWorkExperienceList] = useState(
    []
  );

  const [filteredWorkExperienceList, setfilteredWorkExperienceList] = useState(
    originalWorkExperienceList
  );

  const [searchText, setSearchText] = useState("");

  const fetchDataFromDB = async () => {
    await fetch(`http://localhost:3000/api/portfolio/experience/getAll`)
      .then((res) => res.json())
      .then((jsonData) => {
        setOriginalWorkExperienceList(jsonData);
      })
      .catch((error) => {
        alert("Failed to fetch work experience data from database.")
      });
  };

  useEffect(() => {
    fetchDataFromDB();
  }, []);

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
        console.log(jsonData);
        alert(WORK_EXPERIENCE_ITEM_ADDED);
        setOriginalWorkExperienceList([
          ...originalWorkExperienceList,
          jsonData,
        ]);
      })
      .catch((error) => {
        alert("Failed to add new work Experience item.")
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
        console.log(jsonData);
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
        console.log(jsonData);
        const filteredList = originalWorkExperienceList.filter(
          (item) => item._id !== workExperienceItemId
        );
        setOriginalWorkExperienceList(filteredList);
      })
      .catch((error) => {
        alert("Failed to delete requested data in database.")
      });
  };
  const searchHandler = (searchText) => {
    setSearchText(searchText);
    const SearchedList = originalWorkExperienceList.filter((item) =>
      item.companyName.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilteredWorkExperienceList(SearchedList);
  };

  useEffect(() => {
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

      setTotalWorkExperience({ years: years, months: months });
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

    calculateTotalExp();
  }, [originalWorkExperienceList]);

  useEffect(() => {
    if (searchText.length === 0)
      setfilteredWorkExperienceList(originalWorkExperienceList);
  });

  return (
    <div className={styles.detailsSection}>
      <About totalWorkExperience={totalWorkExperience} />
      <WorkExperience
        filteredWorkExperienceList={filteredWorkExperienceList}
        onAddNewWorkExperience={addNewWorkExperienceHandler}
        onUpdateWorkExperience={updateWorkExperienceHandler}
        onDeleteWorkExperience={deleteWorkExperienceHandler}
        onSearchWorkExperience={searchHandler}
      />
    </div>
  );
};

export default Details;
