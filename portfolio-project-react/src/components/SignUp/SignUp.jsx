import styles from "../SignUp/SignUp.module.css";
import {  useState } from "react";
import {
  ALERT_EMAIL,
  ALERT_NAME,
  ALERT_PASSWORD,
  PLACEHOLDER_NAME,
  PLACEHOLDER_PASSWORD,
  REGEX_EMAIL,
  SIGNUP_TITLE,
  SUBMIT_CONTENT,
  REGISTRATION_SUCCESSFULL,
  PLACEHOLDER_EMAIL,
} from "./constants";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [isSignUpCompleted, setIsSignupCompleted] = useState(false);

  const [isValidated, setIsValidated] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();

    if (name.trim(" ").length < 1) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!REGEX_EMAIL.test(email)) setEmailError(true);
    else setEmailError(false);
    if (password.length < 8) setPasswordError(true);
    else setPasswordError(false);

    if (
      nameError === false &&
      emailError === false &&
      passwordError === false
    ) {
      setIsSignupCompleted(true);
    } else {
      setIsSignupCompleted(false);
    }
    setIsValidated(true);
  };

  return (
    <div>
      <div>
        <form
          className={styles.signupFormContainer}
          onSubmit={(e) => validateForm(e)}
        >
          <h2>{SIGNUP_TITLE}</h2>
          <input
            placeholder={PLACEHOLDER_NAME}
            style={{
              borderColor: nameError && isValidated ? "red" : "transparent",
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {isValidated && nameError && <label>{ALERT_NAME}</label>}
          <input
            placeholder={PLACEHOLDER_EMAIL}
            style={{
              borderColor: emailError && isValidated ? "red" : "transparent",
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {isValidated && emailError && (
            <label>{ALERT_EMAIL}</label>
          )}

          <input
            placeholder={PLACEHOLDER_PASSWORD}
            style={{
              borderColor: passwordError && isValidated ? "red" : "transparent",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isValidated && passwordError && (
            <label>{ALERT_PASSWORD}</label>
          )}

          <button type="submit">{SUBMIT_CONTENT}</button>
        </form>
        {isValidated &&
          nameError === false &&
          emailError === false &&
          passwordError === false && <h2 className={styles.successMsg}>{REGISTRATION_SUCCESSFULL}</h2>}
      </div>
    </div>
  );
};

export default SignUp;
