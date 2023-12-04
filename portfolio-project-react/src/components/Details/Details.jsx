import { useState, useEffect, useContext } from "react";
import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import { IsEditModeEnabled } from "../../EditModeContext";
import styles from "./Details.module.css";

const Details = () => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);

  const [totalWorkExperience, setTotalWorkExperience] = useState({
    years: 0,
    months: 0,
  });

  let locallyStoredData = localStorage.getItem("work-experience-list")
    ? JSON.parse(localStorage.getItem("work-experience-list"))
    : [];

  const [originalWorkExperienceList, setOriginalWorkExperienceList] =
    useState(locallyStoredData);

  const [filteredWorkExperienceList, setfilteredWorkExperienceList] = useState(
    originalWorkExperienceList
  );

  let searchText_ = "";

  const searchHandler = (searchText) => {
    searchText_ = searchText.toLowerCase();
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
    if (searchText_.length === 0)
      setfilteredWorkExperienceList(originalWorkExperienceList);
  }, [originalWorkExperienceList]);

  useEffect(() => {
    setfilteredWorkExperienceList(originalWorkExperienceList);
  }, [isEditModeEnabled]);
  return (
    <div className={styles.detailsSection}>
      <About totalWorkExperience={totalWorkExperience} />
      <WorkExperience
        originalWorkExperienceList={originalWorkExperienceList}
        filteredWorkExperienceList={filteredWorkExperienceList}
        onUpdateWorkExperienceList={setOriginalWorkExperienceList}
        onSearchWorkExperience={searchHandler}
      />
    </div>
  );
};

export default Details;
