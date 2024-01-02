import React, { useContext, useState, FC } from "react";
import { IsEditModeEnabled } from "../../EditModeContext.tsx";
import {
  EDIT_TEXT,
  SIGNUP_TEXT,
  SAVE_TEXT,
  PORTFOLIO,
  DATAVIEWPAGE,
} from "./constants.tsx";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  changeEditMode: (values: boolean) => void;
  isPortfolioRouteEnabled: boolean;
  isDataViewPageRouteEnabled: boolean;
}
const Header: FC<HeaderProps> = ({
  changeEditMode,
  isPortfolioRouteEnabled,
  isDataViewPageRouteEnabled,
}) => {
  const isEditModeEnabled = useContext(IsEditModeEnabled);
  const [isPortfolioEnabled, setIsPortfolioEnabled] = useState<boolean>(
    isPortfolioRouteEnabled
  );
  const [isDataViewPageEnabled, setIsDataViewPageEnabled] = useState<boolean>(
    isDataViewPageRouteEnabled
  );

  return (
    <header>
      {(isPortfolioEnabled || isDataViewPageEnabled) && (
        <Link
          to={isPortfolioEnabled ? "/dataviewpage" : "/"}
          className={styles.signupLink}
          onClick={(e) => {
            if (isPortfolioEnabled) {
              setIsDataViewPageEnabled(true);
              setIsPortfolioEnabled(false);
            } else {
              setIsDataViewPageEnabled(false);
              setIsPortfolioEnabled(true);
            }
            changeEditMode(false);
          }}
        >
          {!isDataViewPageEnabled ? DATAVIEWPAGE : PORTFOLIO}
        </Link>
      )}
      <Link
        to={isPortfolioEnabled ? "/signup" : "/"}
        className={styles.signupLink}
        onClick={(e) => {
          setIsPortfolioEnabled(!isPortfolioEnabled);
          setIsDataViewPageEnabled(false);
          changeEditMode(false);
        }}
      >
        {isPortfolioEnabled ? SIGNUP_TEXT : !isDataViewPageEnabled && PORTFOLIO}
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
