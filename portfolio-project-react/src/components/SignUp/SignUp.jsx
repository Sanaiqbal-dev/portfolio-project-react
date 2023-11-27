import { Button } from "@mui/material";
import styles from "../SignUp/SignUp.module.css";
import { useState } from "react";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSignUpCompleted, setIsSignupCompleted] = useState(false);

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateForm = () => {
    name.trim(" ").length < 1 ? setNameError(true) : setNameError(false);
    !regex.test(email) ? setEmailError(true) : setEmailError(false);
    password.length < 8 ? setPasswordError(true) : setPasswordError(false);

    !nameError && !emailError && !passwordError
      ? setIsSignupCompleted(true)
      : setIsSignupCompleted(false);
  };

  return (
    <div>
      <div>
        <form
          className={styles.signupFormContainer}
          onSubmit={(e) => validateForm()}
        >
          <h2>SIGN UP</h2>
          <input
            placeholder="Enter your name here."
            style={{ borderColor: nameError ? "red" : "transparent" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {nameError && <label>Enter your name.</label>}
          <input
            placeholder="Enter your email address here."
            style={{ borderColor: emailError ? "red" : "transparent" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailError && <label>Enter correct email address.</label>}

          <input
            placeholder="Enter password here."
            style={{ borderColor: passwordError ? "red" : "transparent" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {password && <label>Password length: minimum 8 characters.</label>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
