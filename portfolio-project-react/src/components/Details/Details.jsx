import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";

const Details = ({ isEditModeEnabled }) => {
  return (
    <div className={styles.detailsSection}>
      <About isEditModeEnabled={isEditModeEnabled} />
      <WorkExperience isEditModeEnabled={isEditModeEnabled} />
    </div>
  );
};

export default Details;
