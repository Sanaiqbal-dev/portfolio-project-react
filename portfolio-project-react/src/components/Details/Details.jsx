import { useState, useEffect } from "react";
import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";

const Details = () => {
  const [totalWorkExperience, setTotalWorkExperience] = useState({
    years: 0,
    months: 0,
  });
  const [workExperienceList, setWorkExperienceList] = useState([]);

  useEffect(() => {
    const calculateTotalExp = () => {
      const arrayNoOfDays = workExperienceList.map((item) => {
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
      if (endDate === "") {
        endDate = new Date().getTime();
      }
      return (
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 3600 * 24)
      );
    };

    calculateTotalExp();
  }, [workExperienceList]);


  return (
    <div className={styles.detailsSection}>
      <About
        isEditModeEnabled={isEditModeEnabled}
        totalWorkExperience={totalWorkExperience}
      />
      <WorkExperience
        isEditModeEnabled={isEditModeEnabled}
        workExperienceList={workExperienceList}
        onUpdateWorkExperienceList={setWorkExperienceList}
      />
    </div>
  );
};

export default Details;
