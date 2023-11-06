import { useState } from "react";
import { JOB_TITLE, NAME } from "./constants";
import styles from "./Picture.module.css";

const Picture = (props) => {

  const { isEdit, url, size } = props;

  const [imageUrl, setImageUrl] = useState(url);
  const [name, setName] = useState("Sana Iqbal");
  const [designation, setDesignation] = useState("Software Engineer");
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      // setImageUrl(e.target.value);
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
          placeholder="Enter name:"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <h2>{name}</h2>
      )}
      {isEdit ? (
        <input
          className={styles.changeDesignation}
          placeholder="Enter designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      ) : (
        <h3>{designation}</h3>
      )}
    </div>
  );
};

export default Picture;
