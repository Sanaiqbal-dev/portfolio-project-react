import { useContext, useState } from "react";
import { IsEditModeEnabled } from "../../EditModeContext";
import { EDIT_TEXT, SIGNUP_TEXT, SAVE_TEXT, PORTFOLIO } from "./constants";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = ({ changeEditMode }) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [isPortfolioEnabled, setIsPortfolioEnabled] = useState(true);

  return (
    <header>
      <Link
        to={isPortfolioEnabled ? "/signup" : "/"}
        className={styles.signupLink}
        onClick={(e) => {
          setIsPortfolioEnabled(!isPortfolioEnabled);
          changeEditMode(false);
        }}
      >
        {isPortfolioEnabled ? SIGNUP_TEXT : PORTFOLIO}
      </Link>

      {isPortfolioEnabled &&
        (isEditModeEnabled ? (
          <a
            onClick={() => {
              changeEditMode(false);
            }}
          >
            {SAVE_TEXT}
          </a>
        ) : (
          <a
            onClick={() => {
              changeEditMode(true);
            }}
          >
            {EDIT_TEXT}
          </a>
        ))}
    </header>
  );
};

export default Header;
