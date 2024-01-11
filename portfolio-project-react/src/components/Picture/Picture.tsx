import React, { useState, useContext, useEffect, FC, ChangeEvent } from "react";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import Skills from "../Skills/Skills.tsx";
import { ERROR_EMPTY_FIELDS, ERROR_FILE_SIZE, ERROR_IMG_TO_BLOB, FETCH_FAILED, JOB_DESCRIPTION_PLACEHOLDER, LIMIT_FILE_SIZE, NAME_PLACEHOLDER, PICTURE_NOT_AVAILABLE, UPDATE_FAILED, UPDATE_SUCCESS, UPDATE_SUCCESS_MESSAGE } from "./constants.tsx";
import styles from "./Picture.module.css";
import profile_placeholder from "./assets/account.png";
import { BASE_URL, EMPTY_STRING } from "../../constants.tsx";
import { PictureSize } from "../../interface.tsx";

interface ProfileSectionProps {
  id: string;
  name: string;
  designation: string;
  updatedImage: string;
}
interface PictureComponentProps {
  size: PictureSize;
}
const Picture: FC<PictureComponentProps> = ({ size }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [imageUrl, setImageUrl] = useState(EMPTY_STRING);
  const [profileSectionData, setProfileSectionData] =
    useState<ProfileSectionProps>({
      id: EMPTY_STRING,
      name: EMPTY_STRING,
      designation: EMPTY_STRING,
      updatedImage: EMPTY_STRING,
    });
  const [isContentUpdated, setIsContentUpdated] = useState(false);

  const onImageChange = (e: ChangeEvent) => {
    if (e.target.files && e.target.files[0]) {
      setProfileSectionData({
        ...profileSectionData,
        updatedImage: e.target.files[0],
      });
    }
  };

  const updatePersonalInformation = async (formData: FormData) => {
    await fetch(
      `${BASE_URL}updatePersonalInfo/${profileSectionData.id}`,
      {
        method: "PATCH",
        body: formData,
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        if (resJson.message.code === LIMIT_FILE_SIZE) {
          alert(ERROR_FILE_SIZE);
        } else {
          imageUrlToBlob(profileSectionData.updatedImage).then((blob) => {
            if (blob) {
              setImageUrl(URL.createObjectURL(blob));
              alert(UPDATE_SUCCESS + resJson);
            }
          });
        }
      })
      .catch((error) => {
        alert(UPDATE_FAILED + error);
      });
  };

  async function imageUrlToBlob(imageUrl: string): Promise<Blob | null> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error(ERROR_IMG_TO_BLOB, error);
      return null;
    }
  }

  const fetchPersonalInformation = async () => {
    await fetch(
      `${BASE_URL}getPersonalInfo`,
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
        alert(FETCH_FAILED);
      });
  };

  const arrayBufferToBase64 = (buffer: Buffer) => {
    var binary = EMPTY_STRING;
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b: number) => (binary += String.fromCharCode(b)));
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
          id: EMPTY_STRING,
          name: EMPTY_STRING,
          designation: EMPTY_STRING,
          updatedImage: EMPTY_STRING,
        });
        setImageUrl(EMPTY_STRING);
        fetchPersonalInformation();
        alert(ERROR_EMPTY_FIELDS);
      }
    }
  }, [isEditModeEnabled]);

  return (
    <div className={styles.pictureSection}>
      <div className={styles.imageContainer}>
        {imageUrl.length > 0 ? (
          <img
            src={imageUrl}
            alt={PICTURE_NOT_AVAILABLE}
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
