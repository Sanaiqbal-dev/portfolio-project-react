import { useEffect, useState } from "react";
import {
  ALERT_EMAIL,
  ALERT_NAME,
  ALERT_PASSWORD,
  FAILURE_MSG,
  PLACEHOLDER_NAME,
  PLACEHOLDER_PASSWORD,
  REGEX_EMAIL,
  SIGNUP_TITLE,
  SUBMITTING_CONTENT,
  SUBMIT_CONTENT,
  COLOR_RED,
  COLOR_TRANSPARENT,
  REGISTRATION_SUCCESSFULL,
  PLACEHOLDER_EMAIL,
} from "./constants";
import styles from "../SignUp/SignUp.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const [isSignUpCompleted, setIsSignupCompleted] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isApiRequestSuccessfull, setIsApiRequestSuccessfull] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();

    setIsApiRequestSuccessfull(false);
    setIsSignupCompleted(false);

    if (name.trim(" ").length < 1) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!REGEX_EMAIL.test(email)) setEmailError(true);
    if (!REGEX_EMAIL.test(email)) setEmailError(true);
    else setEmailError(false);
    if (password.length < 8) setPasswordError(true);
    else setPasswordError(false);

    setIsValidated(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setIsValidated(false);
  }, [name, email, password]);

  useEffect(() => {
    if (
      nameError === false &&
      emailError === false &&
      passwordError === false
    ) {
      setIsSignupCompleted(true);
    } else {
      setIsSignupCompleted(false);
    }
  }, [isValidated]);

  useEffect(() => {
    if (isValidated && isSignUpCompleted) {
      submitUserInformation();
    }
  }, [isSignUpCompleted]);

  const submitUserInformation = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        setIsApiRequestSuccessfull(true);
      } else {
        setIsApiRequestSuccessfull(false);
      }
      resetForm();
    } catch (e) {
      alert(FAILURE_MSG);
    }
    setIsValidated(false);
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
            value={name}
            placeholder={PLACEHOLDER_NAME}
            style={{
              borderColor:
                nameError && isValidated ? COLOR_RED : COLOR_TRANSPARENT,
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {isValidated && nameError && <label>{ALERT_NAME}</label>}
          <input
            value={email}
            placeholder={PLACEHOLDER_EMAIL}
            style={{
              borderColor:
                emailError && isValidated ? COLOR_RED : COLOR_TRANSPARENT,
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {isValidated && emailError && <label>{ALERT_EMAIL}</label>}

          <input
            value={password}
            placeholder={PLACEHOLDER_PASSWORD}
            style={{
              borderColor:
                passwordError && isValidated ? COLOR_RED : COLOR_TRANSPARENT,
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isValidated && passwordError && <label>{ALERT_PASSWORD}</label>}

          {isValidated && isSignUpCompleted ? (
            <button>{SUBMITTING_CONTENT}</button>
          ) : (
            <button type="submit">{SUBMIT_CONTENT}</button>
          )}
        </form>
        {isApiRequestSuccessfull && (
          <h2 className={styles.successMsg}>{REGISTRATION_SUCCESSFULL}</h2>
        )}
      </div>
    </div>
  );
};

export default SignUp;
