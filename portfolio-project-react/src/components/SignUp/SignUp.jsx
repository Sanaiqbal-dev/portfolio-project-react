import styles from "../SignUp/SignUp.module.css";
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
  REGISTRATION_SUCCESSFULL,
  PLACEHOLDER_EMAIL,
} from "./constants";
import clsx from "clsx";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isNameInvalid, setIsNameInvalid] = useState(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);

  const [isSignUpCompleted, setIsSignupCompleted] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);

  const [isApiRequestSuccessfull, setIsApiRequestSuccessfull] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();

    setIsApiRequestSuccessfull(false);
    setIsSignupCompleted(false);

    if (name.trim(" ").length < 1) {
      setIsNameInvalid(true);
    } else {
      setIsNameInvalid(false);
    }
    if (!REGEX_EMAIL.test(email)) setIsEmailInvalid(true);
    else setIsEmailInvalid(false);
    if (password.length < 8) setIsPasswordInvalid(true);
    else setIsPasswordInvalid(false);

    setIsFormValidated(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setIsFormValidated(false);
  }, [name, email, password]);
  useEffect(() => {
    if (
      isNameInvalid === false &&
      isEmailInvalid === false &&
      isPasswordInvalid === false
    ) {
      setIsSignupCompleted(true);
    } else {
      setIsSignupCompleted(false);
    }
  }, [isFormValidated]);

  useEffect(() => {
    if (isFormValidated && isSignUpCompleted) {
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
    setIsFormValidated(false);
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
            className={clsx(styles.inputField, {
              [styles.inputError]: isNameInvalid && isFormValidated,
            })}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {isFormValidated && isNameInvalid && <label>{ALERT_NAME}</label>}
          <input
            value={email}
            placeholder={PLACEHOLDER_EMAIL}
            className={clsx(styles.inputField, {
              [styles.inputError]: isEmailInvalid && isFormValidated,
            })}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {isFormValidated && isEmailInvalid && <label>{ALERT_EMAIL}</label>}

          <input
            value={password}
            placeholder={PLACEHOLDER_PASSWORD}
            className={clsx(styles.inputField, {
              [styles.inputError]: isPasswordInvalid && isFormValidated,
            })}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isFormValidated && isPasswordInvalid && (
            <label>{ALERT_PASSWORD}</label>
          )}

          {isFormValidated && isSignUpCompleted ? (
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
