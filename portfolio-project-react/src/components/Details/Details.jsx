import { useState, useEffect } from "react";
import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";

const Details = () => {
  const [totalWorkExperience, setTotalWorkExperience] = useState({
    years: 0,
    months: 0,
  });

   let locallyStoredData = localStorage.getItem("work-experience-list")
     ? JSON.parse(localStorage.getItem("work-experience-list"))
     : [];

  ///////////////////////////////

  const fetchDataFromDB = async () => {
    await fetch(`http://localhost:3000/api/portfolio/experience/getAll`)
      .then((response) => response.json())
      .then((jsonData) => {
        // updateLocalData(jsonData);
        // locallyStoredData = jsonData;
            setOriginalWorkExperienceList(jsonData);

        
      })
      .catch((error) => {
        console.log(error);
        // getElement("#preloader").style.display = "none";
      });
  };

  useEffect(() => {
    fetchDataFromDB();
    // setOriginalWorkExperienceList(locallyStoredData);
  }, []);

  /////////////////////////////////////
 

  const [originalWorkExperienceList, setOriginalWorkExperienceList] =
    useState([]);

  const [filteredWorkExperienceList, setfilteredWorkExperienceList] = useState(
    originalWorkExperienceList
  );

  const [searchText, setSearchText] = useState("");

  const searchHandler = (searchText) => {
    setSearchText(searchText);
    const SearchedList = originalWorkExperienceList.filter((item) =>
      item.companyName.includes(searchText)
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

      localStorage.setItem(
        "work-experience-list",
        JSON.stringify(originalWorkExperienceList)
      );
    };

    const calculateNoOfdays = (startDate, endDate) => {
      if (endDate === "") {
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
        onUpdateWorkExperienceList={setOriginalWorkExperienceList}
        onSearchWorkExperience={searchHandler}
      />
    </div>
  );
};

export default Details;
