import styles from "./Details.module.css";
import About from "../About/About";
import WorkExp from "../WorkExp/WorkExp";

const Details = ({ isEdit }) => {
  return (
    <div className={styles.detailsSection}>
      <About isEdit={isEdit} />

      <WorkExp isEdit={isEdit} />
    </div>
  );
};

export default Details;
