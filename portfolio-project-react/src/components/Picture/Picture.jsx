import { useState, useContext } from "react";
import { IsEditMode } from "../../IsEditMode";
import {
  JOB_TITLE,
  NAME,
  PLACEHOLDER_JOB_DESCRIPTION,
  PLACEHOLDER_NAME,
} from "./constants";
import styles from "./Picture.module.css";
import Skills from "../Skills/Skills";

const Picture = ({ url, size }) => {
  const isEditMode = useContext(IsEditMode);
  const [imageUrl, setImageUrl] = useState(url);
  const [name, setName] = useState(NAME);
  const [designation, setDesignation] = useState(JOB_TITLE);
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className={styles.pictureSection}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} style={{ width: size, height: size }} />
      </div>
      {isEditMode && (
        <input
          className={styles.changeImage}
          type="file"
          accept="image/*"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
      )}
      {isEditMode ? (
        <input
          className={styles.changeName}
          placeholder={PLACEHOLDER_NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <h2>{name}</h2>
      )}
      {isEditMode ? (
        <input
          className={styles.changeDesignation}
          placeholder={PLACEHOLDER_JOB_DESCRIPTION}
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      ) : (
        <h3>{designation}</h3>
      )}

      <Skills/>
    </div>
  );
};

export default Picture;
