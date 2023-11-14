import { useState } from "react";
import Skills from "../Skills/Skills";
import { JOB_TITLE_CONTENT, NAME_CONTENT, JOB_DESCRIPTION_PLACEHOLDER, NAME_PLACEHOLDER } from "./constants";
import styles from "./Picture.module.css";

const Picture = (props) => {

  const { isEditModeEnabled, url, size } = props;

  const [imageUrl, setImageUrl] = useState(url);
  const [name, setName] = useState(NAME_CONTENT);
  const [designation, setDesignation] = useState(JOB_TITLE_CONTENT);
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
      {isEditModeEnabled && (
        <input
          className={styles.changeImage}
          type="file"
          accept="image/*"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
      )}
      {isEditModeEnabled ? (
        <input
          className={styles.changeName}
          placeholder={NAME_PLACEHOLDER}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <h2>{name}</h2>
      )}
      {isEditModeEnabled ? (
        <input
          className={styles.changeDesignation}
          placeholder={JOB_DESCRIPTION_PLACEHOLDER}
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      ) : (
        <h3>{designation}</h3>
      )}

      <Skills isEditModeEnabled={isEditModeEnabled} />
    </div>
  );
};

export default Picture;
