
import React from "react";

const Picture = (props) => {
  const {url, size} = props;

  return (
    <div className="picture-section">
      <div className="image-container">
        <img id="profile-img" src={url} style={{ width: size, height: size }} />
      </div>
      <h2 id="name">Sana Iqbal</h2>
      <h3 id="job-title">Software Engineer</h3>
    </div>
  );
};

export default Picture;
