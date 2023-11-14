import About from "../About/About";
import WorkExperience from "../WorkExperience/WorkExperience";
import styles from "./Details.module.css";

const Details = ({ isEditModeEnabled }) => {
  const [totalExp, setTotalExp] = useState([0,0]);

  const UpdateTotalExperience = (totalExpRcvd) => {
    setTotalExp(totalExpRcvd);
  };
  
  return (
    <div className={styles.detailsSection}>
      <About isEditModeEnabled={isEditModeEnabled} totalExp={totalExp} />
      <WorkExperience isEditModeEnabled={isEditModeEnabled}
        totalExp={totalExp}
        onUpdateTotalExp={UpdateTotalExperience}
      />
    </div>
  );
};

export default Details;
