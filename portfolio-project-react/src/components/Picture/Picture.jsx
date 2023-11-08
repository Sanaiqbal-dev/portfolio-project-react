import { useState } from "react";
import { JOB_TITLE, NAME, PLACEHOLDER_JOB_DESCRIPTION, PLACEHOLDER_NAME } from "./constants";
import styles from "./Picture.module.css";
import Skills from "../Skills/Skills";

const Picture = (props) => {

  const { isEdit, url, size } = props;

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
      {isEdit && (
        <input
          className={styles.changeImage}
          type="file"
          accept="image/*"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
      )}
      {isEdit ? (
        <input
          className={styles.changeName}
          placeholder={PLACEHOLDER_NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <h2>{name}</h2>
      )}
      {isEdit ? (
        <input
          className={styles.changeDesignation}
          placeholder={PLACEHOLDER_JOB_DESCRIPTION}
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      ) : (
        <h3>{designation}</h3>
      )}

      <Skills isEdit={isEdit} />
    </div>
  );
};

export default Picture;
