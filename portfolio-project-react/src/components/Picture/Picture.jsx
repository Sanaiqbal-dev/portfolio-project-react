import { useState, useContext, useEffect } from "react";
import { IsEditModeEnabled } from "../../EditModeContext";
import Skills from "../Skills/Skills";
import { JOB_DESCRIPTION_PLACEHOLDER, NAME_PLACEHOLDER } from "./constants";
import styles from "./Picture.module.css";
import profile_placeholder from "./assets/account.png";

const Picture = ({ size }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [imageUrl, setImageUrl] = useState("");
  const [profileSectionData, setProfileSectionData] = useState({
    id: "",
    name: "",
    designation: "",
    updatedImage: "",
  });
  const [isContentUpdated, setIsContentUpdated] = useState(false);

  const onImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileSectionData({
        ...profileSectionData,
        updatedImage: e.target.files[0],
      });
    }
  };

  const updatePersonalInformation = async (formData) => {
    const response = await fetch(
      `http://localhost:3000/api/portfolio/experience/updatePersonalInfo/${profileSectionData.id}`,
      {
        method: "PATCH",
        body: formData,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        if (resJson.message.code === "LIMIT_FILE_SIZE") {
          alert("Please choose profile picture with file size less than 16mb.");
        } else {
          setImageUrl(URL.createObjectURL(profileSectionData.updatedImage));
          alert("Personal information updated", resJson);
        }
      })
      .catch((error) => {
        alert("Failed to update Profile information.", error);
      });
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
        setProfileSectionData({
          id: jsonData[0]._id,
          name: jsonData[0].name,
          designation: jsonData[0].designation,
          updatedImage: jsonData[0].image,
        });

        var base64Flag = "data:image/jpeg;base64,";
        var imagebase64 = arrayBufferToBase64(jsonData[0].image.data.data);

        setImageUrl(base64Flag + imagebase64);
      })
      .catch((error) => {
        alert("Failed to fetch user's profile information");
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
    if (!isEditModeEnabled && isContentUpdated) {
      if (
        profileSectionData.id &&
        profileSectionData.name &&
        profileSectionData.designation &&
        profileSectionData.updatedImage
      ) {
        const formData = new FormData();
        formData.append("name", profileSectionData.name);
        formData.append("designation", profileSectionData.designation);
        formData.append("testImage", profileSectionData.updatedImage);

        updatePersonalInformation(formData);
      } else {
        setProfileSectionData({
          id: "",
          name: "",
          designation: "",
          updatedImage: "",
        });
        setImageUrl("");
        fetchPersonalInformation();
        alert("Cannot update profile data with empty fields.");
      }
    }
  }, [isEditModeEnabled]);

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
            setIsContentUpdated(true);
          }}
        />
      )}
      {isEditModeEnabled ? (
        <input
          className={styles.changeName}
          placeholder={NAME_PLACEHOLDER}
          value={profileSectionData.name}
          onChange={(e) => {
            setProfileSectionData({
              ...profileSectionData,
              name: e.target.value,
            });
            setIsContentUpdated(true);
          }}
        />
      ) : (
        <h2>{profileSectionData.name}</h2>
      )}
      {isEditModeEnabled ? (
        <input
          className={styles.changeDesignation}
          placeholder={JOB_DESCRIPTION_PLACEHOLDER}
          value={profileSectionData.designation}
          onChange={(e) => {
            setProfileSectionData({
              ...profileSectionData,
              designation: e.target.value,
            });
            setIsContentUpdated(true);
          }}
        />
      ) : (
        <h3>{profileSectionData.designation}</h3>
      )}

      <Skills />
    </div>
  );
};

export default Picture;
