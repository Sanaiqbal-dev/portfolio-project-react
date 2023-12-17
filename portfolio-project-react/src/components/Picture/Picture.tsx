import React, { useState, useContext, useEffect, FC } from "react";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import Skills from "../Skills/Skills.tsx";
import { JOB_DESCRIPTION_PLACEHOLDER, NAME_PLACEHOLDER } from "./constants.tsx";
import styles from "./Picture.module.css";
import profile_placeholder from "./assets/account.png";

interface ProfileSectionProps {
  id: string;
  name: string;
  designation: string;
  updatedImage: string;
}
interface PictureComponentProps{
  size :{
  width:string;
  height:string;
  }
}
const Picture: FC<PictureComponentProps> = ({ size }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [profileSectionData, setProfileSectionData] =
    useState<ProfileSectionProps>({
      id: "",
      name: "",
      designation: "",
      updatedImage: "",
    });
  const [isContentUpdated, setIsContentUpdated] = useState<boolean>(false);

  const onImageChange = (e:any) => {
    if (e.target.files[0]) {
      setProfileSectionData({
        ...profileSectionData,
        updatedImage: e.target.files[0],
      });
    }
  };

  const updatePersonalInformation = async (formData:FormData) => {
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
          imageUrlToBlob(profileSectionData.updatedImage).then((blob) => {
            if (blob) {
              setImageUrl(URL.createObjectURL(blob));
              alert("Personal information updated" + resJson);
            }
          });
        }
      })
      .catch((error) => {
        alert("Failed to update Profile information." + error);
      });
  };

  async function imageUrlToBlob(imageUrl: string): Promise<Blob | null> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error converting image URL to Blob:", error);
      return null;
    }
  }

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

  const arrayBufferToBase64 = (buffer:Buffer) => {
    var binary : string = "";
    var bytes : any = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b:any) => (binary += String.fromCharCode(b)));
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
