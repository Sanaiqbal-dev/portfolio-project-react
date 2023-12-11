import { useState, useContext, useEffect } from "react";
import { IsEditModeEnabled } from "../../EditModeContext";
import Skills from "../Skills/Skills";
import {
  JOB_DESCRIPTION_PLACEHOLDER,
  NAME_PLACEHOLDER,
} from "./constants";
import styles from "./Picture.module.css";
import profile_placeholder from "./assets/account.png";

const Picture = ({ size }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [id, setId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [updatedImage, setUpdatedImage] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));

      setUpdatedImage(e.target.files[0]);
  
    }
  };

  const uploadPersonalInformation = async(formData) => {
    await fetch(`http://localhost:3000/api/portfolio/experience/addPersonalInfo`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => {
        res.json();
      })
      .then((jsonData) => {
        alert("Sucessfully added new user information.");
      })
      .catch((error) => {
        alert("Failed to add new user information.");
      });
  };

  
  const updatePersonalInformation = async (formData) => {
     try {
       const response = await fetch(
         `http://localhost:3000/api/portfolio/experience/updatePersonalInfo/${id}`,
         {
           method: "PATCH",
           body: formData,
         }
       );

       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       const data = await response.json();
       alert("Personal information updated");
     } catch (error) {
       alert("Failed to update personal information");
     }
  };

  const fetchPersonalInformation = async () => {
    await fetch(
      `http://localhost:3000/api/portfolio/experience/getPersonalInfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setId(jsonData[0]._id);
        setName(jsonData[0].name);
        setDesignation(jsonData[0].designation);
        setUpdatedImage(jsonData[0].image);

        var base64Flag = "data:image/jpeg;base64,";
        var imagebase64 = arrayBufferToBase64(jsonData[0].image.data.data);

        setImageUrl(base64Flag + imagebase64);
      })
      .catch((error) => {
       alert("Failed to fetch user's personal information");
      });
  };

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };


  useEffect(() => {
    fetchPersonalInformation();
  }, []);

  useEffect(() => {
    if(!isEditModeEnabled && id && name && designation && updatedImage )
    {
       const formData = new FormData();
       formData.append("name", name);
       formData.append("designation", designation);
       formData.append("testImage", updatedImage);

       updatePersonalInformation(formData);
    }
  },[isEditModeEnabled])


  return (
    <div className={styles.pictureSection}>
      <div className={styles.imageContainer}>
        {imageUrl.length > 0 ? (
          <img
            src={imageUrl}
            alt="No Profile Picture available"
            style={{ width: size.width, height: size.height }}
          />
        ) : (
          <img
            src={profile_placeholder}
            style={{ width: size.width, height: size.height }}
          />
        )}
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

      <Skills />
    </div>
  );
};

export default Picture;
