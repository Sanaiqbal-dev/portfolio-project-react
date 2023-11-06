import { useState } from "react";
import {
  ABOUT,
  ABOUT_HEADING,
  CONTACT,
  CONTACT_HEADING,
  EMAIL,
  EMAIL_HEADING,
  EXP_HEADING,
} from "./constants";
import styles from "./Details.module.css";
const Details = ({ isEdit }) => {

   const [aboutContent, setAboutContent] = useState(ABOUT);

   const [phone, setPhone] = useState(CONTACT);
   const [email, setEmail] = useState(EMAIL);
   const [showExperienceForm, setShowExperienceForm] = useState(false);

   const SubmitWorkExpForm = (e) => {
     console.log(e.target.value);
   };

  return (
    <div className={styles.detailsSection}>
      <h1 className={styles.titleAbout}>{ABOUT_HEADING}</h1>
      {isEdit ? (
        <textarea
          onChange={(e) => {
            setAboutContent(e.target.value);
          }}
        >
          {aboutContent}
        </textarea>
      ) : (
        <p id="intro-data">{aboutContent}</p>
      )}
      <h3 className={styles.inlineDiv}>{CONTACT_HEADING}</h3>
      {isEdit ? (
        <input
          placeholder="Enter contact number:"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <p class="inline-div">{phone}</p>
      )}

      <br />
      <h3 className={styles.inlineDiv}>{EMAIL_HEADING}</h3>
      {isEdit ? (
        <input
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <p class="inline-div">{email}</p>
      )}
      <div className={styles.details}>
        <div>
          <h1>{EXP_HEADING}</h1>
          <div className="experience-container">
            {!showExperienceForm && (
              <button
                className="addExperience"
                onClick={(e) => {
                  setShowExperienceForm(true);
                }}
              >
                Add Experience
              </button>
            )}
          </div>

          {showExperienceForm && (
            <div className="show-experience-form">
              <form
                class="workExpForm"
                onSubmit={(e) => SubmitWorkExpForm(e)}
              >
                <div class="closeBtn">
                  <button
                    onClick={(e) => {
                      setShowExperienceForm(false);
                    }}
                  >
                    X
                  </button>
                </div>
                <h3>Fill work experience details:</h3>
                <input
                  type="text"
                  pattern=".*\S+.*"
                  id="companyName"
                  required
                  placeholder="Enter your company name:"
                />
                <div class="dateSection">
                  <div class="dateSectionLabels">
                    <label>Start Date:</label>
                    <label>End Date:</label>
                    <label></label>
                  </div>
                  <div class="dateSectionValues">
                    <input type="date" id="start-date" required />
                    <input type="date" id="end-date" required />
                    <div class="checkbox-section">
                      <input type="checkbox" class="checkbox" id="checkbox" />
                      <label class="label-employer">Current Employer</label>
                    </div>
                  </div>
                </div>
                <textarea
                  id="description"
                  required
                  placeholder="Add job description:"
                ></textarea>
                <p class="alert-text">Enter valid job description.</p>
                <button
                  class="save-btn"
                  id="save-info"
                  type="submit"
                  onClick={(e) => {
                    setShowExperienceForm(false);
                  }}
                >
                  <p id="save-text">SAVE</p>
                  <div class="loader"></div>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div id="skills">
        <div>
          <h1>Skills</h1>

          <div className="experience-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Details;
