import styles from "./Details.module.css";
import About from "../About/About";
import WorkExp from "../WorkExp/WorkExp";
import { useState } from "react";

const Details = ({ isEdit }) => {
  const [totalExp, setTotalExp] = useState([0,0]);

  const UpdateTotalExperience = (totalExpRcvd) => {
    setTotalExp(totalExpRcvd);
  };
  
  return (
    <div className={styles.detailsSection}>
      <About isEdit={isEdit} totalExp={totalExp} />

      <WorkExp
        isEdit={isEdit}
        totalExp={totalExp}
        onUpdateTotalExp={UpdateTotalExperience}
      />
    </div>
  );
};

export default Details;
