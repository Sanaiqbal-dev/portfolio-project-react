import { useState } from "react";
import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";

const Details = ({ isEditModeEnabled }) => {
  const [totalWorkExperience, setTotalWorkExperience] = useState([0, 0]);

  const UpdateTotalExperience = (totalExperienceNewValue) => {
    setTotalWorkExperience(totalExperienceNewValue);
  };

  return (
    <div className={styles.detailsSection}>
      <About
        isEditModeEnabled={isEditModeEnabled}
        totalWorkExperience={totalWorkExperience}
      />
      <WorkExperience
        isEditModeEnabled={isEditModeEnabled}
        onUpdateTotalExperience={UpdateTotalExperience}
      />
    </div>
  );
};

export default Details;
