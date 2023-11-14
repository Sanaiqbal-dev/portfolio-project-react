import { useState } from "react";
import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";

const Details = () => {
  const [totalWorkExperience, setTotalWorkExperience] = useState([0, 0]);

  return (
    <div className={styles.detailsSection}>
      <About totalWorkExperience={totalWorkExperience} />
      <WorkExperience onUpdateTotalExperience={setTotalWorkExperience} />
    </div>
  );
};

export default Details;
