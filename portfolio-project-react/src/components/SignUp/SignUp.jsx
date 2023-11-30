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

  const [isApiRequestSuccessfull, setIsApiRequestSuccessfull] = useState(false);

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateForm = (e) => {
    e.preventDefault();

    setIsApiRequestSuccessfull(false);
    setIsSignupCompleted(false);
    // setIsValidated(false);

    if (name.trim(" ").length < 1) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!regex.test(email)) setEmailError(true);
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
        console.log("Successfull");
        setIsApiRequestSuccessfull(true);
      } else {
        console.log("Failed");
        setIsApiRequestSuccessfull(false);
      }
      resetForm();
    } catch (e) {
      alert("Api request has been failed!");
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
          <h2>SIGN UP</h2>
          <input
            value={name}
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
            value={email}
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
            value={password}
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

          {isValidated && isSignUpCompleted ? (
            <button>Submitting...</button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
        {isApiRequestSuccessfull && (
          <h2 className={styles.successMsg}>Registration successful 🙂</h2>
        )}
      </div>
    </div>
  );
};

export default SignUp;
