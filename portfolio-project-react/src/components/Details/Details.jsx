import { useState } from "react";
import About from "../About/About";
import WorkExp from "../WorkExp/WorkExp";
import styles from "./Details.module.css";

const Details = () => {
  const [totalExp, setTotalExp] = useState([0, 0]);

  const UpdateTotalExperience = (totalExpRcvd) => {
    setTotalExp(totalExpRcvd);
  };
  
  return (
    <div className={styles.detailsSection}>
      <About totalExp={totalExp} />
      <WorkExp totalExp={totalExp} onUpdateTotalExp={UpdateTotalExperience} />
    </div>
  );
};

export default Details;
