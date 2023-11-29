import { Button } from "@mui/material";
import styles from "../SignUp/SignUp.module.css";
import { useEffect, useState } from "react";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [isSignUpCompleted, setIsSignupCompleted] = useState(false);

  const [isValidated, setIsValidated] = useState(false);
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateForm = (e) => {
    e.preventDefault();

    if (name.trim(" ").length < 1) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!regex.test(email)) setEmailError(true);
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
          <h2>SIGN UP</h2>
          <input
            placeholder="Enter your name here."
            style={{
              borderColor: nameError && isValidated ? "red" : "transparent",
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {isValidated && nameError && <label>Enter your name.</label>}
          <input
            placeholder="Enter your email address here."
            style={{
              borderColor: emailError && isValidated ? "red" : "transparent",
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {isValidated && emailError && (
            <label>Enter correct email address.</label>
          )}

          <input
            placeholder="Enter password here."
            style={{
              borderColor: passwordError && isValidated ? "red" : "transparent",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isValidated && passwordError && (
            <label>Password length: minimum 8 characters.</label>
          )}

          <button type="submit">Submit</button>
        </form>
        {isValidated &&
          nameError === false &&
          emailError === false &&
          passwordError === false && <h2 className={styles.successMsg}>Registration successful 🙂</h2>}
      </div>
    </div>
  );
};

export default SignUp;
