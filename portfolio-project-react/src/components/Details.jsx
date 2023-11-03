import { useState } from "react";

const Details = ({ isEdit }) => {
  const [aboutContent, setAboutContent] = useState(
    " I am a highly experienced Full Stack Web Developer with a proven track record of developing, designing, and integrating robust Web Applications using the latest technologies like React JS, Express JS, Node, MongoDB, etc. I have in-depth knowledge in this area and can provide responsive web application development services. I am also familiar with common framework APIs, dedicated to creating user-centric and innovative web-based solutions to drive business growth."
  );

  const [phone, setPhone] = useState("+92 333 1234567");
  const [email, setEmail] = useState("sana.iqbal@gmail.com");
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const SubmitWorkExpForm = (e) => {
    console.log(e.target.value);
  }
  return (
    <div className="details-section">
      <h1 class="title-about">About</h1>
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

      <h3 class="inline-div">Contact:</h3>
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

      <h3 class="inline-div">Email:</h3>
      {isEdit ? (
        <input
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <p class="inline-div">{email}</p>
      )}

      <div id="details">
        <div>
          <h1>Work Experience</h1>

          <div className="experience-container">
            {!showExperienceForm && (
              <button
                className="add-experience"
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
              <form class="work-exp-form" onSubmit={(e) => SubmitWorkExpForm(e)}>
                <div class="close-btn">
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
                  id="company-name"
                  required
                  placeholder="Enter your company name:"
                />
                <div class="date-section">
                  <div class="date-section-labels">
                    <label>Start Date:</label>
                    <label>End Date:</label>
                    <label></label>
                  </div>
                  <div class="date-section-values">
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
