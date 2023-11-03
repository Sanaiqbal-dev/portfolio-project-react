import { useState } from "react";

const Picture = ({ isEdit, url, size }) => {
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
    <div className="picture-section">
      <div className="image-container">
        <img
          src={imageUrl}
          style={{ width: size, height: size }}
        />
      </div>
      {isEdit && (
        <input className="change-image" type="file" accept="image/*" onChange={(e) => {onImageChange(e)}} />
      )}
      {isEdit ? <input className="change-name" placeholder="Enter name:" value={name} onChange={(e) => setName(e.target.value)}/> :<h2>{name}</h2>}
      {isEdit ? <input className="change-designation" placeholder="Enter designation" value={designation} onChange={(e) => setDesignation(e.target.value)}/> :<h3>{designation}</h3>}
    </div>
  );
};

export default Picture;
